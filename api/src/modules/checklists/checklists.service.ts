import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { ChecklistRepository } from 'src/shared/database/repositories/checklist.repositories';
import { ChecklistItemRepository } from 'src/shared/database/repositories/checklistItem.repositories';
import { WellsRepository } from 'src/shared/database/repositories/well.repositories';
import { FilesRepository } from 'src/shared/database/repositories/files.repositories';
import { EvaluationRepository } from 'src/shared/database/repositories/evaluation.repositories';
import { FileService } from 'src/modules/file/file.service';
import { Prisma } from '@prisma/client';

type ChecklistWithFiles = Prisma.ChecklistGetPayload<{
  include: { files: true };
}>;

@Injectable()
export class ChecklistsService {
  constructor(
    private readonly checklistsRepo: ChecklistRepository,
    private readonly checklistItemsRepo: ChecklistItemRepository,
    private readonly wellsRepo: WellsRepository,
    private readonly filesRepo: FilesRepository,
    private readonly evaluationsRepo: EvaluationRepository,
    private readonly filesService: FileService,
  ) {}

  async create(createChecklistDto: CreateChecklistDto, userId: string) {
    const { date, evaluations, goal, supervisor, team, title, well, rigId } =
      createChecklistDto;

    let wellFound = null;

    wellFound = await this.wellsRepo.findUnique({
      where: { name: well },
    });

    if (!wellFound) {
      wellFound = await this.wellsRepo.create({
        data: {
          name: well,
        },
      });
    }

    // Buscar todos os itens do checklist de uma vez
    const checklistItems = await this.checklistItemsRepo.findMany({
      where: {
        id: { in: evaluations.map((e) => e.checklistItemId) }, // Busca apenas os necessários
      },
    });

    // Criar um mapa para lookup rápido (id -> weight)
    const checklistItemMap = new Map(
      checklistItems.map((item) => [item.id, item.weight]),
    );

    // Processar avaliações sem acessar o banco repetidamente
    const mappedEvaluations = evaluations.map((evaluation) => {
      const weight = checklistItemMap.get(evaluation.checklistItemId);

      if (weight === undefined) {
        throw new NotFoundException(`Checklist item não encontrado!`);
      }

      const { fileId, ...evaluationWithoutFile } = evaluation;

      return {
        ...evaluationWithoutFile,
        score: evaluationWithoutFile.rating * weight,
      };
    });

    const totalWeight = checklistItems.reduce(
      (sum, item) => sum + item.weight,
      0,
    );
    const totalPoints = mappedEvaluations.reduce(
      (sum, ev) => sum + ev.score,
      0,
    );

    const checklist = await this.checklistsRepo.create({
      data: {
        date,
        supervisor,
        team,
        title,
        wellId: wellFound.id,
        rigId,
        userId,
        totalPoints,
        totalWeight,
        goal,
        score: (totalPoints / totalWeight) * 100,
        evaluations: { createMany: { data: mappedEvaluations } },
      },
    });

    // 2️⃣ Buscar as avaliações criadas, agora com os IDs
    const createdEvaluations = await this.evaluationsRepo.findMany({
      where: { checklistId: checklist.id },
      select: { id: true, checklistItemId: true }, // Só pega os campos necessários
    });

    // 3️⃣ Criar um mapa para associar `checklistItemId` ao `evaluationId`
    const evaluationMap = new Map(
      createdEvaluations.map((ev) => [ev.checklistItemId, ev.id]),
    );

    // 4️⃣ Associar os arquivos às avaliações corretas
    await Promise.all(
      evaluations.map(async (evaluation) => {
        if (evaluation.fileId) {
          const evaluationId = evaluationMap.get(evaluation.checklistItemId);

          if (!evaluationId) {
            throw new Error(
              `Erro ao encontrar avaliação para ${evaluation.checklistItemId}`,
            );
          }

          await this.filesRepo.update({
            where: { id: evaluation.fileId },
            data: { evaluationId, checklistId: checklist.id },
          });
        }
      }),
    );

    return checklist;
  }

