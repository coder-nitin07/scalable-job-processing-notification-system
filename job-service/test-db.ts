// JS file in ESM mode
import { PrismaClient } from "./src/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  try {
    const jobs = await prisma.job.findMany();
    console.log("Jobs in DB:", jobs);

    const newJob = await prisma.job.create({
      data: {
        type: "test-job",
        payload: { test: true },
        userId: "00000000-0000-0000-0000-000000000000",
      },
    });
    console.log("Created Job:", newJob);
  } catch (err) {
    console.error("DB connection/test failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

main();