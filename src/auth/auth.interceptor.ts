import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../users/users.service';
import { RequestType } from './types/request.type';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<RequestType>();
    const userId = req.session?.userId;
    if (!userId) {
      return next.handle();
    }

    const user = await this.usersService.getById(parseInt(userId));
    req.user = user ?? undefined;
    return next.handle();
  }
}
