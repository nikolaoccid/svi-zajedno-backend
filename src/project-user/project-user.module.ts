import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentOnActivityModule } from '../student-on-activity/student-on-activity.module';
import { ProjectUser } from './entities/project-user.entity';
import { ProjectUserController } from './project-user.controller';
import { ProjectUserService } from './project-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectUser]), StudentOnActivityModule],
  controllers: [ProjectUserController],
  providers: [ProjectUserService],
})
export class ProjectUserModule {}
