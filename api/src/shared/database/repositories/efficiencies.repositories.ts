import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class EfficienciesRepository {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly prisma: PrismaClient,
  ) {}

  async create(createDto: Prisma.EfficiencyCreateArgs) {
    return await this.prismaService.efficiency.create(createDto);
  }

  async findMany(findAllDto: Prisma.EfficiencyFindManyArgs) {
    return await this.prismaService.efficiency.findMany(findAllDto);
  }

  async findUnique(findUniqueDto: Prisma.EfficiencyFindUniqueArgs) {
    return await this.prismaService.efficiency.findUnique(findUniqueDto);
  }

  async findFirst(findFirstDto: Prisma.EfficiencyFindFirstArgs) {
    return await this.prismaService.efficiency.findFirst(findFirstDto);
  }

  async delete(deleteDto: Prisma.EfficiencyDeleteArgs) {
    return await this.prismaService.efficiency.delete(deleteDto);
  }

  async groupBy(groupByDto: Prisma.EfficiencyGroupByArgs): Promise<
    {
      _avg: {
        availableHours: number;
        standByHours: number;
        billedScheduledStopHours: number;
      };
      _sum: {
        availableHours: number;
        standByHours: number;
        billedScheduledStopHours: number;
      };
      rigId: string;
      _count: number;
    }[]
  > {
    //@ts-ignore
    return await this.prismaService.efficiency.groupBy(groupByDto);
  }

  async count(countDto: Prisma.EfficiencyCountArgs) {
    return await this.prismaService.efficiency.count(countDto);
  }

  async getAverage(rigId: string, year: number) {
    /*    // Buscar os dados diários
    const dailyTotals = await this.prisma.$queryRaw`
   SELECT
     DATE(date) AS day,
     SUM(available_hours + COALESCE(standby_hours, 0) + COALESCE(billed_scheduled_stop_hours, 0)) AS daily_total
   FROM efficiencies
   WHERE rig_id = ${rigId}::UUID
     AND EXTRACT(YEAR FROM date) = ${year}
   GROUP BY DATE(date)
   ORDER BY DATE(date);
 `;

    // Objeto para armazenar as somas e contagens por mês
    const monthlyData: Record<string, { total: number; count: number }> = {};

    // Processar cada dia
    //@ts-ignore
    dailyTotals.forEach(
      ({ day, daily_total }: { day: Date; daily_total: number }) => {
        const month = day.toISOString().slice(0, 7); // Formato YYYY-MM

        if (!monthlyData[month]) {
          monthlyData[month] = { total: 0, count: 0 };
        }

        monthlyData[month].total += daily_total;
        monthlyData[month].count += 1;
      },
    );

    // Calcular médias mensais
    const monthlyAverages = Object.entries(monthlyData).map(
      ([month, { total, count }]) => ({
        month,
        avg: total / count,
      }),
    ); */

    return await this.prisma.$queryRaw`
    SELECT
      TO_CHAR(date, 'YYYY-MM') AS month,
      SUM(available_hours + COALESCE(standby_hours, 0) + COALESCE(billed_scheduled_stop_hours, 0)) / COUNT(DISTINCT date) AS avg
    FROM efficiencies
    WHERE rig_id = ${rigId}::UUID
      AND EXTRACT(YEAR FROM date) = ${year}
    GROUP BY month
    ORDER BY month;
  `;
  }

  async getWellsCountByRig(rigId: string, year: number) {
    const results: any = await this.prisma.$queryRaw`
    SELECT
      r.name as rig_name,
      EXTRACT(YEAR FROM e."date") as year,
      EXTRACT(MONTH FROM e."date") as month,
      COUNT(DISTINCT e."well") as well_count
    FROM
      "efficiencies" e
    JOIN
      "rigs" r ON r.id = e."rig_id"
    WHERE
      e."well" IS NOT NULL
      AND EXTRACT(YEAR FROM date) = ${year}
      AND r.id = ${rigId}::UUID
    GROUP BY
      r.name, year, month
    ORDER BY
      year ASC, month ASC, r.name ASC;
  `;

    const formattedResults = results.map((result) => ({
      ...result,
      well_count: result.well_count.toString(), // Converte BigInt para string
    }));

    return formattedResults;
  }

  async update(updateDto: Prisma.EfficiencyUpdateArgs) {
    return await this.prismaService.efficiency.update(updateDto);
  }
}
