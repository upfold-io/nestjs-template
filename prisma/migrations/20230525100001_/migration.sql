/*
  Warnings:

  - You are about to drop the column `access_token` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `identity_id` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `refresh_token` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `cookies_accepted` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `email_address` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `last_login_at` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `login_count` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `password_requested` on the `identity` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `identity` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailAddress]` on the table `identity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessToken` to the `auth_session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `auth_session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identityId` to the `auth_session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `auth_session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailAddress` to the `identity` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `idx_auth-session_access-token` ON `auth_session`;

-- DropIndex
DROP INDEX `idx_auth-session_identity-id` ON `auth_session`;

-- DropIndex
DROP INDEX `idx_auth-session_refresh-token` ON `auth_session`;

-- DropIndex
DROP INDEX `identity_email_address_key` ON `identity`;

-- DropIndex
DROP INDEX `idx_identity_email-address` ON `identity`;

-- AlterTable
ALTER TABLE `auth_session` DROP COLUMN `access_token`,
    DROP COLUMN `created_at`,
    DROP COLUMN `expires_at`,
    DROP COLUMN `identity_id`,
    DROP COLUMN `refresh_token`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `accessToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `expiresAt` DATETIME(3) NOT NULL,
    ADD COLUMN `identityId` VARCHAR(191) NOT NULL,
    ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `identity` DROP COLUMN `cookies_accepted`,
    DROP COLUMN `created_at`,
    DROP COLUMN `email_address`,
    DROP COLUMN `last_login_at`,
    DROP COLUMN `login_count`,
    DROP COLUMN `password_requested`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `cookiesAccepted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `emailAddress` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastLoginAt` DATETIME(3) NULL,
    ADD COLUMN `loginCcount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `passwordRequested` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `subscriber` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `firstName` VARCHAR(255) NOT NULL,
    `lastName` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    UNIQUE INDEX `subscriber_email_key`(`email`),
    INDEX `idx_subscriber_email`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `idx_auth-session_identity-id` ON `auth_session`(`identityId`);

-- CreateIndex
CREATE INDEX `idx_auth-session_access-token` ON `auth_session`(`accessToken`);

-- CreateIndex
CREATE INDEX `idx_auth-session_refresh-token` ON `auth_session`(`refreshToken`);

-- CreateIndex
CREATE UNIQUE INDEX `identity_emailAddress_key` ON `identity`(`emailAddress`);

-- CreateIndex
CREATE INDEX `idx_identity_email-address` ON `identity`(`emailAddress`);
