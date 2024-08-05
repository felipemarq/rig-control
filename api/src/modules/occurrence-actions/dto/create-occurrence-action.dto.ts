import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOccurrenceActionDto {
  @IsUUID()
  @IsNotEmpty()
  occurrenceId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @IsString()
  @IsNotEmpty()
  responsible: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsOptional()
  isFinished: boolean;
}
