import { IsInt, IsUUID } from 'class-validator';

export class CreateManyManHourDto {
  @IsUUID()
  baseId: string;

  @IsInt()
  year: number;
}
