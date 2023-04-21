import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';

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
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async update(id: number, categoryDto: CategoryDto) {
    const result = await this.categoryRepository.update(id, categoryDto);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return await this.categoryRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return await this.categoryRepository.remove(category);
  }
}
