import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SchoolYear } from './entities/school-year.entity';
import { SchoolYearController } from './school-year.controller';
import { SchoolYearService } from './school-year.service';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolYear])],
  controllers: [SchoolYearController],
  providers: [SchoolYearService],
  exports: [SchoolYearService],
})
export class SchoolYearModule {}
