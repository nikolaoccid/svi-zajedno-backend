import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { Activity, ActivityStatus } from '../activity/entities/activity.entity';
import { Category } from '../category/entities/category.entity';
import { ProjectAssociate } from '../project-associate/entities/project-associate.entity';
import { ProjectUser } from '../project-user/entities/project-user.entity';
import { SchoolYear } from '../school-year/entities/school-year.entity';
import { StudentOnActivity } from '../student-on-activity/entities/student-on-activity.entity';
import { StudentOnSchoolYear } from '../student-on-school-year/entities/student-on-school-year.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProjectAssociate)
    private readonly projectAssociateRepository: Repository<ProjectAssociate>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(StudentOnActivity)
    private readonly studentOnActivityRepository: Repository<StudentOnActivity>,
    @InjectRepository(ProjectUser)
    private readonly projectUserRepository: Repository<ProjectUser>,
  ) {}

  async getProjectAssociatesStatistics(schoolYearId: number) {
    const categories = await this.categoryRepository.find({
      order: { categoryName: 'ASC' },
    });

    const statistics = [];

    for (const category of categories) {
      const projectAssociatesCount =
        await this.projectAssociateRepository.count({
          where: {
            category: { id: category.id },
            activity: { schoolYear: { id: schoolYearId } },
          },
        });

      const totalProjectAssociatesCount =
        await this.projectAssociateRepository.count({
          where: { activity: { schoolYear: { id: schoolYearId } } },
        });

      // Count free activities in the category
      const freeActivitiesCount = await this.activityRepository.count({
        where: {
          projectAssociate: { category: { id: category.id } },
          activityPrice: 0,
          schoolYear: { id: schoolYearId },
        },
      });

      // Count paid activities in the category
      const paidActivitiesCount = await this.activityRepository.count({
        where: {
          projectAssociate: { category: { id: category.id } },
          activityPrice: MoreThan(0),
          schoolYear: { id: schoolYearId },
        },
      });

      // Count users attending free activities in the category
      const usersAttendingFreeActivities =
        await this.studentOnActivityRepository.count({
          where: {
            activity: {
              projectAssociate: { category: { id: category.id } },
              activityPrice: 0,
              schoolYear: { id: schoolYearId },
            },
          },
        });

      // Count users attending paid activities in the category
      const usersAttendingPaidActivities =
        await this.studentOnActivityRepository.count({
          where: {
            activity: {
              projectAssociate: { category: { id: category.id } },
              activityPrice: MoreThan(0),
              schoolYear: { id: schoolYearId },
            },
          },
        });

      const categoryStatistics: any = {
        totalAssociates: totalProjectAssociatesCount,
        totalAssociatesPerCategory: projectAssociatesCount,
        categoryName: category.categoryName,
        totalFreeActivities: freeActivitiesCount,
        totalPaidActivities: paidActivitiesCount,
        usersAttendingFreeActivities,
        usersAttendingPaidActivities,
      };

      statistics.push(categoryStatistics);
    }
    statistics.sort(
      (a, b) => b.totalAssociatesPerCategory - a.totalAssociatesPerCategory,
    );

    return statistics;
  }

  async getProjectUserStatistics(schoolYearId: number) {
    const users = await this.projectUserRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.studentOnSchoolYear', 'studentOnSchoolYear')
      .leftJoinAndSelect(
        'studentOnSchoolYear.studentOnActivity',
        'studentOnActivity',
      )
      .leftJoinAndSelect('studentOnActivity.activity', 'activity')
      .where('studentOnSchoolYear.schoolYearId = :schoolYearId', {
        schoolYearId,
      })
      .getMany();

    const statistics = {
      totalUsers: users.length,
      maleUsers: 0,
      femaleUsers: 0,
      activeUsers: 0,
      inactiveUsers: 0,
      pendingUsers: 0,
      ageGroups: {
        under6: 0,
        age7to12: 0,
        age13to18: 0,
        age19to24: 0,
      },
      sourceSystems: {},
      protectionTypes: {},

      activeActivities: 0,
      inactiveActivities: 0,
      pendingActivities: 0,
      totalActivities: 0,
      totalProjectValue: 0,

      associatesTotalActivities: 0,
      associatesActiveActivities: 0,
      associatesInactiveActivities: 0,
    };

    for (const user of users) {
      const age = this.calculateAge(user.dateOfBirth);
      if (age < 6) {
        statistics.ageGroups.under6++;
      } else if (age >= 7 && age <= 12) {
        statistics.ageGroups.age7to12++;
      } else if (age >= 13 && age <= 18) {
        statistics.ageGroups.age13to18++;
      } else if (age >= 19 && age <= 24) {
        statistics.ageGroups.age19to24++;
      }

      if (user.gender === 'male') {
        statistics.maleUsers++;
      } else if (user.gender === 'female') {
        statistics.femaleUsers++;
      }
      for (const studentOnSchoolYear of user.studentOnSchoolYear) {
        statistics.sourceSystems[studentOnSchoolYear.sourceSystem] =
          (statistics.sourceSystems[studentOnSchoolYear.sourceSystem] || 0) + 1;
        statistics.protectionTypes[studentOnSchoolYear.protectionType] =
          (statistics.protectionTypes[studentOnSchoolYear.protectionType] ||
            0) + 1;
        if (studentOnSchoolYear.status === 'active') {
          statistics.activeUsers++;
        } else if (studentOnSchoolYear.status === 'inactive') {
          statistics.inactiveUsers++;
        } else if (studentOnSchoolYear.status === 'pending') {
          statistics.pendingUsers++;
        }
        for (const studentOnActivity of studentOnSchoolYear.studentOnActivity) {
          if (studentOnActivity.activityStatus === 'active') {
            statistics.activeActivities++;
            statistics.totalProjectValue += this.calculateActivityWorth(
              studentOnActivity.activity.activityPrice,
              studentOnActivity.enrollmentDate,
              studentOnActivity.unenrollmentDate,
            );
          } else if (studentOnActivity.activityStatus === 'inactive') {
            statistics.inactiveActivities++;
            statistics.totalProjectValue +=
              studentOnActivity.activity.activityPrice;
          } else if (studentOnActivity.activityStatus === 'pending') {
            statistics.pendingActivities++;
          }
          statistics.totalActivities++;
        }
      }
    }
    statistics.associatesActiveActivities = await this.activityRepository.count(
      {
        where: { activityStatus: ActivityStatus.Active },
      },
    );
    statistics.associatesTotalActivities =
      await this.activityRepository.count();
    statistics.associatesInactiveActivities =
      await this.activityRepository.count({
        where: { activityStatus: ActivityStatus.Inactive },
      });

    return statistics;
  }

  private calculateAge(birthDate: Date) {
    const today = new Date();
    const yearsDiff = today.getFullYear() - birthDate.getFullYear();
    const monthsDiff = today.getMonth() - birthDate.getMonth();
    const daysDiff = today.getDate() - birthDate.getDate();

    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      return yearsDiff - 1;
    }

    return yearsDiff;
  }

  private calculateActivityWorth(
    activityPrice: number,
    enrollmentDate: Date,
    unenrollmentDate: Date,
  ) {
    const activityPriceValuation = activityPrice === 0 ? 20 : activityPrice;
    const activityLength = this.calculateActivityLength(
      enrollmentDate,
      unenrollmentDate,
    );
    return activityPriceValuation * activityLength;
  }
  private calculateActivityLength(
    enrollmentDate: Date,
    unenrollmentDate: Date,
  ) {
    let biggerDate = unenrollmentDate;
    let smallerDate = enrollmentDate;

    if (!unenrollmentDate) return 10;

    if (enrollmentDate < unenrollmentDate) {
      biggerDate = unenrollmentDate;
      smallerDate = enrollmentDate;
    } else {
      biggerDate;
    }

    const years = biggerDate.getFullYear() - smallerDate.getFullYear();
    const months = biggerDate.getMonth() - smallerDate.getMonth();
    const days = biggerDate.getDate() - smallerDate.getDate();

    const totalPayments = years * 12 + months + (days > 0 ? 1 : 0);

    return totalPayments;
  }
}
