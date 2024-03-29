import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { ILike, Repository } from 'typeorm';

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
    return paginate<ProjectAssociate>(
      this.projectAssociateRepository,
      { ...options },
      { order: { clubName: 'ASC' } },
    );
  }

  async findOne(id) {
    return await this.projectAssociateRepository.findOne({
      where: { id: id },
      relations: ['activity', 'category'],
      order: {
        clubName: 'ASC',
      },
    });
  }

  async findOneByQuery(query: string, options: IPaginationOptions) {
    return paginate<ProjectAssociate>(
      this.projectAssociateRepository,
      { ...options },
      {
        order: { clubName: 'ASC' },
        where: [
          { clubName: ILike(`%${query}%`) },
          { email: ILike(`%${query}%`) },
          { mobilePhone: ILike(`%${query}%`) },
          { contactPerson: ILike(`%${query}%`) },
          { category: { categoryName: ILike(`%${query}%`) } },
          { activity: { activityName: ILike(`%${query}%`) } },
        ],
      },
    );
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
