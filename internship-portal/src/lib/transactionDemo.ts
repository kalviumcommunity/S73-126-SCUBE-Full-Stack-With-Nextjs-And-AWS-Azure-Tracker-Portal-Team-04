import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name: "Transaction User",
          email: "transaction@example.com"
        }
      });

      await tx.order.create({
        data: {
          userId: user.id,
          total: 500,
          status: "PAID"
        }
      });
    });

    console.log("Transaction successful");
  } catch (error) {
    console.error("Transaction failed. Rolled back.", error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
