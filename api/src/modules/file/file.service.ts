import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { OccurrenceRepository } from 'src/shared/database/repositories/occurrences.repositories';
import { FilesRepository } from 'src/shared/database/repositories/files.repositories';
import { OccurrenceActionsRepository } from 'src/shared/database/repositories/occurrence-actions.repositories';
import { PeriodActionPlansRepository } from 'src/shared/database/repositories/periodActionPlans.repositories';
import { EvaluationRepository } from 'src/shared/database/repositories/evaluation.repositories';

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

  private readonly awsBucketPath =
    'https://conterp-file-uploader.s3.amazonaws.com/';

  constructor(
    private readonly configService: ConfigService,
    private readonly occurrencesRepo: OccurrenceRepository,
    private readonly occurrencesActionsRepo: OccurrenceActionsRepository,
    private readonly filesRepo: FilesRepository,
    private readonly periodActionPlansRepo: PeriodActionPlansRepository,
    private readonly evaluationsRepo: EvaluationRepository,
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
      throw new NotFoundException('BDO não encontrado!');
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
        path: `${this.awsBucketPath}${awsKey}`,
        userId,
        occurrenceId: occurrence.id,
      },
    });
  }

  async deleteEvaluationFile(evaluationId: string) {
    const file = await this.filesRepo.findFirst({
      where: { evaluationId: evaluationId },
    });

    if (!file) {
      throw new NotFoundException('Arquivo não encontrado!');
    }

    const awsKey = file.path.split('/')[3];

    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: 'conterp-file-uploader',
        Key: awsKey,
      }),
    );

    await this.filesRepo.delete({
      where: { id: file.id },
    });
  }

  async uploadFile(file: Express.Multer.File, userId: string) {
    const randomUUID = crypto.randomUUID();
    // Gera a chave do arquivo no S3
    const awsKey = `${randomUUID}-${file.originalname}`;

    // Faz o upload para o S3
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'conterp-file-uploader',
        Key: awsKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    // Salva a referência no banco e retorna o arquivo salvo
    return await this.filesRepo.create({
      data: {
        path: `${this.awsBucketPath}${awsKey}`,
        userId,
      },
    });
  }

  async deleteFile(fileId: string) {
    const file = await this.filesRepo.findFirst({
      where: { id: fileId },
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

  async uploadOccurenceActionFile(
    file: Express.Multer.File,
    userId: string,
    occurrenceActionId: string,
  ) {
    const occurrenceAction = (await this.occurrencesActionsRepo.findUnique({
      where: { id: occurrenceActionId },
      select: { id: true, files: true },
    })) as unknown as OccurrenceWithFiles;

    if (!occurrenceAction) {
      throw new NotFoundException('BDO não encontradO!');
    }

    if (occurrenceAction.files.length > 0) {
      await this.deleteOccurenceActionFile(occurrenceActionId);
      await this.filesRepo.deleteMany({ where: { occurrenceActionId } });
    }

    const awsKey = `${occurrenceActionId}-${file.originalname}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'conterp-file-uploader',
        Key: awsKey,
        Body: file.buffer,
      }),
    );

    await this.filesRepo.create({
      data: {
        path: `${this.awsBucketPath}${awsKey}`,
        userId,
        occurrenceActionId: occurrenceAction.id,
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

  async uploadEvaluationFile(
    file: Express.Multer.File,
    userId: string,
    evaluationId: string,
  ) {
    const evaluation = await this.evaluationsRepo.findUnique({
      where: { id: evaluationId },
    });

    if (!evaluation) {
      throw new NotFoundException('Avaliação não encontrada!');
    }

    const awsKey = `${evaluationId}-${file.originalname}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'conterp-file-uploader',
        Key: awsKey,
        Body: file.buffer,
      }),
    );

    const createdFile = await this.filesRepo.create({
      data: {
        path: `${this.awsBucketPath}${awsKey}`,
        userId,
        evaluationId: evaluation.id,
      },
    });

    console.log('createdFile', createdFile);

    return createdFile;
  }

  async deleteOccurenceActionFile(occurrenceActionId: string) {
    const file = await this.filesRepo.findFirst({
      where: { occurrenceActionId: occurrenceActionId },
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

  async uploadPeriodActionPlanFile(
    file: Express.Multer.File,
    userId: string,
    periodActionPlanId: string,
  ) {
    const periodActionPlan = await this.periodActionPlansRepo.findUnique({
      where: { id: periodActionPlanId },
    });

    if (!periodActionPlan) {
      throw new NotFoundException('Plano de ação não encontrado!');
    }

    const awsKey = `${periodActionPlanId}-${file.originalname}`;

    const fileNameExists = await this.filesRepo.findFirst({
      where: { path: `${this.awsBucketPath}${awsKey}` },
    });

    if (fileNameExists) {
      throw new BadRequestException('Arquivo já existe!');
    }

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'conterp-file-uploader',
        Key: awsKey,
        Body: file.buffer,
      }),
    );

    await this.filesRepo.create({
      data: {
        path: `${this.awsBucketPath}${awsKey}`,
        userId,
        periodActionPlanId: periodActionPlan.id,
      },
    });
  }

  async deletePeriodActionPlanFile(fileId: string) {
    const file = await this.filesRepo.findFirst({
      where: { id: fileId },
    });

    if (!file) {
      throw new NotFoundException('Arquivo não encontrado!');
    }

    const awsKey = file.path.split('/')[3];

    await this.filesRepo.delete({
      where: { id: file.id },
    });

    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: 'conterp-file-uploader',
        Key: awsKey,
      }),
    );
  }

  async deleteFileByPeriodActionPlanId(periodActionPlanId: string) {
    const files = await this.filesRepo.findMany({
      where: { periodActionPlanId: periodActionPlanId },
    });

    if (!files || files.length === 0) {
      return;
    }

    for (const file of files) {
      const awsKey = file.path.split('/')[3];

      await this.filesRepo.delete({
        where: { id: file.id },
      });

      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: 'conterp-file-uploader',
          Key: awsKey,
        }),
      );
    }
  }
}
