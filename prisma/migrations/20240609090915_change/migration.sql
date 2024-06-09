/*
  Warnings:

  - Added the required column `commission` to the `Deposits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lotId` to the `Deposits` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Deposits` ADD COLUMN `commission` DECIMAL(65, 30) NOT NULL,
    ADD COLUMN `lotId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Deposits` ADD CONSTRAINT `Deposits_lotId_fkey` FOREIGN KEY (`lotId`) REFERENCES `Lots`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
