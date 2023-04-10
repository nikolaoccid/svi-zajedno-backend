import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class SchoolYear {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  startYear: number;

  @Column({ unique: true })
  endYear: number;
}
