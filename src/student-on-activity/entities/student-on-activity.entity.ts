import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Activity } from '../../activity/entities/activity.entity';
import { StudentOnSchoolYear } from '../../student-on-school-year/entities/student-on-school-year.entity';
import { UserRequest } from '../../user-request/entities/user-request.entity';
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

  @Column({ nullable: true, type: 'timestamptz' })
  enrollmentDate: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  unenrollmentDate: Date;

  @ManyToOne(() => Activity, (activity) => activity.studentOnActivity)
  activity: Activity;
  @Column()
  activityId: number;

  @Column({ default: 0 })
  actualActivityCost: number;

  @OneToMany(
    () => UserRequest,
    (userRequest) => userRequest.studentOnActivity,
    { nullable: true },
  )
  userRequests: UserRequest[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
