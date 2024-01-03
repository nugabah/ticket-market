import Joi from 'joi';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import _ from 'lodash';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async signIn(createAuthDto: CreateAuthDto) {
      const { email, password } = createAuthDto;
      const isExist = await this.userRepository.findOne({
        where: { email, deleted_at: null },
        select: ['password','is_admin','id'],
      });

      if (_.isNil(isExist)) {
        throw new UnauthorizedException('이메일 또는 비밀번호가 다릅니다.');
      }
      if (isExist.password !== password) {
        throw new UnauthorizedException('이메일 또는 비밀번호가 다릅니다.');
      }
      const admin = isExist.is_admin;
      const tokenKey = this.configService.get<string>('TOKENKEY');
      const token = jwt.sign(
        {
          id: isExist.id,
        },
        tokenKey,
        { expiresIn: '1h' },
      );
      return { token, admin };
  }
}
