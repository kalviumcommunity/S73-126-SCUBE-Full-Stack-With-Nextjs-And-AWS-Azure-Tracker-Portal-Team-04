import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      name: "Shriraj Jadhav",
      email: "shriraj@example.com",
    },
  });

  // Create a project for that user
  const project = await prisma.project.create({
    data: {
      title: "Internship Portal Backend",
      userId: user.id,
    },
  });

  // Create tasks under the project
  await prisma.task.createMany({
    data: [
      {
        title: "Design database schema",
        status: "COMPLETED",
        projectId: project.id,
      },
      {
        title: "Apply Prisma migrations",
        status: "COMPLETED",
        projectId: project.id,
      },
      {
        title: "Seed initial data",
        status: "PENDING",
        projectId: project.id,
      },
    ],
  });

  console.log("✅ Seed data inserted successfully");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding data:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
