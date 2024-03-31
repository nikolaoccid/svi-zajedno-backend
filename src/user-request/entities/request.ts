import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;
}
