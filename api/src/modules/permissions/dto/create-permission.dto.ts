import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { PermissionItemDto } from './create-permission-item.dto';

export class CreatePermissionDto {
  @ValidateNested({ each: true })
  @Type(() => PermissionItemDto)
  permissions: PermissionItemDto[];
}
