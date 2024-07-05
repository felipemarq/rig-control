import { PartialType } from '@nestjs/mapped-types';
import { CreateOcurrenceDto } from './create-ocurrence.dto';

export class UpdateOcurrenceDto extends PartialType(CreateOcurrenceDto) {}
