/*
  Warnings:

  - You are about to drop the column `image_url` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `housenumber` on the `address` table. All the data in the column will be lost.
  - Added the required column `gender` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `image_url`;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NOT NULL;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `housenumber`;
