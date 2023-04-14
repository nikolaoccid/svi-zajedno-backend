import { Injectable } from '@nestjs/common';
import { CreateProjectAssociateDto } from './dto/create-project-associate.dto';
import { UpdateProjectAssociateDto } from './dto/update-project-associate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAll() {
    return await this.projectAssociateRepository.find();
  }

  async findOne(id: number) {
    return await this.projectAssociateRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateProjectAssociateDto: UpdateProjectAssociateDto,
  ) {
    console.log(updateProjectAssociateDto);
    return await this.projectAssociateRepository.update(
      id,
      updateProjectAssociateDto,
    );
  }

  async remove(id: number) {
    const projectAssociate = await this.findOne(id);
    return await this.projectAssociateRepository.remove(projectAssociate);
  }
}
