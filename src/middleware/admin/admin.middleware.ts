import { Injectable, NestMiddleware, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  use(@Req() req: Request, @Res({ passthrough: true }) res: Response, next: () => void) {
    const { admin } = req.cookies;
    const isAdmin: boolean = admin === 'true';
    if (!isAdmin) {
      throw new UnauthorizedException ('권한이 없습니다.');
    }
    next();
  }
}
