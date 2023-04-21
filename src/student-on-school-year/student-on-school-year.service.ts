import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.studentOnSchoolYear.save(createStudentOnSchoolYearDto);
  }

  async findAll() {
    return await this.studentOnSchoolYear.find();
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
