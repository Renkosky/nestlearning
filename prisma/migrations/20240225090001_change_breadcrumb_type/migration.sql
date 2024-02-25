/*
  Warnings:

  - You are about to alter the column `breadcrumb` on the `report` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `report` MODIFY `breadcrumb` JSON NOT NULL;
