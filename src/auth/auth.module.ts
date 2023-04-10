import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { HashService } from '../users/hash.service';
import { AuthController } from './auth.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './auth.interceptor';
import { JwtService } from './jwt.service';
import { JwtMiddleware } from './jwt.middleware';

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
