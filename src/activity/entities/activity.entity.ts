import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProjectAssociate } from '../../project-associate/entities/project-associate.entity';
import { SchoolYear } from '../../school-year/entities/school-year.entity';
import { StudentOnActivity } from '../../student-on-activity/entities/student-on-activity.entity';
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

  @OneToMany(
    () => StudentOnActivity,
    (studentOnActivity) => studentOnActivity.activity,
  )
  studentOnActivity: StudentOnActivity[];

  @ManyToOne(() => SchoolYear, (schoolYear) => schoolYear.activity)
  schoolYear: SchoolYear;
  @Column()
  schoolYearId: number;
}
