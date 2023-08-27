import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    if (record.length > 0) {
      throw new BadRequestException();
    }
    return await this.studentOnSchoolYear.save(createStudentOnSchoolYearDto);
  }

  async findAll() {
    return await this.studentOnSchoolYear.find();
  }

  async findAllBySchoolYearAndUser(userId, schoolYearId) {
    return await this.studentOnSchoolYear.find({
      where: { userId: userId, schoolYearId: schoolYearId },
      relations: ['schoolYear', 'user'],
    });
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
