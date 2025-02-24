import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { CreateOcurrenceDto } from './dto/create-ocurrence.dto';
import { UpdateOcurrenceDto } from './dto/update-ocurrence.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { OccurrenceCategory } from './entities/OccurrenceCategory';
import { OccurrenceSeverity } from './entities/OccurrenceSeverity';
import { OccurrenceType } from './entities/OccurrenceType';

import { UF } from './entities/UF';
import { OccurenceNature } from './entities/OccurenceNature';
import { OccurrenceCategoryValidationPipe } from 'src/shared/pipes/OccurrenceCategoryValidationPipe';
import { OccurrenceSeverityValidationPipe } from 'src/shared/pipes/OccurrenceSeverityValidationPipe';
import { OccurrenceTypeValidationPipe } from 'src/shared/pipes/OccurrenceTypeValidationPipe';
import { OccurenceNatureValidationPipe } from 'src/shared/pipes/OccurenceNatureValidationPipe';
import { y } from 'pdfkit';

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

  @Get('/taxes')
  getAllTaxes(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('baseId') baseId: string,
    @Query('year') year: string,
  ) {
    return this.occurrencesService.getAllTaxes({
      startDate,
      endDate,
      baseId,
      year,
    });
  }

  @Get('/taxes/:baseId')
  getTaxesByRigId(@Param('baseId') baseId: string) {
    return this.occurrencesService.getTaxesByRigId(baseId);
  }

  @Get()
  findAll(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('year') year: string,
    @Query('category', OccurrenceCategoryValidationPipe)
    category: OccurrenceCategory,
    @Query('severity', OccurrenceSeverityValidationPipe)
    severity: OccurrenceSeverity,
    @Query('type', OccurrenceTypeValidationPipe) type: OccurrenceType,
    @Query('uf') uf: UF,
    @Query('baseId') baseId: string,
    @Query('nature', OccurenceNatureValidationPipe) nature: OccurenceNature,
  ) {
    return this.occurrencesService.findAll(
      nature,
      category,
      severity,
      type,
      uf,
      baseId,
      year,
    );
  }

  @Put(':occurrenceId')
  update(
    @Param('occurrenceId', ParseUUIDPipe) occurrenceId: string,
    @Body() updateOcurrenceDto: UpdateOcurrenceDto,
  ) {
    return this.occurrencesService.update(occurrenceId, updateOcurrenceDto);
  }

  @Delete(':occurrenceId')
  remove(@Param('occurrenceId', ParseUUIDPipe) occurrenceId: string) {
    return this.occurrencesService.remove(occurrenceId);
  }
}
