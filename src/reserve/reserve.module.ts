import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from 'src/history/entities/history.entity';
import { User } from 'src/users/entities/user.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import { Show } from 'src/show/entities/show.entity';
import { Reserve } from './entities/reserve.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Reserve]),TypeOrmModule.forFeature([History]),TypeOrmModule.forFeature([Seat]),TypeOrmModule.forFeature([Show])],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
