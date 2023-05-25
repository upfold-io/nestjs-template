-- CreateTable
CREATE TABLE `identity` (
    `id` VARCHAR(191) NOT NULL,
    `emailAddress` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `enabled` BOOLEAN NOT NULL DEFAULT false,
    `cookiesAccepted` BOOLEAN NOT NULL DEFAULT false,
    `salt` VARCHAR(191) NOT NULL,
    `loginCount` INTEGER NOT NULL DEFAULT 0,
    `lastLoginAt` DATETIME(3) NOT NULL,
    `passwordRequested` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `identity_emailAddress_key`(`emailAddress`),
    INDEX `idx_identity_email-address`(`emailAddress`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuthSession` (
    `id` VARCHAR(191) NOT NULL,
    `identity_id` VARCHAR(191) NOT NULL,
    `access_toekn` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    INDEX `idx_auth-session_identity-id`(`identity_id`),
    INDEX `idx_auth-session_access-token`(`access_toekn`),
    INDEX `idx_auth-session_refresh-token`(`refresh_token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
