import { Body, Controller, Get, Post } from '@nestjs/common';
import { BasesService } from './bases.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('bases')
export class BasesController {
  constructor(private readonly basesService: BasesService) {}

  @Get()
  findAll() {
    return this.basesService.findAll();
  }

  @Post()
  create(@ActiveUserId() userId: string, @Body() createBaseDto: CreateBaseDto) {
    return this.basesService.create(userId, createBaseDto);
  }
}
