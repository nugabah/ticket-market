import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { ReserveService } from 'src/reserve/reserve.service';
import { User } from 'src/users/entities/user.entity';
import { HistoryService } from 'src/history/history.service';
import { History } from 'src/history/entities/history.entity';
import { Reserve } from 'src/reserve/entities/reserve.entity';
import { Seat } from 'src/seats/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Show]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([History]), TypeOrmModule.forFeature([Reserve]), TypeOrmModule.forFeature([Seat])],
  controllers: [ShowController],
  providers: [ShowService, ReserveService, HistoryService],
})
export class ShowModule {}
