const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Idempotency check
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
      projects: {
        create: {
          title: "Database Migrations & Seeding",
          tasks: {
            create: [
              { title: "Create Prisma migration" },
              { title: "Add seed script" },
              { title: "Verify data in Prisma Studio" },
            ],
          },
        },
      },
    },
  });

  console.log("Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
