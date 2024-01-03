import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { Request, Response } from 'express';

interface CustomRequest extends Request {
  userId?: number;
}

@Controller('api/reserve')
export class ReserveController {
  constructor(private readonly reserveService: ReserveService) {}

  @Post(':id')
  create(@Param('id') showId: string, @Body() createReserveDto: CreateReserveDto, @Req() req: CustomRequest ) {
    const userId = req.userId
    return this.reserveService.create(+showId, createReserveDto, userId);
  }

  @Get()
  findAll() {
    return this.reserveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reserveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReserveDto: UpdateReserveDto) {
    return this.reserveService.update(+id, updateReserveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reserveService.remove(+id);
  }
}
