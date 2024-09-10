import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { OccurrenceCategory } from 'src/modules/ocurrences/entities/OccurrenceCategory';

@Injectable()
export class OccurrenceCategoryValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidOccurrenceCategory(value)) {
      throw new BadRequestException(
        `Tipo de ocorrência inválido. Deveria ser um dos seguintes valores: ${Object.values(
          OccurrenceCategory,
        ).join(', ')}`,
      );
    }
    return value;
  }

  private isValidOccurrenceCategory(value: any): value is OccurrenceCategory {
    if (!value) {
      return true;
    }
    return Object.values(OccurrenceCategory).includes(value);
  }
}
