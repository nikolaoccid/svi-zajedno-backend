import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ProjectAssociate } from '../../project-associate/entities/project-associate.entity';
import { ProjectUser } from '../../project-user/entities/project-user.entity';
enum ContactType {
  Email = 'email',
  Phone = 'phone',
}
@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: ContactType, default: ContactType.Email })
  contactType: ContactType;

  @Column()
  userId: number;

  @Column()
  data: string;
}
