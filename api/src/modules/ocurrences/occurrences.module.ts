import { Module } from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { OccurrencesController } from './occurrences.controller';
import { FileService } from '../file/file.service';

@Module({
  controllers: [OccurrencesController],
  providers: [OccurrencesService, FileService],
})
export class OccurrencesModule {}
