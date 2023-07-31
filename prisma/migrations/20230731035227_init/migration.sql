-- CreateTable
CREATE TABLE "Hello" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "message" STRING(100) NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hello_pkey" PRIMARY KEY ("id")
);
