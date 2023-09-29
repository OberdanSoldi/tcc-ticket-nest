/*
  Warnings:

  - The values [ASSIGNED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'IN_PROGRESS';
ALTER TYPE "Status"DROP VALUE 'ASSIGNED';
