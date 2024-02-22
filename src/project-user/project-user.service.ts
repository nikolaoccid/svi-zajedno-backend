import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Like, Repository } from 'typeorm';

import { CreateProjectUserDto } from './dto/create-project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';
import { ProjectUser } from './entities/project-user.entity';

@Injectable()
export class ProjectUserService {
  constructor(
    @InjectRepository(ProjectUser)
    private projectUserRepository: Repository<ProjectUser>,
  ) {}
  async create(createProjectUserDto: CreateProjectUserDto) {
    return await this.projectUserRepository.save(createProjectUserDto);
  }

  async findAll(options: IPaginationOptions) {
    return paginate<ProjectUser>(
      this.projectUserRepository,
      { ...options },
      { order: { childSurname: 'ASC' }, relations: ['studentOnSchoolYear'] },
    );
  }

  async findOneByQuery(query: string, options: IPaginationOptions) {
    return paginate<ProjectUser>(
      this.projectUserRepository,
      { ...options },
      {
        order: { childSurname: 'ASC' },
        relations: ['studentOnSchoolYear'],
        where: [
          { oib: Like(`%${query}%`) },
          { childName: Like(`%${query}%`) },
          { childSurname: Like(`%${query}%`) },
          { guardianName: Like(`%${query}%`) },
          { guardianSurname: Like(`%${query}%`) },
          { email: Like(`%${query}%`) },
          { mobilePhone: Like(`%${query}%`) },
          { school: Like(`%${query}%`) },
          { address: Like(`%${query}%`) },
          { city: Like(`%${query}%`) },
        ],
      },
    );
  }

  async findOne(id: number) {
    return await this.projectUserRepository.findOneBy({ id });
  }

  async update(id: number, updateProjectUserDto: UpdateProjectUserDto) {
    const result = await this.projectUserRepository.update(
      id,
      updateProjectUserDto,
    );
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return await this.projectUserRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.projectUserRepository.remove(user);
  }
}
