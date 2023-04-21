import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { ProjectUser } from '../../project-user/entities/project-user.entity';
import { SchoolYear } from '../../school-year/entities/school-year.entity';
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
