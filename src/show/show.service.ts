import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { Like, Repository } from 'typeorm';
import _ from 'lodash';

@Injectable()
export class ShowService {

  constructor(
    @InjectRepository(Show) private showRepository: Repository<Show>,
  ) {}
  
  async create(createShowDto: CreateShowDto) {
    const createdShow = await this.showRepository.save(createShowDto);
    return `제목: ${createdShow.title} 등록 완료.`
  }

  async findAll(title: string) {
    if (!title) {
      return await this.showRepository.find({
        select: ['id', 'title', 'image', 'category'],
      });
    }
    return await this.showRepository.find({
      where: {
        title: Like(`%${title}%`),
      },
      select: ['id', 'title', 'image', 'category'],
    });
  }

  async findOne(id: number) {
    if (_.isNaN(id)) {
      throw new BadRequestException(' 찾는 아이디가 없습니다.');
    }
    return await this.showRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateShowDto: UpdateShowDto) {
    return `This action updates a #${id} show`;
  }

  remove(id: number) {
    return `This action removes a #${id} show`;
  }
}
