import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateEvaluationDto } from './create-evaluation.dto';
import { Type } from 'class-transformer';

export class CreateChecklistDto {
  @IsNotEmpty()
  @IsString()
  well: string;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  rigId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  supervisor: string;

  @IsString()
  @IsNotEmpty()
  team: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsOptional()
  @IsNumber()
  goal?: number; // Meta opcional (se precisar ser customizada)

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEvaluationDto)
  evaluations: CreateEvaluationDto[];
}
