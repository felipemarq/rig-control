import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { UF } from '../entities/UF';

export class CreateRigDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  contractId: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UF)
  state: UF;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  endDate: string;

  @IsBoolean()
  isActive: boolean;

  @IsNumber()
  @IsNotEmpty()
  availableHourTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  glossHourTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  dtmLt20Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  dtmBt20And50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  dtmGt50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  dtmHourTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  fluidRatioLt20Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  fluidRatioBt20And50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  fluidRatioGt50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  equipmentRatioLt20Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  equipmentRatioBt20And50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  equipmentRatioGt50Tax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  truckCartRentTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  extraTrailerTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  powerSwivelTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  transportationTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  truckKmTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  bobRentTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  mixTankMonthRentTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  mixTankHourRentTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  generatorFuelTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  mixTankOperatorTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  mixTankDtmTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  mixTankMobilizationTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  mixTankDemobilizationTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  suckingTruckTax: number;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  readjustment: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  mobilization: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  demobilization: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  christmasTreeDisassemblyTax: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  munckTax: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  truckTankTax: number;
}
