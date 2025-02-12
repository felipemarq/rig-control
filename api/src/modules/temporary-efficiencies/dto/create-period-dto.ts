import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PeriodClassification } from 'src/modules/efficiencies/entities/PeriodClassification';
import { PeriodType } from 'src/modules/efficiencies/entities/PeriodType';
import { RepairClassification } from 'src/modules/efficiencies/entities/RepairClassification';

export class PeriodDto {
  @IsString()
  @IsNotEmpty()
  @IsDateString()
  startHour: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  endHour: string;

  @IsEnum(PeriodClassification)
  @IsNotEmpty()
  classification: PeriodClassification;

  @IsEnum(PeriodType)
  @IsNotEmpty()
  type: PeriodType;

  @IsEnum(RepairClassification)
  @IsOptional()
  repairClassification: RepairClassification;

  @IsString()
  @IsNotEmpty()
  wellId: string;
}
