-- CreateTable
CREATE TABLE "ResetPasswordRequest" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hash" STRING NOT NULL,
    "email" STRING NOT NULL,
    "isUsed" BOOL NOT NULL,

    CONSTRAINT "ResetPasswordRequest_pkey" PRIMARY KEY ("id")
);
