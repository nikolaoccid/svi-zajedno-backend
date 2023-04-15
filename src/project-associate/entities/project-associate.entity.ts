import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Exclude } from 'class-transformer';
export enum AssociateStatus {
  Active = 'active',
  Pending = 'pending',
  Inactive = 'inactive',
}
@Entity()
export class ProjectAssociate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  clubName: string;

  @Column()
  email: string;

  @Column()
  mobilePhone: string;

  @Column()
  contactPerson: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  projectAssociateStatus: AssociateStatus;

  @ManyToOne(() => Category, (category) => category.projectAssociate)
  category: Category;
  @Column()
  categoryId: number;
}
