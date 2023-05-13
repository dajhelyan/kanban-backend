-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ADMIN', 'PROJECT_OWNER', 'USER');

-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
