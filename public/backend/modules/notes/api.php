<?php
declare(strict_types=1);

header('Content-Type: application/json');

require_once __DIR__ . '/../../core/cors.php';
require_once __DIR__ . '/../../core/db.php';
require_once __DIR__ . '/../../core/response.php';
require_once __DIR__ . '/../../core/jwt.php';

handle_cors();

$method  = $_SERVER['REQUEST_METHOD'];
$path    = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$parts   = explode('/', $path);
$idx     = array_search('api.php', $parts);
$id      = isset($parts[$idx + 1]) ? (int) $parts[$idx + 1] : null;

$payload = require_auth();
$user_id = $payload['sub'];

$body = [];
if (in_array($method, ['POST', 'PUT', 'PATCH'])) {
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
}

$pdo = get_db();

// ── GET /notes ────────────────────────────────────────────────────────────────
if ($method === 'GET' && !$id) {
    $stmt = $pdo->prepare(
        'SELECT id, title, body, created_at FROM notes WHERE user_id = ? ORDER BY created_at DESC'
    );
    $stmt->execute([$user_id]);
    json_ok(['data' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
}

// ── POST /notes ───────────────────────────────────────────────────────────────
if ($method === 'POST' && !$id) {
    $title = trim($body['title'] ?? '');
    $note  = trim($body['body']  ?? '');
    if (!$title) json_err('Title is required', 422);

    $stmt = $pdo->prepare(
        'INSERT INTO notes (user_id, title, body) VALUES (?, ?, ?)'
    );
    $stmt->execute([$user_id, $title, $note]);
    $new_id = (int) $pdo->lastInsertId();

    $stmt2 = $pdo->prepare('SELECT id, title, body, created_at FROM notes WHERE id = ?');
    $stmt2->execute([$new_id]);
    json_ok(['data' => $stmt2->fetch(PDO::FETCH_ASSOC)], 201);
}

// ── DELETE /notes/{id} ────────────────────────────────────────────────────────
if ($method === 'DELETE' && $id) {
    $stmt = $pdo->prepare('DELETE FROM notes WHERE id = ? AND user_id = ?');
    $stmt->execute([$id, $user_id]);
    if ($stmt->rowCount() === 0) json_err('Not found', 404);
    json_ok(['deleted' => true]);
}

json_err('Not found', 404);
