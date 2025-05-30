import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateEfficiencyDto {
  @IsOptional()
  @IsBoolean()
  isEditable: boolean;

  @IsOptional()
  @IsBoolean()
  isConfirmed: boolean;
}
