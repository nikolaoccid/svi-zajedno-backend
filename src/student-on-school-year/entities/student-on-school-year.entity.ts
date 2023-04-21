import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProjectUser } from '../../project-user/entities/project-user.entity';
import { SchoolYear } from '../../school-year/entities/school-year.entity';
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
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => SchoolYear, (schoolYear) => schoolYear.studentOnSchoolYear)
  schoolYear: SchoolYear;
  @Column()
  schoolYearId: number;

  @Column()
  status: Status;
}
