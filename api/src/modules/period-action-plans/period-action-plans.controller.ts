import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { PeriodActionPlansService } from './period-action-plans.service';
import { CreatePeriodActionPlanDto } from './dto/create-period-action-plan.dto';
import { UpdatePeriodActionPlanDto } from './dto/update-period-action-plan.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('period-action-plans')
export class PeriodActionPlansController {
  constructor(
    private readonly periodActionPlansService: PeriodActionPlansService,
  ) {}

  @Post()
  create(
    @ActiveUserId() userId: string,
    @Body() createPeriodActionPlanDto: CreatePeriodActionPlanDto,
  ) {
    return this.periodActionPlansService.create(
      userId,
      createPeriodActionPlanDto,
    );
  }

  @Get()
  findAll() {
    return this.periodActionPlansService.findMany();
  }

  @Get(':periodActionPlanId')
  findOne(@Param('periodActionPlanId') periodActionPlanId: string) {
    return this.periodActionPlansService.findOne(periodActionPlanId);
  }

  @Put(':periodActionPlanId')
  update(
    @Param('periodActionPlanId') periodActionPlanId: string,
    @Body() updatePeriodActionPlanDto: UpdatePeriodActionPlanDto,
  ) {
    return this.periodActionPlansService.update(
      periodActionPlanId,
      updatePeriodActionPlanDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':periodActionPlanId')
  remove(@Param('periodActionPlanId') periodActionPlanId: string) {
    return this.periodActionPlansService.remove(periodActionPlanId);
  }
}
