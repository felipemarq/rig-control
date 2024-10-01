import { Controller, Get, ParseUUIDPipe, Query } from '@nestjs/common';
import { BillingsService } from './billings.service';
import { IsUserAdm } from 'src/shared/decorators/IsUserAdm';

@Controller('billings')
export class BillingsController {
  constructor(private readonly billingsService: BillingsService) {}

  @Get()
  async findByRigId(
    @IsUserAdm() userId: string,
    @Query('rigId', ParseUUIDPipe)
    rigId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    console.log({ startDate, endDate });
    const res = await this.billingsService.findByRigId({
      rigId,
      startDate,
      endDate,
    });
    return res;
  }

  @Get('/all')
  async findAll(
    @IsUserAdm() userId: string,
    @Query('startDate')
    startDate: string,
    @Query('endDate') endDate: string,
  ) {
    console.log({ startDate, endDate });
    return await this.billingsService.findAll({ startDate, endDate });
  }
}

//databox
