import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectAssociate } from '../../project-associate/entities/project-associate.entity';
export enum ActivityStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}
@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activityName: string;

  @Column()
  activityPrice: number;

  @Column()
  activityStatus: ActivityStatus;

  @ManyToOne(
    () => ProjectAssociate,
    (projectAssociate) => projectAssociate.category,
  )
  projectAssociate: ProjectAssociate;

  @Column()
  projectAssociateId: number;
}
