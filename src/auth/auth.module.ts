import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { HashService } from '../users/hash.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';
import { JwtMiddleware } from './jwt.middleware';
import { JwtService } from './jwt.service';

@Module({
  imports: [UsersModule],
  providers: [
    AuthService,
    HashService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    },
    JwtService,
  ],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
