import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { ILike, In, Repository } from 'typeorm';

import { StudentOnActivityService } from '../student-on-activity/student-on-activity.service';
import { Pagination } from '../utils/pagination';
import { CreateProjectUserDto } from './dto/create-project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';
import { ProjectUser } from './entities/project-user.entity';

@Injectable()
export class ProjectUserService {
  constructor(
    @InjectRepository(ProjectUser)
    private projectUserRepository: Repository<ProjectUser>,
    private readonly studentOnActivityService: StudentOnActivityService,
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

  async findOneByQueryAndStudentOnActivity(
    query: string,
    schoolYearId: number,
    options: IPaginationOptions,
  ) {
    const userIdsFromActivities =
      await this.studentOnActivityService.getIdsFromSchoolYearAndQuery(
        schoolYearId,
        query,
      );

    const users = await this.projectUserRepository.find({
      order: { childSurname: 'ASC' },
      relations: ['studentOnSchoolYear'],
      where: [
        { id: In(userIdsFromActivities) },
        { oib: ILike(`%${query}%`) },
        { childName: ILike(`%${query}%`) },
        { childSurname: ILike(`%${query}%`) },
        { guardianName: ILike(`%${query}%`) },
        { guardianSurname: ILike(`%${query}%`) },
        { email: ILike(`%${query}%`) },
        { mobilePhone: ILike(`%${query}%`) },
        { school: ILike(`%${query}%`) },
        { address: ILike(`%${query}%`) },
        { city: ILike(`%${query}%`) },
      ],
    });

    const pagination = new Pagination<ProjectUser>(users, options);
    return pagination.getPage();
  }
  async findOneByQuery(query: string, options: IPaginationOptions) {
    return paginate<ProjectUser>(
      this.projectUserRepository,
      { ...options },
      {
        order: { childSurname: 'ASC' },
        relations: ['studentOnSchoolYear'],
        where: [
          { oib: ILike(`%${query}%`) },
          { childName: ILike(`%${query}%`) },
          { childSurname: ILike(`%${query}%`) },
          { guardianName: ILike(`%${query}%`) },
          { guardianSurname: ILike(`%${query}%`) },
          { email: ILike(`%${query}%`) },
          { mobilePhone: ILike(`%${query}%`) },
          { school: ILike(`%${query}%`) },
          { address: ILike(`%${query}%`) },
          { city: ILike(`%${query}%`) },
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
