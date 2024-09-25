import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { OccurrenceSeverity } from 'src/modules/ocurrences/entities/OccurrenceSeverity';

@Injectable()
export class OccurrenceSeverityValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidOccurrenceSeverity(value)) {
      throw new BadRequestException(
        `Gravidade de ocorrência inválido. Deveria ser um dos seguintes valores: ${Object.values(
          OccurrenceSeverity,
        ).join(', ')}`,
      );
    }

    return value;
  }

  private isValidOccurrenceSeverity(value: any): value is OccurrenceSeverity {
    if (!value) {
      return true;
    }
    return Object.values(OccurrenceSeverity).includes(value);
  }
}
