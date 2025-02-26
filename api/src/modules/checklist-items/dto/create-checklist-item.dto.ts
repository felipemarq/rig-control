import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ChecklistItemCategory } from '../entities/ChecklistItemCategory';

export class CreateChecklistItemDto {
  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsEnum(ChecklistItemCategory)
  category: ChecklistItemCategory;
}
