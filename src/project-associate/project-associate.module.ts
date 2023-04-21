import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectAssociate } from './entities/project-associate.entity';
import { ProjectAssociateController } from './project-associate.controller';
import { ProjectAssociateService } from './project-associate.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectAssociate])],
  controllers: [ProjectAssociateController],
  providers: [ProjectAssociateService],
})
export class ProjectAssociateModule {}
