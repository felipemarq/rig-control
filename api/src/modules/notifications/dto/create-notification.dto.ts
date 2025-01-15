import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AccessLevel } from 'src/modules/auth/entities/AccessLevel';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  systemVersionId: string;

  @IsOptional()
  @IsEnum(AccessLevel)
  accessLevel: AccessLevel;
}
