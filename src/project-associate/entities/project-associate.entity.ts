import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Activity } from '../../activity/entities/activity.entity';
import { Category } from '../../category/entities/category.entity';
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

  @OneToMany(() => Activity, (activity) => activity.projectAssociate)
  activity: Activity[];
}
