/*
  Warnings:

  - Changed the type of `user_type` on the `Requests` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Requests" DROP COLUMN "user_type",
ADD COLUMN     "user_type" TEXT NOT NULL;
