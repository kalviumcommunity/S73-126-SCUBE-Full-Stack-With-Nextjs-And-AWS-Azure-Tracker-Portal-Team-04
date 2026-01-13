import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@test.com",
      role: "ADMIN",
    },
  });

  const project = await prisma.project.create({
    data: { title: "Internship Tracker" },
  });

  await prisma.task.create({
    data: {
      title: "Setup Database",
      status: "OPEN",
      projectId: project.id,
      assigneeId: user.id,
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
