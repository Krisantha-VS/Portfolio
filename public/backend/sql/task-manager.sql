-- TaskFlow Schema
-- Run after schema.sql

CREATE TABLE IF NOT EXISTS tm_boards (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id     VARCHAR(100) NOT NULL,
  name        VARCHAR(100) NOT NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tm_tasks (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  board_id    INT UNSIGNED NOT NULL,
  user_id     VARCHAR(100) NOT NULL,
  title       VARCHAR(200) NOT NULL,
  description TEXT,
  status      ENUM('todo','in_progress','done') NOT NULL DEFAULT 'todo',
  priority    ENUM('low','medium','high')        NOT NULL DEFAULT 'medium',
  position    INT UNSIGNED NOT NULL DEFAULT 0,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (board_id) REFERENCES tm_boards(id) ON DELETE CASCADE,
  INDEX idx_board_status (board_id, status),
  INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
