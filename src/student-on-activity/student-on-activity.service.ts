import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStudentOnActivityDto } from './dto/create-student-on-activity.dto';
import { UpdateStudentOnActivityDto } from './dto/update-student-on-activity.dto';
import { StudentOnActivity } from './entities/student-on-activity.entity';

@Injectable()
export class StudentOnActivityService {
  constructor(
    @InjectRepository(StudentOnActivity)
    private studentOnActivity: Repository<StudentOnActivity>,
  ) {}
  async create(createStudentOnActivityDto: CreateStudentOnActivityDto) {
    return await this.studentOnActivity.save(createStudentOnActivityDto);
  }

  async findAll() {
    return await this.studentOnActivity.find();
  }

  async findOne(id: number) {
    return await this.studentOnActivity.findOneBy({ id });
  }

  async update(
    id: number,
    updateStudentOnActivityDto: UpdateStudentOnActivityDto,
  ) {
    const result = await this.studentOnActivity.update(
      id,
      updateStudentOnActivityDto,
    );

    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return await this.studentOnActivity.findOneBy({ id });
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    return await this.studentOnActivity.remove(student);
  }
}
