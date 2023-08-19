import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProjectAssociate } from '../../project-associate/entities/project-associate.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  categoryName: string;

  @OneToMany(
    () => ProjectAssociate,
    (projectAssociate) => projectAssociate.category,
  )
  projectAssociate: ProjectAssociate[];
}
