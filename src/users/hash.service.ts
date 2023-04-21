import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class HashService {
  private saltOrRounds = 10;

  async hashPassword(password: string) {
    return await hash(password, this.saltOrRounds);
  }
  async isMatch(password: string, passwordHash: string) {
    return compare(password, passwordHash);
  }
}
