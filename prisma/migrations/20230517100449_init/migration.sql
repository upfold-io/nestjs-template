/*
  Warnings:

  - You are about to drop the column `access_toekn` on the `AuthSession` table. All the data in the column will be lost.
  - Added the required column `access_token` to the `AuthSession` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `idx_auth-session_access-token` ON `AuthSession`;

-- AlterTable
ALTER TABLE `AuthSession` DROP COLUMN `access_toekn`,
    ADD COLUMN `access_token` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `idx_auth-session_access-token` ON `AuthSession`(`access_token`);
