// admin-role.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { UserRole } from './users/user.entity';

@Injectable()
export class AdminRoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    const user = req.user;

    if (user.role !== UserRole.Admin) {
      throw new UnauthorizedException();
    }

    next();
  }
}
