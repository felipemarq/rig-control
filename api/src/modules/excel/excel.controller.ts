import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { ExcelService } from './excel.service';
import { CreateExcelDto } from './dto/create-excel.dto';
import { UpdateExcelDto } from './dto/update-excel.dto';
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
