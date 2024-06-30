import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
