/*
  Warnings:

  - You are about to drop the column `accessToken` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `identityId` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `cookiesAccepted` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `emailAddress` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `lastLoginAt` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `loginCount` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `passwordRequested` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `identity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email_address]` on the table `identity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `access_token` to the `auth_session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expires_at` to the `auth_session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identity_id` to the `auth_session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refresh_token` to the `auth_session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_address` to the `identity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_login_at` to the `identity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `identity` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `idx_auth-session_access-token` ON `auth_session`;

-- DropIndex
DROP INDEX `idx_auth-session_identity-id` ON `auth_session`;

-- DropIndex
DROP INDEX `idx_auth-session_refresh-token` ON `auth_session`;

-- DropIndex
DROP INDEX `identity_emailAddress_key` ON `identity`;

-- DropIndex
DROP INDEX `idx_identity_email-address` ON `identity`;

-- AlterTable
ALTER TABLE `auth_session` DROP COLUMN `accessToken`,
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
    ADD COLUMN `updated_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `identity` DROP COLUMN `cookiesAccepted`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `emailAddress`,
    DROP COLUMN `lastLoginAt`,
    DROP COLUMN `loginCount`,
    DROP COLUMN `passwordRequested`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `cookies_accepted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `email_address` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_login_at` DATETIME(3) NOT NULL,
    ADD COLUMN `login_count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `password_requested` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `idx_auth-session_identity-id` ON `auth_session`(`identity_id`);

-- CreateIndex
CREATE INDEX `idx_auth-session_access-token` ON `auth_session`(`access_token`);

-- CreateIndex
CREATE INDEX `idx_auth-session_refresh-token` ON `auth_session`(`refresh_token`);

-- CreateIndex
CREATE UNIQUE INDEX `identity_email_address_key` ON `identity`(`email_address`);

-- CreateIndex
CREATE INDEX `idx_identity_email-address` ON `identity`(`email_address`);
