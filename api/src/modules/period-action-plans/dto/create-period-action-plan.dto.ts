import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreatePeriodActionPlanItemDto } from 'src/modules/period-action-plan-items/dto/create-period-action-plan-item.dto';

export class CreatePeriodActionPlanDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  periodId: string;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  rigId: string;

  @IsOptional()
  @IsDateString()
  finishedAt?: string;

  @IsOptional()
  @IsBoolean()
  isFinished?: boolean;

  @ValidateNested({ each: true })
  @Type(() => CreatePeriodActionPlanItemDto)
  periodActionPlanItems: CreatePeriodActionPlanItemDto[];
}
