import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
export enum RequestStatus {
  Approved = 'approved',
  Rejected = 'rejected',
  Pending = 'pending',
}
export enum UserRequestCategory {
  SPORTSEQUIPMENT = 'sportsequipment',
  OTHER = 'other',
}
@Entity()
export class UserRequest extends Request {
  @Column()
  userRequestStatus: RequestStatus;

  @Column()
  userRequestCategory: UserRequestCategory;

  @Column()
  userRequestTitle: string;

  @Column({ nullable: true })
  userRequestDescription: string;

  @Column({ nullable: true })
  userRequestQuantity: number;

  @Column({ type: 'money' })
  userRequestCostPerUnit: number;

  @Column()
  userRequestStoreInfo: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  requestDate: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
