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
    @Query('periodType') periodType: PeriodType[] | PeriodType,
    @Query('periodClassification')
    periodClassification: PeriodClassification[] | PeriodClassification,
    @Query('repairClassification')
    repairClassification: RepairClassification[] | RepairClassification,
    @Query('orderBy', OrderByValidationPipe) orderBy: OrderByType,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('pageSize') pageSize: string,
    @Query('pageIndex') pageIndex: string,
    @Query('searchTerm') searchTerm: string,
  ) {
    const normalizedPeriodType = Array.isArray(periodType)
      ? periodType
      : periodType
        ? [periodType]
        : [];
    const normalizedPeriodClassification = Array.isArray(periodClassification)
      ? periodClassification
      : periodClassification
        ? [periodClassification]
        : [];
    const normalizedRepairClassification = Array.isArray(repairClassification)
      ? repairClassification
      : repairClassification
        ? [repairClassification]
        : [];

    console.log('periodType', periodType);
    console.log('periodClassification', periodClassification);
    console.log('repairClassification', repairClassification);

    console.log('==============================');

    console.log('normalizedPeriodType', normalizedPeriodType);
    console.log(
      'normalizedPeriodClassification',
      normalizedPeriodClassification,
    );
    console.log(
      'normalizedRepairClassification',
      normalizedRepairClassification,
    );

    return await this.periodsService.findByPeriodType({
      rigId,
      periodType: normalizedPeriodType,
      periodClassification: normalizedPeriodClassification,
      repairClassification: normalizedRepairClassification,
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
