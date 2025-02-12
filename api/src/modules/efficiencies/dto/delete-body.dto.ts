import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteBodyDto {
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  rigId: string;
}
