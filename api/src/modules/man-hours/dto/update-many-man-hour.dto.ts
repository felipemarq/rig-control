import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UpdateManHourDto } from './update-man-hour.dto';

export class UpdateManyManHourDto {
  @ValidateNested({ each: true })
  @Type(() => UpdateManHourDto)
  periods: UpdateManHourDto[];
}
