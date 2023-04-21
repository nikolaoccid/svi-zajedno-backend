import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { JwtService } from './jwt.service';
import { RequestType } from './types/request.type';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: RequestType & Request, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    const token =
      authHeader?.toLowerCase().startsWith('bearer ') &&
      authHeader.split(' ')[1];

    try {
      const user = await this.jwtService.verify(token);
      req.user = user;
    } catch (e) {
      // invalid token, continue unauthorized
    } finally {
      next();
    }
  }
}
