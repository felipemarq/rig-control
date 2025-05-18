import {
  Controller,
  Get,
  Query,
  Res,
} from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { Response } from 'express';

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
}
