/*
  Warnings:

  - You are about to drop the column `access_token` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accessToken]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refreshToken]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessToken` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `idx_session_access-token` ON `session`;

-- DropIndex
DROP INDEX `idx_session_refresh-token` ON `session`;

-- DropIndex
DROP INDEX `session_access_token_key` ON `session`;

-- DropIndex
DROP INDEX `session_refresh_token_key` ON `session`;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `access_token`,
    DROP COLUMN `created_at`,
    DROP COLUMN `refresh_token`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `accessToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `session_accessToken_key` ON `session`(`accessToken`);

-- CreateIndex
CREATE UNIQUE INDEX `session_refreshToken_key` ON `session`(`refreshToken`);

-- CreateIndex
CREATE INDEX `idx_session_access-token` ON `session`(`accessToken`);

-- CreateIndex
CREATE INDEX `idx_session_refresh-token` ON `session`(`refreshToken`);
