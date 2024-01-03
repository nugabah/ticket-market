import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { ReserveService } from 'src/reserve/reserve.service';
import { History } from 'src/history/entities/history.entity';
import { Show } from 'src/show/entities/show.entity';
import { Reserve } from 'src/reserve/entities/reserve.entity';
import { Seat } from 'src/seats/entities/seat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([History]),
    TypeOrmModule.forFeature([Show]),
    TypeOrmModule.forFeature([Reserve]),
    TypeOrmModule.forFeature([Seat]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, ReserveService],
})
export class UsersModule {}
