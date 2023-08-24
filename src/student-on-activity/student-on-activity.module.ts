import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentOnActivity } from './entities/student-on-activity.entity';
import { StudentOnActivityController } from './student-on-activity.controller';
import { StudentOnActivityService } from './student-on-activity.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentOnActivity])],
  controllers: [StudentOnActivityController],
  providers: [StudentOnActivityService],
})
export class StudentOnActivityModule {}
