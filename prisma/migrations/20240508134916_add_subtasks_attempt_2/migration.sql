-- DropForeignKey
ALTER TABLE `subtask` DROP FOREIGN KEY `Subtask_taskId_fkey`;

-- AlterTable
ALTER TABLE `task` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `Subtask` ADD CONSTRAINT `Subtask_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
