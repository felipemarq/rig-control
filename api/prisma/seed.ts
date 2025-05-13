/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prismaClient = new PrismaClient();

const main = async () => {
  const client = await prismaClient.client.create({
    data: {
      name: 'Cliente Exemplo',
      logoImagePath: 'client-logo.png',
    },
  });
  const contract = await prismaClient.contract.create({
    data: {
      name: 'Contrato Exemplo',
      clientId: client.id,
      logoImagePath: 'contract-logo.png',
    },
  });

  await prismaClient.base.create({
    data: {
      name: 'Base Exemplo',
      state: 'BA',
      contractId: contract.id,
    },
  });

  const rig = await prismaClient.rig.create({
    data: {
      name: 'SPT 101',
      state: 'BA',
      contractId: contract.id,
    },
  });

  const hashedPassword = await hash('adm', 10);

  const user = await prismaClient.user.create({
    data: {
      accessLevel: 'ADM',
      email: 'adm@adm.com',
      name: 'Adm Admin',
      password: hashedPassword,
      contracts: {
        create: {
          contractId: contract.id,
        },
      },
    },
  });

  await prismaClient.userRig.create({
    data: {
      rigId: rig.id,
      userId: user.id,
    },
  });

  await prismaClient.billingConfiguration.create({
    data: {
      rigId: rig.id, // Altere para o ID correto do Rig
      availableHourTax: 100.0,
      startDate: new Date('2000-01-01T00:00:00Z'), // Data de início antiga
      endDate: new Date('2050-01-01T00:00:00Z'), // Data de fim futura
      dtmHourTax: 50.0,
      glossHourTax: 150.0,
      standByHourTax: 200.0,
      commerciallyStoppedTax: 35000.0,
      dtmLt20Tax: 0.0,
      dtmBt20And50Tax: 0.0,
      dtmGt50Tax: 0.0,
      fluidRatioLt20Tax: 0.0,
      fluidRatioBt20And50Tax: 0.0,
      fluidRatioGt50Tax: 0.0,
      equipmentRatioLt20Tax: 0.0,
      equipmentRatioBt20And50Tax: 0.0,
      equipmentRatioGt50Tax: 0.0,
      truckCartRentTax: 0.0,
      extraTrailerTax: 0.0,
      powerSwivelTax: 0.0,
      transportationTax: 0.0,
      truckKmTax: 0.0,
      bobRentTax: 0.0,
      christmasTreeDisassemblyTax: 0.0,
      mixTankMonthRentTax: 0.0,
      mixTankHourRentTax: 0.0,
      generatorFuelTax: 0.0,
      mixTankOperatorTax: 0.0,
      mixTankDtmTax: 0.0,
      mixTankMobilizationTax: 0.0,
      mixTankDemobilizationTax: 0.0,
      suckingTruckTax: 0.0,
      truckTankTax: 0.0,
      munckTax: 0.0,
      createdAt: new Date(),
      createdBy: 'admin',
      updatedBy: 'admin',
      readjustment: 0.0,
      mobilization: 0.0,
      mobilizationOut: 0.0,
      demobilization: 0.0,
    },
  });

  console.log('Seed completed 🚀');
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
