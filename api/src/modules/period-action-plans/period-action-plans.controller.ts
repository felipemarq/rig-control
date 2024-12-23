import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
    return this.periodActionPlansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodActionPlansService.findOne(+id);
  }

  @Patch(':periodActionPlanId')
  update(
    @Param('periodActionPlanId') periodActionPlanId: string,
    @Body() updatePeriodActionPlanDto: UpdatePeriodActionPlanDto,
  ) {
    return this.periodActionPlansService.update(
      periodActionPlanId,
      updatePeriodActionPlanDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodActionPlansService.remove(+id);
  }
}
