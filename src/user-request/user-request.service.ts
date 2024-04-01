import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UserRequest } from './entities/user-request.entity';

@Injectable()
export class UserRequestService {
  constructor(
    @InjectRepository(UserRequest)
    private readonly userRequestRepository: Repository<UserRequest>,
  ) {}

  async findAll(): Promise<UserRequest[]> {
    const records = await this.userRequestRepository.find();
    return records;
  }

  async findWithCustomWhere(where: any) {
    return await this.userRequestRepository.find({ where: where });
  }

  async findOne(id: number): Promise<UserRequest> {
    return await this.userRequestRepository.findOne({ where: { id } });
  }

  async create(userRequestData: CreateUserRequestDto): Promise<UserRequest> {
    const userRequest = this.userRequestRepository.create(userRequestData);
    return await this.userRequestRepository.save(userRequest);
  }

  async update(
    id: number,
    userRequestData: UpdateUserRequestDto,
  ): Promise<UserRequest> {
    await this.userRequestRepository.update(id, userRequestData);
    return this.userRequestRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    return await this.userRequestRepository.delete(id);
  }

  async findAllByStudentOnSchoolYearAndActivity(
    studentOnSchoolYearId: number,
    studentOnActivityId: number,
  ) {
    return await this.findWithCustomWhere({
      studentOnSchoolYearId: studentOnSchoolYearId,
      studentOnActivityId: studentOnActivityId,
    });
  }

  async findAllByStudentOnSchoolYear(studentOnSchoolYearId: any) {
    return await this.findWithCustomWhere({
      studentOnSchoolYearId: studentOnSchoolYearId,
    });
  }

  async findAllByStudentOnActivity(studentOnActivityId: any) {
    return await this.findWithCustomWhere({
      studentOnActivityId: studentOnActivityId,
    });
  }
}
