import { Injectable } from '@nestjs/common';

import { BillingRepository } from 'src/shared/database/repositories/billing.repositories';

@Injectable()
export class BillingsService {
  constructor(private readonly billingRepo: BillingRepository) {}

  async findByRigId({
    rigId,
    startDate,
    endDate,
  }: {
    rigId: string;
    startDate: string;
    endDate: string;
  }) {
    return await this.billingRepo.findByRigId({
      rigId,
      startDate,
      endDate,
    });
  }

  async findAll({
    startDate,
    endDate,
  }: {
    startDate: string;
    endDate: string;
  }) {
    const billings = await this.billingRepo.findAll({ startDate, endDate });

    return billings;
  }

  /*  async findMany() {
    const response = await this.billingRepo.findMany({});

    let total = 0;
    let glossTotal = 0;

    for (const biling of response) {
      const subtracted = biling.total - biling.glossHourAmount;

      await this.billingRepo.update({
        where: { id: biling.id },
        data: { total: subtracted },
      });
    }


    return response;
  } */
}
