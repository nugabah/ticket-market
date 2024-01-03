import { Injectable, NestMiddleware, NotFoundException, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import jwt from "jsonwebtoken";
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';

interface CustomRequest extends Request {
  userId?: number;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}
  
  async use(@Req() req: CustomRequest, @Res({ passthrough: true }) res: Response, next: () => void) {
    const { authorization } = req.cookies;
    if (!authorization) {
      throw new UnauthorizedException ("로그인이 필요합니다.");
    }
    const [tokenType, token] = authorization.split(" ");
    if (tokenType !== "Bearer") {
      throw new UnauthorizedException ("토큰 타입이 일치하지 않습니다.");
    }
    const tokenKey = this.configService.get<string>('TOKENKEY');
    const decodedToken: any = jwt.verify(token, tokenKey);
    const userId: number = decodedToken.id;
    if (!userId) {
      console.log(userId);
      throw new UnauthorizedException ( "토큰 형태 에러." );
    }
    const user = await this.userRepository.findOne({
      where: { id: userId, deleted_at: null },
    });
    if (!user) {
      throw new NotFoundException ( "토큰 사용자가 존재하지 않습니다." );
    }
    req.userId = userId;
    console.log(`middleware userId: ${userId}`);
    next();
  }
}
