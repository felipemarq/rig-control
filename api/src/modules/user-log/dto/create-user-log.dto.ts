import { IsDateString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { LogType } from '../entities/LogType';

export class CreateUserLogDto {
  @IsNotEmpty()
  @IsDateString()
  loginTime: string;

  @IsEnum(LogType)
  @IsOptional()
  logType: LogType;
}
