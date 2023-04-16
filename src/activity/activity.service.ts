import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';

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
    return await this.activityRepository.find();
  }

  async findOne(id: number) {
    return await this.activityRepository.findOneBy({ id });
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
