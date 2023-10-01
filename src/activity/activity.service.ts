import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Not, Repository } from 'typeorm';

import { StudentOnSchoolYear } from '../student-on-school-year/entities/student-on-school-year.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity, ActivityStatus } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(StudentOnSchoolYear)
    private studentOnSchoolYearRepository: Repository<StudentOnSchoolYear>,
  ) {}
  async create(createActivityDto: CreateActivityDto) {
    return await this.activityRepository.save(createActivityDto);
  }

  async findAll() {
    return await this.activityRepository.find({
      relations: ['projectAssociate', 'schoolYear'],
      order: { activityName: 'ASC' },
    });
  }

  async findAllActiveActivitiesBySchoolYearAndQuery(
    query: string,
    schoolYearId: number,
    activityStatus: ActivityStatus,
    studentOnSchoolYearId: number,
  ) {
    if (query && schoolYearId && activityStatus && studentOnSchoolYearId) {
      const studentOnSchoolYear =
        await this.studentOnSchoolYearRepository.findOneOrFail({
          where: { id: studentOnSchoolYearId },
          relations: ['studentOnActivity'],
        });

      const activityIds = studentOnSchoolYear.studentOnActivity.map(
        (studentOnActivity) => studentOnActivity.activityId,
      );

      return await this.activityRepository.find({
        where: [
          {
            schoolYearId: schoolYearId,
            activityStatus: activityStatus,
            activityName: Like(`%${query}%`),
            id: Not(In(activityIds)),
          },
          {
            schoolYearId: schoolYearId,
            activityStatus: activityStatus,
            projectAssociate: { clubName: Like(`%${query}%`) },
            id: Not(In(activityIds)),
          },
          {
            schoolYearId: schoolYearId,
            activityStatus: activityStatus,
            projectAssociate: { email: Like(`%${query}%`) },
            id: Not(In(activityIds)),
          },
        ],
        relations: ['projectAssociate', 'schoolYear'],
        order: { activityName: 'ASC' },
      });
    } else if (schoolYearId && activityStatus && studentOnSchoolYearId) {
      const studentOnSchoolYear =
        await this.studentOnSchoolYearRepository.findOne({
          where: { id: studentOnSchoolYearId },
          relations: ['studentOnActivity'],
        });

      const activityIds = studentOnSchoolYear
        ? studentOnSchoolYear.studentOnActivity.map(
            (studentOnActivity) => studentOnActivity.activityId,
          )
        : [];
      return await this.activityRepository.find({
        where: {
          schoolYearId: schoolYearId,
          activityStatus: activityStatus,
          id: Not(In(activityIds)),
        },
        relations: ['projectAssociate', 'schoolYear'],
        order: { activityName: 'ASC' },
      });
    } else if (query) {
      return await this.activityRepository.find({
        where: [
          { activityName: Like(`%${query}%`) },
          { projectAssociate: { clubName: Like(`%${query}%`) } },
          { projectAssociate: { email: Like(`%${query}%`) } },
        ],
        relations: ['projectAssociate', 'schoolYear'],
        order: { activityName: 'ASC' },
      });
    } else if (schoolYearId) {
      return await this.activityRepository.find({
        where: {
          schoolYearId: schoolYearId,
        },
        relations: ['projectAssociate', 'schoolYear'],
        order: { activityName: 'ASC' },
      });
    } else if (activityStatus) {
      return await this.activityRepository.find({
        where: {
          activityStatus: activityStatus,
        },
        relations: ['projectAssociate', 'schoolYear'],
        order: { activityName: 'ASC' },
      });
    }
  }

  async findOne(id: number) {
    return await this.activityRepository.findOne({
      where: { id: id },
      relations: ['projectAssociate', 'schoolYear'],
    });
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    const result = await this.activityRepository.update(id, updateActivityDto);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return await this.activityRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const activity = await this.findOne(id);
    return await this.activityRepository.remove(activity);
  }
}
