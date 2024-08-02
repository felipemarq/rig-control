import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { OccurrenceRepository } from 'src/shared/database/repositories/occurrences.repositories';
import { FilesRepository } from 'src/shared/database/repositories/files.repositories';

interface OccurrenceWithFiles {
  id: string;
  files: {
    id: string;
    path: string;
    userId: string;
    occurrenceId: string;
    createdAt: Date;
  }[];
}

@Injectable()
export class FileService {
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
    const occurrence = (await this.occurrencesRepo.findUnique({
      where: { id: occurrenceId },
      select: { id: true, files: true },
    })) as unknown as OccurrenceWithFiles;

    if (!occurrence) {
      throw new NotFoundException('Ocorrência não encontrada!');
    }

    if (occurrence.files.length > 0) {
      await this.deleteOccurenceFile(occurrenceId);
      await this.filesRepo.deleteMany({ where: { occurrenceId } });
    }

    const awsKey = `${occurrenceId}-${file.originalname}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'conterp-file-uploader',
        Key: awsKey,
        Body: file.buffer,
      }),
    );

    await this.filesRepo.create({
      data: {
        path: `https://conterp-file-uploader.s3.amazonaws.com/${awsKey}`,
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
      return;
      // throw new NotFoundException('Arquivo não encontrado!');
    }

    const awsKey = file.path.split('/')[3];

    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: 'conterp-file-uploader',
        Key: awsKey,
      }),
    );
  }
}
