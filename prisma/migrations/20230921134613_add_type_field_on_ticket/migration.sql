-- CreateEnum
CREATE TYPE "ProblemType" AS ENUM ('HARDWARE', 'SOFTWARE', 'NETWORK', 'OTHER');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "problemType" "ProblemType" NOT NULL DEFAULT 'OTHER';