  async findAll() {
    return await this.checklistsRepo.findMany({
      include: {
        rig: true,
        well: true,
        user: { select: { id: true, name: true, email: true } },
        files: true,
        evaluations: {
          include: {
            checklistItem: true,
            files: true,
          },
          orderBy: {
            checklistItem: {
              number: 'asc',
            },
          },
        },
      },
    });
  }

  async findOne(checklistId: string) {
    return await this.checklistsRepo.findUnique({
      where: { id: checklistId },
      include: { evaluations: true },
    });
  }

  async remove(checklistId: string) {
    //@ts-ignore
    const checklist: ChecklistWithFiles = await this.checklistsRepo.findUnique({
      where: { id: checklistId },
      include: { files: true },
    });

    if (!checklist) {
      throw new NotFoundException('Checklist não encontrado!');
    }

    for (const files of checklist.files) {
      await this.filesService.deleteFile(files.id);
    }

    await this.checklistsRepo.delete({ where: { id: checklistId } });
  }

  async update(
    checklistId: string,
    updateChecklistDto: UpdateChecklistDto,
    userId: string,
  ) {
    const { date, evaluations, goal, supervisor, team, title, well, rigId } =
      updateChecklistDto;

    let wellFound = null;

    wellFound = await this.wellsRepo.findUnique({
      where: { name: well },
    });

    if (!wellFound) {
      wellFound = await this.wellsRepo.create({
        data: {
          name: well,
        },
      });
    }

    // Buscar todos os itens do checklist de uma vez
    const checklistItems = await this.checklistItemsRepo.findMany({
      where: {
        id: { in: evaluations.map((e) => e.checklistItemId) }, // Busca apenas os necessários
      },
    });

    // Criar um mapa para lookup rápido (id -> weight)
    const checklistItemMap = new Map(
      checklistItems.map((item) => [item.id, item.weight]),
    );

    // Processar avaliações sem acessar o banco repetidamente
    const mappedEvaluations = evaluations.map((evaluation) => {
      const weight = checklistItemMap.get(evaluation.checklistItemId);

      if (weight === undefined) {
        throw new NotFoundException(`Checklist item não encontrado!`);
      }

      const { fileId, ...evaluationWithoutFile } = evaluation;

      return {
        ...evaluationWithoutFile,
        score: evaluationWithoutFile.rating * weight,
      };
    });

    const totalWeight = checklistItems.reduce(
      (sum, item) => sum + item.weight,
      0,
    );
    const totalPoints = mappedEvaluations.reduce(
      (sum, ev) => sum + ev.score,
      0,
    );
    const checklist = await this.checklistsRepo.update({
      where: { id: checklistId },
      data: {
        date,
        supervisor,
        team,
        title,
        wellId: wellFound.id,
        rigId,
        userId,
        totalPoints,
        totalWeight,
        goal,
        score: (totalPoints / totalWeight) * 100,
        // evaluations: { createMany: { data: mappedEvaluations } },
      },
    });

    console.log('mappedEvaluations', mappedEvaluations);

    for (const evaluation of mappedEvaluations) {
      await this.evaluationsRepo.update({
        where: { id: evaluation.id },
        data: {
          rating: evaluation.rating,
          comment: evaluation.comment,
          score: evaluation.score,
        },
      });
    }
    return checklist;
  }

  //Criar o service de update que vai recalcular todo o checklist já existente, porém quando chegar
  //nas avaliações verificar se já existe algum arvquivo vinculado ao mesmo, se existe um arquivo vinculado e o
  //usuario enviou um novo arquivo, deletar o arquivo antigo e fazer o upload do novo,
  //se nao nao existir nenhum arquivo vinculado, fazer o upload do novo arquivo

  //criar um endpoint separado para lidar o a deleção de arquivos existeses e o usuario somente quis deleta-lo (se tiver um arquivo mas o usuario nao enviou deletar o arquivo)
}
