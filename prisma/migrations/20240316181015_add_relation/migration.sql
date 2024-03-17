/*
  Warnings:

  - You are about to drop the `_projecttouser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_projecttouser` DROP FOREIGN KEY `_ProjectToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_projecttouser` DROP FOREIGN KEY `_ProjectToUser_B_fkey`;

-- DropTable
DROP TABLE `_projecttouser`;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
