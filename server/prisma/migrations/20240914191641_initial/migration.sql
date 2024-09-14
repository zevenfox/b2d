-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `role` ENUM('investor', 'start_up') NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StartUp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `valuation_cap` DOUBLE NOT NULL,
    `funding_goal` DOUBLE NOT NULL,
    `min_investment` DOUBLE NOT NULL,
    `max_investment` DOUBLE NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `opportunity` VARCHAR(191) NOT NULL,
    `opportunity_image` VARCHAR(255) NULL,
    `product` VARCHAR(191) NOT NULL,
    `product_image` VARCHAR(255) NULL,
    `business_model` VARCHAR(191) NOT NULL,
    `business_model_image` VARCHAR(255) NULL,
    `company_name` VARCHAR(255) NOT NULL,
    `company_description` VARCHAR(191) NOT NULL,
    `company_logo` VARCHAR(255) NOT NULL,
    `company_background` VARCHAR(255) NOT NULL,
    `company_business_type` ENUM('lifestyle', 'cosmetics', 'technology', 'architecture', 'arts') NOT NULL,
    `company_email` VARCHAR(255) NOT NULL,
    `company_website` VARCHAR(255) NOT NULL,
    `company_telephone` VARCHAR(50) NOT NULL,
    `company_address` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `StartUp_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InvestmentDeal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `investor_user_id` INTEGER NOT NULL,
    `startup_id` INTEGER NOT NULL,
    `investment_amount` DOUBLE NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `status` ENUM('pending', 'accepted', 'declined') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
