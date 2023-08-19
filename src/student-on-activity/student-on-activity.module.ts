import { Module } from '@nestjs/common';

import { StudentOnActivityController } from './student-on-activity.controller';
import { StudentOnActivityService } from './student-on-activity.service';

@Module({
  controllers: [StudentOnActivityController],
  providers: [StudentOnActivityService],
})
export class StudentOnActivityModule {}
