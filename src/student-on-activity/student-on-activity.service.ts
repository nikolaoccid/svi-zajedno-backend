import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ActivityService } from '../activity/activity.service';
import { SchoolYearService } from '../school-year/school-year.service';
import { StudentOnSchoolYearService } from '../student-on-school-year/student-on-school-year.service';
import { CreateStudentOnActivityDto } from './dto/create-student-on-activity.dto';
import { UpdateStudentOnActivityDto } from './dto/update-student-on-activity.dto';
import { StudentOnActivity } from './entities/student-on-activity.entity';

@Injectable()
export class StudentOnActivityService {
  constructor(
    @InjectRepository(StudentOnActivity)
    private studentOnActivity: Repository<StudentOnActivity>,
    private readonly activityService: ActivityService,
    private readonly studentOnSchoolYearService: StudentOnSchoolYearService,
    private readonly schoolYearService: SchoolYearService,
  ) {}
  async create(createStudentOnActivityDto: CreateStudentOnActivityDto) {
    if (!(await this.schoolYearMatch(createStudentOnActivityDto))) {
      throw new BadRequestException();
    }
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
    if (!(await this.schoolYearMatch(updateStudentOnActivityDto))) {
      throw new BadRequestException();
    }
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

  private async schoolYearMatch(
    studentOnActivity: CreateStudentOnActivityDto | UpdateStudentOnActivityDto,
  ) {
    const activity = await this.activityService.findOne(
      studentOnActivity.activityId,
    );

    const studentOnSchoolYear = await this.studentOnSchoolYearService.findOne(
      studentOnActivity.studentOnSchoolYearId,
    );

    const studentOnSchoolYearschoolYear = await this.schoolYearService.getById(
      studentOnSchoolYear.schoolYearId,
    );

    const activitySchoolYear = await this.schoolYearService.getById(
      activity.schoolYearId,
    );

    return (
      studentOnSchoolYearschoolYear.startYear === activitySchoolYear.startYear
    );
  }
}
