import _ from 'lodash';
import { Repository } from 'typeorm';

import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { RemovePostDTO } from './dto/remove-post.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const isExist = await this.userRepository.find({
      where: { email, deleted_at: null },
    });
    if (isExist) {
      throw new ConflictException ('이미 존재하는 계정입니다');
    }
    const createdUser = await this.userRepository.save(createUserDto);
    return `${createdUser.nickname}님 회원가입 완료.`
  }

  async findAll() {
    return await this.userRepository.find({
      where: { deleted_at: null },
      select: ['id', 'nickname'],
    });
  }

  async findOne(id: number) {
    if (_.isNaN(id)) {
      throw new BadRequestException(' 찾는 아이디가 없습니다.');
    }

    return await this.userRepository.findOne({
      where: { id, deleted_at: null },
      select: ['id', 'email', 'nickname', 'wallet', 'is_admin', 'created_at', 'updated_at'],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { nickname, password } = updateUserDto;
    const user = await this.userRepository.findOne({
      select: ['nickname'],
      where: { id },
    });

    if (_.isNil(user)) {
      throw new NotFoundException('정보를 찾을 수 없습니다.');
    }

    if (!_.isNil(user.password) && user.password !== password) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    await this.userRepository.update({id},{ nickname });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
