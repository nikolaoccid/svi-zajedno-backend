import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminRoleMiddleware } from '../admin-role.middleware';
import { RequestEntity } from './entities/request.entity';
import { UserRequest } from './entities/user-request.entity';
import { UserRequestController } from './user-request.controller';
import { UserRequestService } from './user-request.service';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEntity, UserRequest])],
  providers: [UserRequestService],
  controllers: [UserRequestController],
})
export class UserRequestModule {}
