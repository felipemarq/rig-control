import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PeriodActionPlanItemsService } from './period-action-plan-items.service';
import { CreatePeriodActionPlanItemDto } from './dto/create-period-action-plan-item.dto';
import { UpdatePeriodActionPlanItemDto } from './dto/update-period-action-plan-item.dto';

@Controller('period-action-plan-items')
export class PeriodActionPlanItemsController {
  constructor(
    private readonly periodActionPlanItemsService: PeriodActionPlanItemsService,
  ) {}

  @Post()
  create(@Body() createPeriodActionPlanItemDto: CreatePeriodActionPlanItemDto) {
    return this.periodActionPlanItemsService.create(
      createPeriodActionPlanItemDto,
    );
  }

  @Put(':periodActionPlanItemId')
  update(
    @Param('periodActionPlanItemId') periodActionPlanItemId: string,
    @Body() updatePeriodActionPlanItemDto: UpdatePeriodActionPlanItemDto,
  ) {
    return this.periodActionPlanItemsService.update(
      periodActionPlanItemId,
      updatePeriodActionPlanItemDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':periodActionPlanItemId')
  remove(@Param('periodActionPlanItemId') periodActionPlanItemId: string) {
    return this.periodActionPlanItemsService.remove(periodActionPlanItemId);
  }
}
