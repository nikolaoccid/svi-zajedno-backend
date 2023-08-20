import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { Like, Repository } from 'typeorm';

import { ProjectUser } from '../project-user/entities/project-user.entity';
import { CreateProjectAssociateDto } from './dto/create-project-associate.dto';
import { UpdateProjectAssociateDto } from './dto/update-project-associate.dto';
import { ProjectAssociate } from './entities/project-associate.entity';

@Injectable()
export class ProjectAssociateService {
  constructor(
    @InjectRepository(ProjectAssociate)
    private projectAssociateRepository: Repository<ProjectAssociate>,
  ) {}
  async create(createProjectAssociateDto: CreateProjectAssociateDto) {
    return await this.projectAssociateRepository.save(
      createProjectAssociateDto,
    );
  }

  async findAll(options: IPaginationOptions) {
    return paginate<ProjectAssociate>(this.projectAssociateRepository, options);
  }

  async findOne(id) {
    return await this.projectAssociateRepository.findOneBy({ id });
  }

  async findOneByQuery(query: string) {
    return await this.projectAssociateRepository.find({
      where: [
        { clubName: Like(`%${query}%`) },
        { email: Like(`%${query}%`) },
        { mobilePhone: Like(`%${query}%`) },
        { contactPerson: Like(`%${query}%`) },
      ],
    });
  }

  async update(
    id: number,
    updateProjectAssociateDto: UpdateProjectAssociateDto,
  ) {
    const result = await this.projectAssociateRepository.update(
      id,
      updateProjectAssociateDto,
    );
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return await this.projectAssociateRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const projectAssociate = await this.findOne(id);
    return await this.projectAssociateRepository.remove(projectAssociate);
  }
}
