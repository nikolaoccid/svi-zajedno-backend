import { Injectable } from '@nestjs/common';

import { HashService } from '../users/hash.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  async getUserByLoginCredentials(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.getByEmail(email);

    if (!user) {
      return undefined;
    }

    const isPasswordCorrect = await this.hashService.isMatch(
      password,
      user.passwordHash,
    );

    return isPasswordCorrect ? user : undefined;
  }
}
