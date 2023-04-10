import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { Config } from '../utils/config.service';

@Injectable()
export class JwtService {
  constructor(
    private readonly usersService: UsersService,
    private readonly config: Config,
  ) {}
  secret = this.config.jwtSecret();

  sign(user: User) {
    return jwt.sign({ userId: user.id }, this.secret);
  }

  async verify(token: string | undefined) {
    if (!token) {
      throw new Error('Missing token');
    }
    const result = jwt.verify(token, this.secret);
    if (typeof result === 'string') {
      throw new Error('Token expected to be object');
    }
    const { userId } = result;
    const user = await this.usersService.getById(userId);

    if (!user) {
      throw new Error('No such user');
    }

    return user;
  }
}
