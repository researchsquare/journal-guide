-- Show existing databases
SHOW DATABASES;

-- Create journal-guide database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `journal-guide` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Show databases again to confirm creation
SHOW DATABASES;

-- Use the database
USE `journal-guide`;

-- Show that we're now using the correct database
SELECT DATABASE() as current_database;

-- Try to create user (might fail if user exists or insufficient privileges)
-- We'll handle user creation separately if needed
SET @user_exists = (SELECT COUNT(*) FROM mysql.user WHERE user = 'journaluser');
SELECT @user_exists as user_exists_check;

-- Add your initial table structure here
-- Example tables:
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Show created tables
SHOW TABLES;

-- Output success message
SELECT 'Database journal-guide initialized successfully!' as status;