import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { ChecklistRepository } from 'src/shared/database/repositories/checklist.repositories';
import { ChecklistItemRepository } from 'src/shared/database/repositories/checklistItem.repositories';

@Injectable()
export class ChecklistsService {
  constructor(
    private readonly checklistsRepo: ChecklistRepository,
    private readonly checklistItemsRepo: ChecklistItemRepository,
  ) {}

  async create(createChecklistDto: CreateChecklistDto, userId: string) {
    const { date, evaluations, goal, supervisor, team, title, wellId, rigId } =
      createChecklistDto;

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

      return {
        ...evaluation,
        score: evaluation.rating * weight,
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

    await this.checklistsRepo.create({
      data: {
        date,
        supervisor,
        team,
        title,
        wellId,
        rigId,
        userId,
        totalPoints,
        totalWeight,
        goal,
        score: (totalPoints / totalWeight) * 100,
        evaluations: { createMany: { data: mappedEvaluations } },
      },
    });
  }

  async findAll() {
    return await this.checklistsRepo.findMany({
      include: { evaluations: true },
    });
  }

  async findOne(checklistId: string) {
    return await this.checklistsRepo.findUnique({
      where: { id: checklistId },
      include: { evaluations: true },
    });
  }

  async remove(checklistId: string) {
    await this.checklistsRepo.delete({ where: { id: checklistId } });
  }
}
