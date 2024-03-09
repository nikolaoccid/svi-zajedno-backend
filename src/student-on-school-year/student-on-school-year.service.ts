import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { CreateStudentOnSchoolYearDto } from './dto/create-student-on-school-year.dto';
import { UpdateStudentOnSchoolYearDto } from './dto/update-student-on-school-year.dto';
import {
  Status,
  StudentOnSchoolYear,
} from './entities/student-on-school-year.entity';

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

  async findUsersBySchoolYear(
    schoolYearId: number,
    query: string,
    status: Status,
    sortBy: string,
  ) {
    const users = [];
    let res: any[] = [];
    let order: any;

    if (sortBy === 'dateOfEnrollment') {
      order = { dateOfEnrollment: 'DESC' };
    } else {
      order = { user: { childSurname: 'ASC' } };
    }

    if (query && status) {
      res = await this.studentOnSchoolYear.find({
        where: [
          { schoolYearId, status, user: { oib: ILike(`%${query}%`) } },
          { schoolYearId, status, user: { childName: ILike(`%${query}%`) } },
          { schoolYearId, status, user: { childSurname: ILike(`%${query}%`) } },
          { schoolYearId, status, user: { guardianName: ILike(`%${query}%`) } },
          {
            schoolYearId,
            status,
            user: { guardianSurname: ILike(`%${query}%`) },
          },
          { schoolYearId, status, user: { email: ILike(`%${query}%`) } },
          { schoolYearId, status, user: { mobilePhone: ILike(`%${query}%`) } },
          { schoolYearId, status, user: { school: ILike(`%${query}%`) } },
          { schoolYearId, status, user: { address: ILike(`%${query}%`) } },
          { schoolYearId, status, user: { city: ILike(`%${query}%`) } },
        ],
        relations: ['user'],
        order,
      });
    } else if (status) {
      res = await this.studentOnSchoolYear.find({
        where: Array(10).fill({ schoolYearId, status }),
        relations: ['user'],
        order,
      });
    } else {
      res = await this.studentOnSchoolYear.find({
        where: { schoolYearId },
        relations: ['user'],
        order,
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
