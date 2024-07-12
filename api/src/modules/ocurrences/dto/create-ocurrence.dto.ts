import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { OccurrenceType } from '../entities/OccurrenceType';
import { Nature } from '../entities/Nature';

export class CreateOcurrenceDto {
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  hour: string;

  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  baseId: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  createdAt: string;

  @IsBoolean()
  @IsNotEmpty()
  isAbsent: boolean;

  @IsEnum(OccurrenceType)
  @IsNotEmpty()
  type: OccurrenceType;

  @IsEnum(Nature)
  @IsNotEmpty()
  nature: Nature;

  @IsString()
  @IsOptional()
  @IsDateString()
  updatedAt: string;
}
