import { Module } from '@nestjs/common';
import { OccurrencesService } from './occurrences.service';
import { OccurrencesController } from './occurrences.controller';
import { UploadFileService } from '../upload-file/upload-file.service';

@Module({
  controllers: [OccurrencesController],
  providers: [OccurrencesService, UploadFileService],
})
export class OccurrencesModule {}
