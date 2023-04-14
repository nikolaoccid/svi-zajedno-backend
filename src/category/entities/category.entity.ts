import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectAssociate } from '../../project-associate/entities/project-associate.entity';
import { Exclude, Transform } from 'class-transformer';

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
