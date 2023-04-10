import { IsAlpha, IsNotEmpty } from 'class-validator';

export class CategoryDto {
  @IsNotEmpty()
  @IsAlpha()
  categoryName: string;
}
