import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { Activity } from '../activity/entities/activity.entity';
import { Category } from '../category/entities/category.entity';
import { ProjectAssociate } from '../project-associate/entities/project-associate.entity';
import { ProjectUser } from '../project-user/entities/project-user.entity';
import { SchoolYear } from '../school-year/entities/school-year.entity';
import { StudentOnActivity } from '../student-on-activity/entities/student-on-activity.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProjectAssociate)
    private readonly projectAssociateRepository: Repository<ProjectAssociate>,
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(SchoolYear)
    private readonly schoolYearRepository: Repository<SchoolYear>,
    @InjectRepository(StudentOnActivity)
    private readonly studentOnActivityRepository: Repository<StudentOnActivity>,
    @InjectRepository(ProjectUser)
    private readonly projectUserRepository: Repository<ProjectUser>,
  ) {}

  async getProjectAssociatesStatistics(schoolYearId: number) {
    const categories = await this.categoryRepository.find();

    const statistics = [];

    for (const category of categories) {
      const projectAssociatesCount =
        await this.projectAssociateRepository.count({
          where: {
            category: category,
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
          projectAssociate: { category },
          activityPrice: 0,
          schoolYear: { id: schoolYearId },
        },
      });

      // Count paid activities in the category
      const paidActivitiesCount = await this.activityRepository.count({
        where: {
          projectAssociate: { category },
          activityPrice: MoreThan(0),
          schoolYear: { id: schoolYearId },
        },
      });

      // Count users attending free activities in the category
      const usersAttendingFreeActivities =
        await this.studentOnActivityRepository.count({
          where: {
            activity: {
              projectAssociate: { category },
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
              projectAssociate: { category },
              activityPrice: MoreThan(0),
              schoolYear: { id: schoolYearId },
            },
          },
        });

      const categoryStatistics = {
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
      //TODO fix statistics
      // statistics.sourceSystems[user.sourceSystem] =
      //   (statistics.sourceSystems[user.sourceSystem] || 0) + 1;
      // statistics.protectionTypes[user.protectionType] =
      //   (statistics.protectionTypes[user.protectionType] || 0) + 1;
      for (const studentOnSchoolYear of user.studentOnSchoolYear) {
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
            statistics.totalProjectValue +=
              studentOnActivity.activity.activityPrice * 10;
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

    return statistics;
  }

  private calculateAge(dateString) {
    const dateParts = dateString.split('.');

    if (dateParts.length !== 3) {
      throw new Error('Date is not in good format');
    }

    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      throw new Error('Date is not in good format');
    }

    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    if (isNaN(birthDate.getTime())) {
      throw new Error('Date is not in good format');
    }

    const yearsDiff = today.getFullYear() - birthDate.getFullYear();
    const monthsDiff = today.getMonth() - birthDate.getMonth();
    const daysDiff = today.getDate() - birthDate.getDate();

    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      return yearsDiff - 1;
    }

    return yearsDiff;
  }
}
