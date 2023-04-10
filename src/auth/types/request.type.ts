import { SessionType } from './session.type';
import { User } from '../../users/user.entity';

export interface RequestType {
  session?: SessionType;
  user?: User;
}
