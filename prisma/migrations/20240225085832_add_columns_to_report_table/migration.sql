/*
  Warnings:

  - Added the required column `breadcrumb` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stack` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `report` ADD COLUMN `breadcrumb` VARCHAR(191) NOT NULL,
    ADD COLUMN `level` VARCHAR(191) NOT NULL,
    ADD COLUMN `stack` JSON NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    ADD COLUMN `url` VARCHAR(191) NOT NULL;
