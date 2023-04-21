import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { StudentOnSchoolYear } from '../../student-on-school-year/entities/student-on-school-year.entity';

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  oib: string;

  @Column()
  guardianName: string;

  @Column()
  guardianSurname: string;

  @Column()
  childName: string;

  @Column()
  childSurname: string;

  @Column()
  dateOfBirth: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  school: string;

  @Column()
  mobilePhone: string;

  @Column()
  email: string;
  @OneToMany(
    () => StudentOnSchoolYear,
    (studentOnSchoolYear) => studentOnSchoolYear.user,
  )
  studentOnSchoolYear: StudentOnSchoolYear[];
}
