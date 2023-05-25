/*
  Warnings:

  - You are about to drop the column `created_at` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `identity_id` on the `auth_session` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `auth_session` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `auth_session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identityId` to the `auth_session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `idx_auth-session_identity-id` ON `auth_session`;

-- AlterTable
ALTER TABLE `auth_session` DROP COLUMN `created_at`,
    DROP COLUMN `expires_at`,
    DROP COLUMN `identity_id`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `expiresAt` DATETIME(3) NOT NULL,
    ADD COLUMN `identityId` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `idx_auth-session_identity-id` ON `auth_session`(`identityId`);
