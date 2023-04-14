import { Module } from '@nestjs/common';
import { ProjectAssociateService } from './project-associate.service';
import { ProjectAssociateController } from './project-associate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectAssociate } from './entities/project-associate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectAssociate])],
  controllers: [ProjectAssociateController],
  providers: [ProjectAssociateService],
})
export class ProjectAssociateModule {}
