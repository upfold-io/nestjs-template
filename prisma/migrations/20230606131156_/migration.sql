/*
  Warnings:

  - You are about to drop the `auth_sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `auth_sessions`;

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `identityId` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    INDEX `idx_session_identity-id`(`identityId`),
    INDEX `idx_session_access-token`(`accessToken`),
    INDEX `idx_session_refresh-token`(`refreshToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
