-- Blazor Demo — Notes table
CREATE TABLE IF NOT EXISTS notes (
    id         INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id    VARCHAR(64)  NOT NULL,
    title      VARCHAR(255) NOT NULL,
    body       TEXT         NOT NULL DEFAULT '',
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_notes_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
