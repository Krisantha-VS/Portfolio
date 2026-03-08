<?php
declare(strict_types=1);

function json_ok(mixed $data = null, int $status = 200): never {
    http_response_code($status);
    echo json_encode(['success' => true, 'data' => $data]);
    exit;
}

function json_err(string $message, string $code, int $status = 400): never {
    http_response_code($status);
    echo json_encode(['success' => false, 'error' => $message, 'code' => $code]);
    exit;
}
