import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { ProjectAssociate } from '../project-associate/entities/project-associate.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(categoryDto: CategoryDto) {
    return await this.categoryRepository.save(categoryDto);
  }

  async findAll() {
    return await this.categoryRepository.find({
      relations: {
        projectAssociate: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async update(id: number, categoryDto: CategoryDto) {
    return await this.categoryRepository.update(id, categoryDto);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return await this.categoryRepository.remove(category);
  }
}
