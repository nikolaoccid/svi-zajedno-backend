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
    return this.userRequestRepository.find();
  }

  async findOne(id: number): Promise<UserRequest> {
    return this.userRequestRepository.findOne({ where: { id } });
  }

  async create(userRequestData: CreateUserRequestDto): Promise<UserRequest> {
    const userRequest = this.userRequestRepository.create(userRequestData);
    return this.userRequestRepository.save(userRequest);
  }

  async update(
    id: number,
    userRequestData: UpdateUserRequestDto,
  ): Promise<UserRequest> {
    await this.userRequestRepository.update(id, userRequestData);
    return this.userRequestRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRequestRepository.delete(id);
  }
}
