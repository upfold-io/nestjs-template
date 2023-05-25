/*
  Warnings:

  - You are about to drop the column `access_token` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `auth_session` table. All the data in the column will be lost.
  - Added the required column `accessToken` to the `auth_session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `auth_session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `idx_auth-session_access-token` ON `auth_session`;

-- DropIndex
DROP INDEX `idx_auth-session_refresh-token` ON `auth_session`;

-- AlterTable
ALTER TABLE `auth_session` DROP COLUMN `access_token`,
    DROP COLUMN `refresh_token`,
    ADD COLUMN `accessToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `idx_auth-session_access-token` ON `auth_session`(`accessToken`);

-- CreateIndex
CREATE INDEX `idx_auth-session_refresh-token` ON `auth_session`(`refreshToken`);
