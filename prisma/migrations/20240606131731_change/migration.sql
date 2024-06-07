/*
  Warnings:

  - You are about to drop the column `lotId` on the `Deposits` table. All the data in the column will be lost.
  - Added the required column `depositId` to the `Lots` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Deposits` DROP FOREIGN KEY `Deposits_lotId_fkey`;

-- AlterTable
ALTER TABLE `Deposits` DROP COLUMN `lotId`;

-- AlterTable
ALTER TABLE `Lots` ADD COLUMN `depositId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Lots` ADD CONSTRAINT `Lots_depositId_fkey` FOREIGN KEY (`depositId`) REFERENCES `Deposits`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
