import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import { RequestType } from '../types/request.type';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest<RequestType>().user;
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  },
);
