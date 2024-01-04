import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from 'src/history/entities/history.entity';

@Injectable()
export class HistoryService {

  constructor(
    
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  create(createHistoryDto: CreateHistoryDto) {
    return 'This action adds a new history';
  }

  async findAll(userId: number) {
    return await this.historyRepository.find({
      where: {user_id: userId},
      order: {
        created_at: 'DESC',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} history`;
  }

  update(id: number, updateHistoryDto: UpdateHistoryDto) {
    return `This action updates a #${id} history`;
  }

  remove(id: number) {
    return `This action removes a #${id} history`;
  }
}
