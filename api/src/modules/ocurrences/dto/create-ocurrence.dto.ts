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
import { Nature } from '../entities/OccurenceNature';
import { OccurrenceCategory } from '../entities/OccurrenceCategory';
import { UF } from '../entities/UF';
import { OccurrenceSeverity } from '../entities/OccurrenceSeverity';

export class CreateOcurrenceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  hour: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UF)
  state: UF;

  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  baseId: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  clientId: string;

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

  @IsEnum(OccurrenceCategory)
  @IsOptional()
  category: OccurrenceCategory;

  @IsEnum(OccurrenceSeverity)
  @IsOptional()
  severity: OccurrenceSeverity;

  @IsEnum(Nature)
  @IsNotEmpty()
  nature: Nature;

  @IsString()
  @IsOptional()
  @IsDateString()
  updatedAt: string;
}
