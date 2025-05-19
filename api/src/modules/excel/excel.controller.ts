import { Controller, Get, Query, Res } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { Response } from 'express';
import { PeriodType } from '../efficiencies/entities/PeriodType';
import { PeriodClassification } from '../efficiencies/entities/PeriodClassification';
import { RepairClassification } from '../efficiencies/entities/RepairClassification';
import { OrderByValidationPipe } from 'src/shared/pipes/OrderByValidationPipe';
import { OrderByType } from '../periods/entities/OrderByType';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get()
  getAllRigsReport(
    @Res() response: Response,
    @ActiveUserId() userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('gloss') gloss: boolean,
  ) {
    return this.excelService.getAllRigsReport(
      {
        startDate,
        endDate,
        userId,
      },
      response,
    );
  }

  @Get('/periods')
  async getPeriodsReport(
    @Res() response: Response,
    @Query('rigId') rigId: string | null,
    @Query('periodType') periodType: PeriodType | null,
    @Query('periodClassification')
    periodClassification: PeriodClassification | null,
    @Query('repairClassification')
    repairClassification: RepairClassification | null,
    @Query('orderBy', OrderByValidationPipe) orderBy: OrderByType,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('searchTerm') searchTerm: string,
  ) {
    return await this.excelService.getPeriodsReport(
      {
        rigId,
        periodType,
        periodClassification,
        repairClassification,
        orderBy,
        startDate,
        endDate,
        searchTerm,
      },
      response,
    );
  }
}
