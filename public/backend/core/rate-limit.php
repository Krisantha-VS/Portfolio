<?php
declare(strict_types=1);

require_once __DIR__ . '/db.php';
require_once __DIR__ . '/response.php';

// Allow $max hits per $window_seconds per IP per action
function check_rate_limit(string $action, int $max = 5, int $window_seconds = 3600): void {
    $ip  = get_client_ip();
    $db  = DB::get();
    $now = date('Y-m-d H:i:s');

    // Clean expired windows
    $db->prepare("
        DELETE FROM rate_limits
        WHERE action = ? AND TIMESTAMPDIFF(SECOND, window_start, NOW()) > ?
    ")->execute([$action, $window_seconds]);

    // Upsert
    $stmt = $db->prepare("
        INSERT INTO rate_limits (ip_address, action, hit_count, window_start)
        VALUES (?, ?, 1, ?)
        ON DUPLICATE KEY UPDATE
            hit_count    = hit_count + 1,
            window_start = IF(TIMESTAMPDIFF(SECOND, window_start, NOW()) > ?, ?, window_start)
    ");
    $stmt->execute([$ip, $action, $now, $window_seconds, $now]);

    // Check count
    $row = $db->prepare("
        SELECT hit_count FROM rate_limits WHERE ip_address = ? AND action = ?
    ");
    $row->execute([$ip, $action]);
    $count = (int) ($row->fetchColumn() ?: 0);

    if ($count > $max) {
        header('Retry-After: ' . $window_seconds);
        json_err('Too many requests. Please try again later.', 'RATE_LIMITED', 429);
    }
}

function get_client_ip(): string {
    foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $key) {
        if (!empty($_SERVER[$key])) {
            return trim(explode(',', $_SERVER[$key])[0]);
        }
    }
    return 'unknown';
}
