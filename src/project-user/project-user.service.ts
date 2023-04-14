import { Injectable } from '@nestjs/common';
import { CreateProjectUserDto } from './dto/create-project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAll() {
    return await this.projectUserRepository.find();
  }

  async findOne(id: number) {
    return await this.projectUserRepository.findOneBy({ id });
  }

  async update(id: number, updateProjectUserDto: UpdateProjectUserDto) {
    return await this.projectUserRepository.update(id, updateProjectUserDto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await this.projectUserRepository.remove(user);
  }
}
