import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from './hash.service';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.passwordHash = await this.hashService.hashPassword(
      createUserDto.password,
    );
    return this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async getByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async getById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
