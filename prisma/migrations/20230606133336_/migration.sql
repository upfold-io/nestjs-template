/*
  Warnings:

  - You are about to drop the column `cookiesAccepted` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `emailAddress` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `lastLoginAt` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `loginCcount` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `passwordRequested` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `accessToken` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `identityId` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email_address]` on the table `identity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[access_token]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[refresh_token]` on the table `session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email_address` to the `identity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_token` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identity_id` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `identity_emailAddress_key` ON `identity`;

-- DropIndex
DROP INDEX `idx_identity_email-address` ON `identity`;

-- DropIndex
DROP INDEX `idx_session_access-token` ON `session`;

-- DropIndex
DROP INDEX `idx_session_identity-id` ON `session`;

-- DropIndex
DROP INDEX `idx_session_refresh-token` ON `session`;

-- DropIndex
DROP INDEX `session_accessToken_key` ON `session`;

-- DropIndex
DROP INDEX `session_refreshToken_key` ON `session`;

-- AlterTable
ALTER TABLE `identity` DROP COLUMN `cookiesAccepted`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `emailAddress`,
    DROP COLUMN `lastLoginAt`,
    DROP COLUMN `loginCcount`,
    DROP COLUMN `passwordRequested`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `cookies_accepted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_login_at` DATETIME(3) NULL,
    ADD COLUMN `login_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `password_requested` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `accessToken`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `expiresAt`,
    DROP COLUMN `identityId`,
    DROP COLUMN `refreshToken`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `access_token` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `expires_at` DATETIME(3) NOT NULL,
    ADD COLUMN `identity_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `refresh_token` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `identity_email_address_key` ON `identity`(`email_address`);

-- CreateIndex
CREATE INDEX `idx_identity_email-address` ON `identity`(`email_address`);

-- CreateIndex
CREATE UNIQUE INDEX `session_access_token_key` ON `session`(`access_token`);

-- CreateIndex
CREATE UNIQUE INDEX `session_refresh_token_key` ON `session`(`refresh_token`);

-- CreateIndex
CREATE INDEX `idx_session_identity-id` ON `session`(`identity_id`);

-- CreateIndex
CREATE INDEX `idx_session_access-token` ON `session`(`access_token`);

-- CreateIndex
CREATE INDEX `idx_session_refresh-token` ON `session`(`refresh_token`);
