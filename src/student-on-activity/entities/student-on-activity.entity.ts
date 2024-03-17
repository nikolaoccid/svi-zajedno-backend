import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Activity } from '../../activity/entities/activity.entity';
import { StudentOnSchoolYear } from '../../student-on-school-year/entities/student-on-school-year.entity';
export enum ActivityStatus {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}
@Entity()
export class StudentOnActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activityStatus: ActivityStatus;

  @ManyToOne(
    () => StudentOnSchoolYear,
    (studentOnSchoolYear) => studentOnSchoolYear.studentOnActivity,
  )
  studentOnSchoolYear: StudentOnSchoolYear;
  @Column()
  studentOnSchoolYearId: number;

  @Column({ nullable: true })
  enrollmentDate: Date;

  @Column({ nullable: true })
  unenrollmentDate: Date;

  @ManyToOne(() => Activity, (activity) => activity.studentOnActivity)
  activity: Activity;
  @Column()
  activityId: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
