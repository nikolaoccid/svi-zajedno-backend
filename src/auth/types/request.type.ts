import { User } from '../../users/user.entity';
import { SessionType } from './session.type';

export interface RequestType {
  session?: SessionType;
  user?: User;
}
