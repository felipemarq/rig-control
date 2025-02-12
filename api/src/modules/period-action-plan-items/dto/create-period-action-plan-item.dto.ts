import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePeriodActionPlanItemDto {
  @IsNumber()
  @IsNotEmpty()
  sequenceNumber: number;

  @IsString()
  @IsNotEmpty()
  task: string;

  @IsString()
  @IsNotEmpty()
  assignee: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsNotEmpty()
  instructions: string;

  @IsString()
  @IsOptional()
  notes: string;

  @IsUUID()
  @IsOptional()
  @IsString()
  actionPlanId: string;

  @IsOptional()
  @IsDateString()
  finishedAt?: string;

  @IsOptional()
  @IsBoolean()
  isFinished?: boolean;
}
