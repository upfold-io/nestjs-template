/*
  Warnings:

  - You are about to drop the `AuthSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `AuthSession`;

-- CreateTable
CREATE TABLE `auth_session` (
    `id` VARCHAR(191) NOT NULL,
    `identity_id` VARCHAR(191) NOT NULL,
    `access_token` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `idx_auth-session_identity-id`(`identity_id`),
    INDEX `idx_auth-session_access-token`(`access_token`),
    INDEX `idx_auth-session_refresh-token`(`refresh_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
