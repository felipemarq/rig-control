import {
  IsUUID,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEvaluationDto {
  @IsUUID()
  @IsNotEmpty()
  checklistItemId: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number; // A nota dada ao item (ex: 0 a 4)

  @IsOptional()
  @IsString()
  comment?: string; // Comentário opcional
}
