import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateManHourDto {
  @IsUUID()
  baseId: string;

  @IsInt()
  year: number;

  @IsInt()
  month: number;

  @IsNumber()
  hours: number;

  @IsString()
  @IsOptional()
  @IsDateString()
  updatedAt: string;
}
