import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { ReserveService } from 'src/reserve/reserve.service';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { User } from 'src/users/entities/user.entity';
import { Show } from 'src/show/entities/show.entity';
import { Reserve } from 'src/reserve/entities/reserve.entity';
import { Seat } from 'src/seats/entities/seat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([History]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Show]),
    TypeOrmModule.forFeature([Reserve]),
    TypeOrmModule.forFeature([Seat]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService, ReserveService, UsersService],
})
export class HistoryModule {}
