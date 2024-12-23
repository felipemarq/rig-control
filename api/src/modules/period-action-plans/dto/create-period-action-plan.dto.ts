import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreatePeriodActionPlanDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  periodId: string;
}
