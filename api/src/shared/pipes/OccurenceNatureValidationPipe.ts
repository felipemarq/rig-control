import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { OccurenceNature } from 'src/modules/ocurrences/entities/OccurenceNature';

@Injectable()
export class OccurenceNatureValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isValidOccurenceNature(value)) {
      throw new BadRequestException(
        `Tipo de ocorrência inválido. Deveria ser um dos seguintes valores: ${Object.values(
          OccurenceNature,
        ).join(', ')}`,
      );
    }
    return value;
  }

  private isValidOccurenceNature(value: any): value is OccurenceNature {
    return Object.values(OccurenceNature).includes(value);
  }
}
