import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Like, Repository } from 'typeorm';

import { ProjectUser } from '../project-user/entities/project-user.entity';
import { CreateStudentOnSchoolYearDto } from './dto/create-student-on-school-year.dto';
import { UpdateStudentOnSchoolYearDto } from './dto/update-student-on-school-year.dto';
import { StudentOnSchoolYear } from './entities/student-on-school-year.entity';

@Injectable()
export class StudentOnSchoolYearService {
  constructor(
    @InjectRepository(StudentOnSchoolYear)
    private studentOnSchoolYear: Repository<StudentOnSchoolYear>,
  ) {}
  async create(createStudentOnSchoolYearDto: CreateStudentOnSchoolYearDto) {
    const record = await this.findAllBySchoolYearAndUser(
      createStudentOnSchoolYearDto.userId,
      createStudentOnSchoolYearDto.schoolYearId,
    );
    if (record) {
      throw new BadRequestException();
    }
    return await this.studentOnSchoolYear.save(createStudentOnSchoolYearDto);
  }

  async findAll() {
    return await this.studentOnSchoolYear.find();
  }

  async findAllBySchoolYearAndUser(userId: number, schoolYearId: number) {
    return await this.studentOnSchoolYear.findOne({
      where: { userId: userId, schoolYearId: schoolYearId },
      relations: ['schoolYear', 'user'],
    });
  }

  async findUsersBySchoolYear(schoolYearId: number, query: string) {
    const users = [];
    let res: any[] = [];
    if (query) {
      res = await this.studentOnSchoolYear.find({
        where: [
          { schoolYearId: schoolYearId, user: { oib: Like(`%${query}%`) } },
          {
            schoolYearId: schoolYearId,
            user: { childName: Like(`%${query}%`) },
          },
          {
            schoolYearId: schoolYearId,
            user: { childSurname: Like(`%${query}%`) },
          },
          {
            schoolYearId: schoolYearId,
            user: { guardianName: Like(`%${query}%`) },
          },
          {
            schoolYearId: schoolYearId,
            user: { guardianSurname: Like(`%${query}%`) },
          },
          {
            schoolYearId: schoolYearId,
            user: { email: Like(`%${query}%`) },
          },
          {
            schoolYearId: schoolYearId,
            user: { mobilePhone: Like(`%${query}%`) },
          },
          { schoolYearId: schoolYearId, user: { school: Like(`%${query}%`) } },
          { schoolYearId: schoolYearId, user: { address: Like(`%${query}%`) } },
          { schoolYearId: schoolYearId, user: { city: Like(`%${query}%`) } },
        ],
        relations: ['user'],
        order: { user: { childSurname: 'ASC' } },
      });
    } else {
      res = await this.studentOnSchoolYear.find({
        where: { schoolYearId },
        relations: ['user'],
        order: { user: { childSurname: 'ASC' } },
      });
    }

    res.forEach((r) => {
      const mergedUser = {
        ...r.user,
        schoolYearStatus: r.status,
      };
      users.push(mergedUser);
    });
    return users;
  }

  async findOne(id: number) {
    return await this.studentOnSchoolYear.findOneBy({ id });
  }

  async update(
    id: number,
    updateStudentOnSchoolYearDto: UpdateStudentOnSchoolYearDto,
  ) {
    const result = await this.studentOnSchoolYear.update(
      id,
      updateStudentOnSchoolYearDto,
    );
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return await this.studentOnSchoolYear.findOneBy({ id });
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    return await this.studentOnSchoolYear.remove(student);
  }
}
