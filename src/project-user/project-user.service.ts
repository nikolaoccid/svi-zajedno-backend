import { Injectable } from '@nestjs/common';
import { CreateProjectUserDto } from './dto/create-project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { HashService } from '../users/hash.service';
import { ProjectUser } from './entities/project-user.entity';

@Injectable()
export class ProjectUserService {
  constructor(
    @InjectRepository(ProjectUser)
    private projectUserRepository: Repository<ProjectUser>,
  ) {}
  async create(createProjectUserDto: CreateProjectUserDto) {
    // const projectUser = new ProjectUser();
    //
    // projectUser.oib = createProjectUserDto.oib;
    // projectUser.guardianName = createProjectUserDto.guardianName;
    // projectUser.guardianSurname = createProjectUserDto.guardianSurname;
    // projectUser.childName = createProjectUserDto.childName;
    // projectUser.childSurname = createProjectUserDto.guardianSurname;
    // projectUser.dateOfBirth = createProjectUserDto.dateOfBirth;
    // projectUser.address = createProjectUserDto.address;
    // projectUser.city = createProjectUserDto.city;
    // projectUser.school = createProjectUserDto.school;
    // projectUser.mobilePhone = createProjectUserDto.mobilePhone;

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
