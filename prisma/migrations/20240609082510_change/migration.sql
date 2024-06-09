-- DropIndex
DROP INDEX `Profile_userId_key` ON `Profile`;

-- AlterTable
ALTER TABLE `Lots` MODIFY `isCompleted` BOOLEAN NOT NULL DEFAULT false;
