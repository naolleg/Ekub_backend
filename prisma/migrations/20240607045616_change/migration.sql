/*
  Warnings:

  - You are about to drop the column `depositId` on the `Lots` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Lots` DROP FOREIGN KEY `Lots_depositId_fkey`;

-- AlterTable
ALTER TABLE `Lots` DROP COLUMN `depositId`;
