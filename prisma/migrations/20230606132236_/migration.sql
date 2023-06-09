/*
  Warnings:

  - You are about to drop the column `accessToken` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[access_token]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refresh_token]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `access_token` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `idx_session_access-token` ON `session`;

-- DropIndex
DROP INDEX `idx_session_refresh-token` ON `session`;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `accessToken`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `refreshToken`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `access_token` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `refresh_token` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `session_access_token_key` ON `session`(`access_token`);

-- CreateIndex
CREATE UNIQUE INDEX `session_refresh_token_key` ON `session`(`refresh_token`);

-- CreateIndex
CREATE INDEX `idx_session_access-token` ON `session`(`access_token`);

-- CreateIndex
CREATE INDEX `idx_session_refresh-token` ON `session`(`refresh_token`);
