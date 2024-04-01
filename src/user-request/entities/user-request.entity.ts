import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

import { ProjectUser } from '../../project-user/entities/project-user.entity';
import { StudentOnActivity } from '../../student-on-activity/entities/student-on-activity.entity';
import { StudentOnSchoolYear } from '../../student-on-school-year/entities/student-on-school-year.entity';
import { RequestStatus } from '../enums/request-status.enum';
import { UserRequestCategory } from '../enums/user-request-category.enum';
import { RequestEntity } from './request.entity';

@Entity()
export class UserRequest extends RequestEntity {
  @Column()
  userRequestStatus: RequestStatus;

  @Column()
  userRequestCategory: UserRequestCategory;

  @Column()
  userRequestTitle: string;

  @Column({ nullable: true })
  userRequestDescription: string;

  @Column({ nullable: true })
  userRequestQuantity: number;

  @Column({ type: 'money' })
  userRequestCostPerUnit: number;

  @Column()
  userRequestStoreInfo: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  requestDate: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(
    () => StudentOnSchoolYear,
    (studentOnSchoolYear) => studentOnSchoolYear.userRequests,
    {
      nullable: true,
    },
  )
  studentOnSchoolYear: StudentOnSchoolYear;

  @Column({ nullable: true })
  studentOnSchoolYearId: number;

  @ManyToOne(
    () => StudentOnActivity,
    (studentOnActivity) => studentOnActivity.userRequests,
    { nullable: true },
  )
  studentOnActivity: StudentOnActivity;

  @Column({ nullable: true })
  studentOnActivityId: number;
}
