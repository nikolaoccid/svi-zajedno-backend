import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as diagnostics_channel from 'diagnostics_channel';

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  oib: number;

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
  MobilePhone: string;

  @Column()
  email: string;
}
