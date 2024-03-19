import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export enum SourceSystem {
  CZSS = 'czss',
  OBITELJSKICENTAR = 'obiteljskicentar',
}
export enum ProtectionType {
  ZMN = 'zmn',
  PREPORUKA = 'preporuka',
  UDOMITELJSTVO = 'udomiteljstvo',
}
import { ProjectUser } from '../../project-user/entities/project-user.entity';
import { SchoolYear } from '../../school-year/entities/school-year.entity';
import { StudentOnActivity } from '../../student-on-activity/entities/student-on-activity.entity';
import { User } from '../../users/user.entity';
export enum Status {
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
}
@Entity()
export class StudentOnSchoolYear {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ProjectUser,
    (projectUser) => projectUser.studentOnSchoolYear,
  )
  user: ProjectUser;

  @Column()
  userId: number;

  @ManyToOne(() => SchoolYear, (schoolYear) => schoolYear.studentOnSchoolYear)
  schoolYear: SchoolYear;
  @Column()
  schoolYearId: number;

  @Column()
  status: Status;

  @Column({ default: SourceSystem.CZSS, enum: SourceSystem })
  sourceSystem: SourceSystem;

  @Column({ default: ProtectionType.PREPORUKA, enum: ProtectionType })
  protectionType: ProtectionType;

  @Column({ default: new Date(), type: 'timestamptz' })
  dateOfEnrollment: Date;

  @OneToMany(
    () => StudentOnActivity,
    (studentOnActivity) => studentOnActivity.studentOnSchoolYear,
  )
  studentOnActivity: StudentOnActivity[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
