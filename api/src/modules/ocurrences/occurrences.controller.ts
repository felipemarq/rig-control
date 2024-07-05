import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { CreateOcurrenceDto } from './dto/create-ocurrence.dto';
import { UpdateOcurrenceDto } from './dto/update-ocurrence.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('occurrences')
export class OccurrencesController {
  constructor(private readonly occurrencesService: OccurrencesService) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createOcurrenceDto: CreateOcurrenceDto,
  ) {
    return this.occurrencesService.create(userId, createOcurrenceDto);
  }

  @Get()
  findAll() {
    return this.occurrencesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.occurrencesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOcurrenceDto: UpdateOcurrenceDto,
  ) {
    return this.occurrencesService.update(+id, updateOcurrenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.occurrencesService.remove(+id);
  }
}
