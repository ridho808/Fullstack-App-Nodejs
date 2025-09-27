-- DropForeignKey
ALTER TABLE `RefreshToken` DROP FOREIGN KEY `RefreshToken_userId_fkey`;

-- DropIndex
DROP INDEX `RefreshToken_token_key` ON `RefreshToken`;

-- DropIndex
DROP INDEX `RefreshToken_userId_token_idx` ON `RefreshToken`;

-- AlterTable
ALTER TABLE `RefreshToken` MODIFY `token` TEXT NOT NULL;

-- CreateIndex
CREATE INDEX `RefreshToken_userId_idx` ON `RefreshToken`(`userId`);

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
