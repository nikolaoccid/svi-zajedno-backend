import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { Activity } from '../activity/entities/activity.entity';
import { Category } from '../category/entities/category.entity';
import { ProjectAssociate } from '../project-associate/entities/project-associate.entity';
import { ProjectUser } from '../project-user/entities/project-user.entity';
import { SchoolYear } from '../school-year/entities/school-year.entity';
import { StudentOnActivity } from '../student-on-activity/entities/student-on-activity.entity';
import { ProjectAssociatesStatistics } from './dto/project-associate.dto';
import { ProjectUserStatistics } from './dto/project-user.dto';

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

  async getProjectAssociatesStatistics(
    schoolYearId: number,
  ): Promise<ProjectAssociatesStatistics[]> {
    // Fetch all categories
    const categories = await this.categoryRepository.find();

    const statistics: ProjectAssociatesStatistics[] = [];

    for (const category of categories) {
      // Count project associates in the category
      const projectAssociatesCount =
        await this.projectAssociateRepository.count({
          where: { category },
        });

      const totalProjectAssociatesCount =
        await this.projectAssociateRepository.count();

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

      const categoryStatistics: ProjectAssociatesStatistics = {
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

  async getProjectUserStatistics(
    schoolYearId: number,
  ): Promise<ProjectUserStatistics> {
    const users = await this.projectUserRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.studentOnSchoolYear', 'studentOnSchoolYear')
      .leftJoinAndSelect(
        'studentOnSchoolYear.studentOnActivity',
        'studentOnActivity',
      )
      .where('studentOnSchoolYear.schoolYearId = :schoolYearId', {
        schoolYearId,
      })
      .getMany();

    const statistics: ProjectUserStatistics = {
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
    };

    for (const user of users) {
      for (const studentOnSchoolYear of user.studentOnSchoolYear) {
        for (const studentOnActivity of studentOnSchoolYear.studentOnActivity) {
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

          statistics.sourceSystems[user.sourceSystem] =
            (statistics.sourceSystems[user.sourceSystem] || 0) + 1;
          statistics.protectionTypes[user.protectionType] =
            (statistics.protectionTypes[user.protectionType] || 0) + 1;

          if (studentOnSchoolYear.status === 'active') {
            statistics.activeUsers++;
          } else if (studentOnSchoolYear.status === 'inactive') {
            statistics.inactiveUsers++;
          } else if (studentOnSchoolYear.status === 'pending') {
            statistics.pendingUsers++;
          }

          if (studentOnActivity.activityStatus === 'active') {
            statistics.activeActivities++;
          } else if (studentOnActivity.activityStatus === 'inactive') {
            statistics.inactiveActivities++;
          } else if (studentOnActivity.activityStatus === 'pending') {
            statistics.pendingActivities++;
          }
          statistics.totalActivities++;
        }
      }
    }

    return statistics;
  }

  private calculateAge(dateOfBirth: string): number {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
}
