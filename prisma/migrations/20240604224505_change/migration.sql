/*
  Warnings:

  - You are about to drop the column `werede` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `totalCommition` on the `category` table. All the data in the column will be lost.
  - Added the required column `wereda` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCommission` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` DROP COLUMN `werede`,
    ADD COLUMN `wereda` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `category` DROP COLUMN `totalCommition`,
    ADD COLUMN `totalCommission` DECIMAL(65, 30) NOT NULL;
