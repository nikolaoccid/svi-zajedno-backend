import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity, ActivityStatus } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}
  async create(createActivityDto: CreateActivityDto) {
    return await this.activityRepository.save(createActivityDto);
  }

  async findAll() {
    return await this.activityRepository.find({
      relations: ['projectAssociate', 'schoolYear'],
    });
  }

  async findAllActiveActivitiesBySchoolYearAndQuery(
    query: string,
    schoolYearId: number,
    activityStatus: ActivityStatus,
  ) {
    if (query && schoolYearId && activityStatus) {
      return await this.activityRepository.find({
        where: [
          {
            schoolYearId: schoolYearId,
            activityStatus: activityStatus,
            activityName: Like(`%${query}%`),
          },
          {
            schoolYearId: schoolYearId,
            activityStatus: activityStatus,
            projectAssociate: { clubName: Like(`%${query}%`) },
          },
          {
            schoolYearId: schoolYearId,
            activityStatus: activityStatus,
            projectAssociate: { email: Like(`%${query}%`) },
          },
        ],
        relations: ['projectAssociate', 'schoolYear'],
      });
    } else if (schoolYearId && activityStatus) {
      return await this.activityRepository.find({
        where: { schoolYearId: schoolYearId, activityStatus: activityStatus },
        relations: ['projectAssociate', 'schoolYear'],
      });
    } else if (query) {
      return await this.activityRepository.find({
        where: [
          { activityName: Like(`%${query}%`) },
          { projectAssociate: { clubName: Like(`%${query}%`) } },
          { projectAssociate: { email: Like(`%${query}%`) } },
        ],
        relations: ['projectAssociate', 'schoolYear'],
      });
    } else if (schoolYearId) {
      return await this.activityRepository.find({
        where: {
          schoolYearId: schoolYearId,
        },
        relations: ['projectAssociate', 'schoolYear'],
      });
    } else if (activityStatus) {
      return await this.activityRepository.find({
        where: {
          activityStatus: activityStatus,
        },
        relations: ['projectAssociate', 'schoolYear'],
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
