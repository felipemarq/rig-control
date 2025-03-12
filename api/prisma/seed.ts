/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";


const prismaClient = new PrismaClient();

const main = async () => {
    const client = await prismaClient.client.create({
        data: {
          name: "Cliente Exemplo",
          logoImagePath: "client-logo.png",
        },
      });
      const contract = await prismaClient.contract.create({
        data: {
          name: "Contrato Exemplo",
          clientId: client.id,
          logoImagePath: "contract-logo.png",
        },
      });

      const rig = await prismaClient.rig.create({
        data: {
            name: "SPT 101",
            state: "BA",
            contractId: contract.id
        }
      })

      const hashedPassword = await hash("adm", 10);

      const user = await prismaClient.user.create({
        data: {
            accessLevel: "ADM",
            email: "adm@adm",
            name: "Adm Admin",
            password: hashedPassword
        }
      })

      await prismaClient.userRig.create({
        data: {
            rigId:rig.id,
            userId:user.id
        }
      })


      console.log("Seed completed 🚀");
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });