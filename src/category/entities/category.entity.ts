import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsAlpha } from 'class-validator';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsAlpha()
  categoryName: string;
}
