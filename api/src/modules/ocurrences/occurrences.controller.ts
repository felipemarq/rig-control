import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
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

  @Put(':occurrenceId')
  update(
    @Param('occurrenceId') occurrenceId: string,
    @Body() updateOcurrenceDto: UpdateOcurrenceDto,
  ) {
    return this.occurrencesService.update(occurrenceId, updateOcurrenceDto);
  }

  @Delete(':occurrenceId')
  remove(@Param('occurrenceId') occurrenceId: string) {
    return this.occurrencesService.remove(occurrenceId);
  }
}
