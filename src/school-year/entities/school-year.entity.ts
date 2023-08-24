import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Activity } from '../../activity/entities/activity.entity';
import { StudentOnSchoolYear } from '../../student-on-school-year/entities/student-on-school-year.entity';

@Entity()
export class SchoolYear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  startYear: number;

  @Column({ unique: true })
  endYear: number;

  @OneToMany(
    () => StudentOnSchoolYear,
    (studentOnSchoolYear) => studentOnSchoolYear.schoolYear,
  )
  studentOnSchoolYear: StudentOnSchoolYear[];

  @OneToMany(() => Activity, (activity) => activity.schoolYear)
  activity: Activity[];
}
