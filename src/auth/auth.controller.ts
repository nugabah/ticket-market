import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async create(@Body() createAuthDto: CreateAuthDto, @Res({ passthrough: true }) res: Response) {
    try {
      const user = await this.authService.signIn(createAuthDto);
      const token = user.token;
      const admin = user.admin;
      const expires = new Date(Date.now() + 60 * 60000);
      res.cookie('admin', `${admin}`, {
        expires: expires,
      });
      res.cookie('authorization', `Bearer ${token}`, {
        expires: expires,
      });
      return `로그인 성공!`;
    } catch (error) {
      throw new UnauthorizedException('인증에 실패하였습니다.');
    }
  }

  @Post('signout')
  remove(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('admin');
    res.clearCookie('authorization');
    return { success: true, message: '로그아웃 성공' };
  }
}
