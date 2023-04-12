import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IS_LENGTH, Length } from 'class-validator';

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Length(10)
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
}
