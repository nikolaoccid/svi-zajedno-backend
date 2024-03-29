import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { ILike, Repository } from 'typeorm';

import { Category } from '../category/entities/category.entity';
import { SchoolYearDto } from './dto/school-year.dto';
import { SchoolYear } from './entities/school-year.entity';

@Injectable()
export class SchoolYearService {
  constructor(
    @InjectRepository(SchoolYear)
    private schoolYearRepository: Repository<SchoolYear>,
  ) {}
  async create(schoolYearDto: SchoolYearDto) {
    this.isSequent(schoolYearDto);
    const schoolYear = new SchoolYear();
    schoolYear.startYear = schoolYearDto.startYear;
    schoolYear.endYear = schoolYearDto.endYear;

    return await this.schoolYearRepository.save(schoolYear);
  }

  async findAll(options: IPaginationOptions, query?: string) {
    const allRecords = await paginate<SchoolYear>(
      this.schoolYearRepository,
      { ...options },
      { order: { startYear: 'DESC' } },
    );

    let filteredItems = allRecords.items;

    if (query !== '') {
      const numberQuery = parseInt(query);
      filteredItems = allRecords.items.filter(
        (record) =>
          record.startYear.toString().includes(numberQuery.toString()) ||
          record.endYear.toString().includes(numberQuery.toString()),
      );
    }

    return { ...allRecords, items: filteredItems };
  }

  async getByStartYear(startYear: number) {
    return await this.schoolYearRepository.findOneBy({ startYear });
  }

  async getById(id: number) {
    return await this.schoolYearRepository.findOneBy({ id });
  }

  async update(id: number, schoolYearDto: SchoolYearDto) {
    this.isSequent(schoolYearDto);
    const result = await this.schoolYearRepository.update(id, schoolYearDto);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return await this.schoolYearRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const schoolYear = await this.getById(id);
    return await this.schoolYearRepository.remove(schoolYear);
  }
  isSequent({ startYear, endYear }) {
    if (startYear + 1 != endYear || startYear < 2010) {
      throw new BadRequestException();
    }
    return;
  }
}
