-- ═══════════════════════════════════════
-- Intelart — Database Schema
-- MySQL / MariaDB
-- ═══════════════════════════════════════

CREATE DATABASE IF NOT EXISTS intelart_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE intelart_db;

-- ─── Contacts (formulaire contact.php) ───
CREATE TABLE IF NOT EXISTS contacts (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
    email       VARCHAR(254) NOT NULL,
    company     VARCHAR(150) DEFAULT NULL,
    need        VARCHAR(200) DEFAULT NULL,
    message     TEXT DEFAULT NULL,
    ip_address  VARCHAR(45) DEFAULT NULL,
    lang        VARCHAR(5) DEFAULT 'fr',
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_read     TINYINT(1) NOT NULL DEFAULT 0,
    INDEX idx_email (email),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Demandes Sur Mesure (formulaire offre-surmesure.php) ───
CREATE TABLE IF NOT EXISTS demandes_surmesure (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(254) NOT NULL,
    company     VARCHAR(150) NOT NULL,
    sector      VARCHAR(200) DEFAULT NULL,
    description TEXT NOT NULL,
    budget      VARCHAR(200) DEFAULT NULL,
    delay       VARCHAR(100) DEFAULT NULL,
    ai_option   VARCHAR(200) DEFAULT NULL,
    ip_address  VARCHAR(45) DEFAULT NULL,
    lang        VARCHAR(5) DEFAULT 'fr',
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_read     TINYINT(1) NOT NULL DEFAULT 0,
    INDEX idx_email (email),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Chatbot Henry — conversation logs ───
CREATE TABLE IF NOT EXISTS chatbot_logs (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    session_id  VARCHAR(128) NOT NULL,
    role        ENUM('user', 'bot') NOT NULL,
    message     TEXT NOT NULL,
    ip_address  VARCHAR(45) DEFAULT NULL,
    created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_session (session_id),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
