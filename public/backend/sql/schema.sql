-- Portfolio Backend Schema
-- Run once on your MySQL database

CREATE TABLE IF NOT EXISTS contact_messages (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100)  NOT NULL,
  email       VARCHAR(150)  NOT NULL,
  subject     VARCHAR(200)  NOT NULL,
  message     TEXT          NOT NULL,
  ip_address  VARCHAR(45)   DEFAULT NULL,
  user_agent  VARCHAR(300)  DEFAULT NULL,
  is_read     TINYINT(1)    NOT NULL DEFAULT 0,
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email      (email),
  INDEX idx_created_at (created_at),
  INDEX idx_is_read    (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS rate_limits (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ip_address  VARCHAR(45)  NOT NULL,
  action      VARCHAR(50)  NOT NULL,
  hit_count   INT UNSIGNED NOT NULL DEFAULT 1,
  window_start DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_ip_action (ip_address, action)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── TaskFlow ──────────────────────────────────────────────────────────────────
-- If tables already exist without due_date column, run:
-- ALTER TABLE tm_tasks ADD COLUMN due_date DATE DEFAULT NULL;
-- ALTER TABLE tm_boards ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

CREATE TABLE IF NOT EXISTS tm_boards (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id     VARCHAR(36)  NOT NULL,
  name        VARCHAR(100) NOT NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_tm_boards_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tm_tasks (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  board_id    INT UNSIGNED NOT NULL,
  user_id     VARCHAR(36)  NOT NULL,
  title       VARCHAR(200) NOT NULL,
  description TEXT         DEFAULT NULL,
  status      ENUM('todo','in_progress','done') NOT NULL DEFAULT 'todo',
  priority    ENUM('low','medium','high')        NOT NULL DEFAULT 'medium',
  due_date    DATE         DEFAULT NULL,
  position    INT          NOT NULL DEFAULT 0,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_tm_tasks_board FOREIGN KEY (board_id) REFERENCES tm_boards (id) ON DELETE CASCADE,
  INDEX idx_tm_tasks_board_id (board_id),
  INDEX idx_tm_tasks_user_id  (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
