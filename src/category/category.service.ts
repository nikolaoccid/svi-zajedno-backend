import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';
import { ILike, Repository } from 'typeorm';

import { CategoryDto } from './dto/category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(category) {
    return await this.categoryRepository.save({
      categoryName: this.capitalizeCategoryName(category.categoryName),
    });
  }

  async findAll(query: string, options: IPaginationOptions) {
    if (query !== '') {
      return paginate<Category>(
        this.categoryRepository,
        { ...options },
        {
          where: { categoryName: ILike(`%${query}%`) },
          order: { categoryName: 'ASC' },
        },
      );
    } else {
      return paginate<Category>(this.categoryRepository, { ...options });
    }
  }

  async getAllCategories() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async update(id: number, categoryDto: CategoryDto) {
    const result = await this.categoryRepository.update(id, {
      categoryName: this.capitalizeCategoryName(categoryDto.categoryName),
      ...categoryDto,
    });
    if (result.affected === 0) {
      throw new NotFoundException();
    }
    return await this.categoryRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    return await this.categoryRepository.remove(category);
  }

  private capitalizeCategoryName(categoryName: string) {
    const lowercaseCategoryName = categoryName.toLowerCase();
    return (
      [...lowercaseCategoryName][0].toUpperCase() +
      [...lowercaseCategoryName].slice(1).join('')
    );
  }
}
