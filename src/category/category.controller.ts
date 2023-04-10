import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { User, UserRole } from '../users/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedUser } from '../auth/decorators/authenticated-user.decorator';

@Controller('category')
@ApiTags('Category')
@ApiBearerAuth()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@AuthenticatedUser() user: User, @Body() categoryDto: CategoryDto) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.categoryService.create(categoryDto);
  }

  @Get()
  findAll(@AuthenticatedUser() user: User) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@AuthenticatedUser() user: User, @Param('id') id: string) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @AuthenticatedUser() user: User,
    @Param('id') id: string,
    @Body() categoryDto: CategoryDto,
  ) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.categoryService.update(+id, categoryDto);
  }

  @Delete(':id')
  remove(@AuthenticatedUser() user: User, @Param('id') id: string) {
    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }
    return this.categoryService.remove(+id);
  }
}
