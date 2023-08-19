import { Injectable } from '@nestjs/common';

import { CreateStudentOnActivityDto } from './dto/create-student-on-activity.dto';
import { UpdateStudentOnActivityDto } from './dto/update-student-on-activity.dto';

@Injectable()
export class StudentOnActivityService {
  create(createStudentOnActivityDto: CreateStudentOnActivityDto) {
    return 'This action adds a new studentOnActivity';
  }

  findAll() {
    return `This action returns all studentOnActivity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studentOnActivity`;
  }

  update(id: number, updateStudentOnActivityDto: UpdateStudentOnActivityDto) {
    return `This action updates a #${id} studentOnActivity`;
  }

  remove(id: number) {
    return `This action removes a #${id} studentOnActivity`;
  }
}
