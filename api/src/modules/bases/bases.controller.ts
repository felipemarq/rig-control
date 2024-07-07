import { Controller, Get } from '@nestjs/common';
import { BasesService } from './bases.service';

@Controller('bases')
export class BasesController {
  constructor(private readonly basesService: BasesService) {}

  @Get()
  findAll() {
    return this.basesService.findAll();
  }
}
