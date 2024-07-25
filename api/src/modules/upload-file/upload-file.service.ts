import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { OccurrenceRepository } from 'src/shared/database/repositories/occurrences.repositories';
import { FilesRepository } from 'src/shared/database/repositories/files.repositories';

@Injectable()
export class UploadFileService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private readonly configService: ConfigService,
    private readonly occurrencesRepo: OccurrenceRepository,
    private readonly filesRepo: FilesRepository,
  ) {}

  async uploadOccurenceFile(
    file: Express.Multer.File,
    userId: string,
    occurrenceId: string,
  ) {
    const occurrence = await this.occurrencesRepo.findUnique({
      where: { id: occurrenceId },
    });

    if (!occurrence) {
      throw new NotFoundException('Ocorrência não encontrada!');
    }

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'conterp-file-uploader',
        Key: occurrenceId,
        Body: file.buffer,
      }),
    );

    await this.filesRepo.create({
      data: {
        path: `https://conterp-file-uploader.s3.amazonaws.com/${occurrenceId}`,
        userId,
        occurrenceId: occurrence.id,
      },
    });
  }

  async deleteOccurenceFile(occurrenceId: string) {
    const file = await this.filesRepo.findFirst({
      where: { occurrenceId: occurrenceId },
    });

    if (!file) {
      throw new NotFoundException('Arquivo não encontrado!');
    }

    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: 'conterp-file-uploader',
        Key: occurrenceId,
      }),
    );

    await this.filesRepo.delete({
      where: { id: file.id },
    });
  }
}
