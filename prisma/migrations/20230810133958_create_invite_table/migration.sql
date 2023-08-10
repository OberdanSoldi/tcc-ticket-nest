-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED');

-- CreateTable
CREATE TABLE "Invite" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "hash" STRING NOT NULL,
    "email" STRING NOT NULL,
    "status" "InviteStatus" NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invite_pkey" PRIMARY KEY ("id")
);
