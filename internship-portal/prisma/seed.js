import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existingUser = await prisma.user.findUnique({
    where: { email: "demo@kalvium.com" },
  });

  if (existingUser) {
    console.log("Seed data already exists. Skipping...");
    return;
  }

  await prisma.user.create({
    data: {
      name: "Kalvium Demo User",
      email: "demo@kalvium.com",
    },
  });

  console.log("Seed data inserted successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
