import { PartialType } from '@nestjs/mapped-types';
import { CreatePeriodActionPlanDto } from './create-period-action-plan.dto';

export class UpdatePeriodActionPlanDto extends PartialType(CreatePeriodActionPlanDto) {}
