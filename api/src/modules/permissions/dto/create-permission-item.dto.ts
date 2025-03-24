import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Module } from 'src/shared/entities/Module';

export class PermissionItemDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsEnum(Module)
  module: Module;

  @IsBoolean()
  canView: boolean;

  @IsBoolean()
  canEdit: boolean;

  @IsBoolean()
  canCreate: boolean;
}
