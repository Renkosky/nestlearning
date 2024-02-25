/*
  Warnings:

  - You are about to drop the column `resloved` on the `report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `report` DROP COLUMN `resloved`,
    ADD COLUMN `resolved` BOOLEAN NOT NULL DEFAULT false;
