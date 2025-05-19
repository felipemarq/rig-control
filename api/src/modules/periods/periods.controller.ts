import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { PeriodType } from '../efficiencies/entities/PeriodType';
import { PeriodTypeValidationPipe } from 'src/shared/pipes/PeriodTypeValidationPipe';
import { OrderByType } from './entities/OrderByType';
import { OrderByValidationPipe } from 'src/shared/pipes/OrderByValidationPipe';
import { PeriodClassification } from '../efficiencies/entities/PeriodClassification';
import { PeriodClassificationValidationPipe } from 'src/shared/pipes/PeriodClassificationValidationPipe';
import { RepairClassification } from '../efficiencies/entities/RepairClassification';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('periods')
export class PeriodsController {
  constructor(private readonly periodsService: PeriodsService) {}

  @Post()
  create(@Body() createPeriodDto: CreatePeriodDto) {
    return this.periodsService.create(createPeriodDto);
  }

  @Get('/unbilled')
  async getUnbilledPeriods(
    @ActiveUserId() userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.periodsService.getUnbilledPeriods({
      startDate,
      endDate,
      userId,
    });
  }

  @Get('/interventions')
  async getInterventions(
    @ActiveUserId() userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.periodsService.getTotalInterventions({
      startDate,
      endDate,
    });
  }

  @Get()
  async findByPeriodType(
    @Query('rigId') rigId: string | null,
    @Query('periodType') periodType: PeriodType | null,
    @Query('periodClassification')
    periodClassification: PeriodClassification | null,
    @Query('repairClassification')
    repairClassification: RepairClassification | null,
    @Query('orderBy', OrderByValidationPipe) orderBy: OrderByType,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('pageSize') pageSize: string,
    @Query('pageIndex') pageIndex: string,
    @Query('searchTerm') searchTerm: string,
  ) {
    return await this.periodsService.findByPeriodType({
      rigId,
      periodType,
      periodClassification,
      repairClassification,
      orderBy,
      startDate,
      endDate,
      searchTerm,
      pageSize,
      pageIndex,
    });
  }

  @Get('/:periodId')
  async findOne(@Param('periodId', ParseUUIDPipe) periodId: string) {
    return await this.periodsService.findOne(periodId);
  }
}
