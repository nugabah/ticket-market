import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { History } from 'src/history/entities/history.entity';
import { Show } from 'src/show/entities/show.entity';
import { Reserve } from './entities/reserve.entity';
import { Seat } from 'src/seats/entities/seat.entity';
import _ from 'lodash';

@Injectable()
export class ReserveService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(History)
    private historyRepository: Repository<History>,
    @InjectRepository(Show)
    private showRepository : Repository<Show>,
    @InjectRepository(Reserve)
    private reserveRepository: Repository<Reserve>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  async create(showId: number, createReserveDto: CreateReserveDto, userId: number) {
    const { title, date_time, quantity, total_price } = createReserveDto;
    const show = await this.showRepository.findOne({
      where: { id: showId },
    });
    if (!show) {
      throw new NotFoundException(' 찾는 공연이 없습니다.');
    }
    if (title !== show.title) {
      throw new BadRequestException('예매하실 공연을 바르게 입력해주세요.');
    }
    if (quantity < 1) {
      throw new BadRequestException('수량은 하나 이상이어야합니다.');
    }
    if (total_price !== quantity * show.price) {
      throw new BadRequestException('결제금액을 바르게 입력해주세요.');
    }
    const findDateTime: number = show.date_time.findIndex(el => el === date_time);
    if (findDateTime === -1) {
      throw new NotFoundException(' 찾는 날짜 및 시간이 없습니다.');
    }
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const wallet = user.wallet;
    if (total_price > wallet) {
      throw new BadRequestException('잔액이 부족합니다.');
    }
    const seat = show.seat_number[findDateTime];
    // const reservedShow = await this.showRepository.update({id: showId},{ show.date_time[findDateTime]:, show.seat_number[findDateTime]}:)
    // const reservedUser = await this.userRepository.update({id: userId},{ wallet: wallet-total_price })
    // const history = await this.historyRepository.save({balance, deposit, withdraw, user_id, reserve_id })
    // const reserve = await this.reserveRepository.save(createReserveDto);
    console.log(findDateTime);
    console.log(show.price);
    console.log(quantity);
    return '예매 완료(아직임)';
  }

  findAll() {
    return `This action returns all reserve`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reserve`;
  }

  update(id: number, updateReserveDto: UpdateReserveDto) {
    return `This action updates a #${id} reserve`;
  }

  remove(id: number) {
    return `This action removes a #${id} reserve`;
  }
}
