import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { OccurrenceType } from 'src/modules/ocurrences/entities/OccurrenceType';

@Injectable()
export class OccurrenceTypeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidOccurrenceType(value)) {
      throw new BadRequestException(
        `Tipo de ocorrência inválido. Deveria ser um dos seguintes valores: ${Object.values(
          OccurrenceType,
        ).join(', ')}`,
      );
    }
    return value;
  }

  private isValidOccurrenceType(value: any): value is OccurrenceType {
    console.log("valeu now", value)
    if (!value) {
      return true;
    }
    return Object.values(OccurrenceType).includes(value);
  }
}
