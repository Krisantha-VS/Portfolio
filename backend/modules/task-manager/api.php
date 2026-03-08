<?php
declare(strict_types=1);

header('Content-Type: application/json');

require_once __DIR__ . '/../../core/cors.php';
require_once __DIR__ . '/../../core/db.php';
require_once __DIR__ . '/../../core/response.php';
require_once __DIR__ . '/../../core/jwt.php';

handle_cors();

$method = $_SERVER['REQUEST_METHOD'];
$path   = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
// e.g. backend/modules/task-manager/api.php/boards/1/tasks
$parts  = explode('/', $path);
$apiIdx = array_search('api.php', $parts);
if ($apiIdx === false) json_err('Invalid path', 'NOT_FOUND', 404);
$action = $parts[$apiIdx + 1] ?? '';
$id     = isset($parts[$apiIdx + 2]) ? (int) $parts[$apiIdx + 2] : null;

$payload = require_auth(); // validates JWT, returns claims
$user_id = $payload['sub'];

$body = [];
if (in_array($method, ['POST', 'PUT', 'PATCH'])) {
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
}

// ─── Router ──────────────────────────────────────────────

match(true) {
    // Boards
    $action === 'boards' && $method === 'GET'                     => get_boards($user_id),
    $action === 'boards' && $method === 'POST'                    => create_board($user_id, $body),
    $action === 'boards' && $method === 'DELETE' && $id !== null  => delete_board($user_id, $id),
    $action === 'boards' && $method === 'PATCH'  && $id !== null  => rename_board($user_id, $id, $body),

    // Tasks
    $action === 'tasks'  && $method === 'GET'  && isset($_GET['board_id']) => get_tasks($user_id, (int)$_GET['board_id']),
    $action === 'tasks'  && $method === 'POST'                    => create_task($user_id, $body),
    $action === 'tasks'  && $method === 'PATCH' && $id !== null   => update_task($user_id, $id, $body),
    $action === 'tasks'  && $method === 'DELETE' && $id !== null  => delete_task($user_id, $id),

    default => json_err('Not found', 'NOT_FOUND', 404),
};

// ─── Boards ──────────────────────────────────────────────

function get_boards(string $user_id): void {
    $stmt = DB::get()->prepare("SELECT * FROM tm_boards WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$user_id]);
    json_ok($stmt->fetchAll());
}

function create_board(string $user_id, array $body): void {
    $name = trim($body['name'] ?? '');
    if (strlen($name) < 1 || strlen($name) > 100)
        json_err('Board name required (max 100 chars)', 'VALIDATION_ERROR');

    $db = DB::get();
    $db->prepare("INSERT INTO tm_boards (user_id, name) VALUES (?, ?)")->execute([$user_id, $name]);
    $id = (int) $db->lastInsertId();
    $stmt = $db->prepare("SELECT * FROM tm_boards WHERE id = ?");
    $stmt->execute([$id]);
    json_ok($stmt->fetch(), 201);
}

function delete_board(string $user_id, int $id): void {
    $db = DB::get();
    $db->beginTransaction();
    try {
        $check = $db->prepare("SELECT id FROM tm_boards WHERE id = ? AND user_id = ?");
        $check->execute([$id, $user_id]);
        if (!$check->fetch()) {
            $db->rollBack();
            json_err('Board not found', 'NOT_FOUND', 404);
        }
        $db->prepare("DELETE FROM tm_tasks WHERE board_id = ?")->execute([$id]);
        $db->prepare("DELETE FROM tm_boards WHERE id = ? AND user_id = ?")->execute([$id, $user_id]);
        $db->commit();
        json_ok(null);
    } catch (Exception $e) {
        $db->rollBack();
        json_err('Failed to delete board', 'SERVER_ERROR', 500);
    }
}

function rename_board(string $user_id, int $id, array $body): void {
    $name = trim($body['name'] ?? '');
    if (strlen($name) < 1 || strlen($name) > 100)
        json_err('Board name required (max 100 chars)', 'VALIDATION_ERROR');

    $db   = DB::get();
    $stmt = $db->prepare("UPDATE tm_boards SET name = ? WHERE id = ? AND user_id = ?");
    $stmt->execute([$name, $id, $user_id]);
    if ($stmt->rowCount() === 0) json_err('Board not found', 'NOT_FOUND', 404);

    $row = $db->prepare("SELECT * FROM tm_boards WHERE id = ?");
    $row->execute([$id]);
    json_ok($row->fetch());
}

// ─── Tasks ───────────────────────────────────────────────

function get_tasks(string $user_id, int $board_id): void {
    // Verify board ownership
    $check = DB::get()->prepare("SELECT id FROM tm_boards WHERE id = ? AND user_id = ?");
    $check->execute([$board_id, $user_id]);
    if (!$check->fetch()) json_err('Board not found', 'NOT_FOUND', 404);

    $stmt = DB::get()->prepare("
        SELECT * FROM tm_tasks WHERE board_id = ? ORDER BY status, position, created_at
    ");
    $stmt->execute([$board_id]);
    json_ok($stmt->fetchAll());
}

function create_task(string $user_id, array $body): void {
    $board_id   = (int)($body['board_id']   ?? 0);
    $title      = trim($body['title']       ?? '');
    $description= trim($body['description'] ?? '');
    $priority   = $body['priority']   ?? 'medium';
    $status     = $body['status']     ?? 'todo';
    $due_date   = $body['due_date']   ?? null;

    if (!$board_id || strlen($title) < 1 || strlen($title) > 200)
        json_err('board_id and title required', 'VALIDATION_ERROR');

    if (!in_array($priority, ['low','medium','high']))      $priority = 'medium';
    if (!in_array($status,   ['todo','in_progress','done'])) $status  = 'todo';

    // Validate due_date format if provided
    if ($due_date !== null && $due_date !== '') {
        $d = DateTime::createFromFormat('Y-m-d', $due_date);
        if (!$d || $d->format('Y-m-d') !== $due_date)
            json_err('due_date must be in Y-m-d format', 'VALIDATION_ERROR');
    } else {
        $due_date = null;
    }

    // Verify board ownership
    $check = DB::get()->prepare("SELECT id FROM tm_boards WHERE id = ? AND user_id = ?");
    $check->execute([$board_id, $user_id]);
    if (!$check->fetch()) json_err('Board not found', 'NOT_FOUND', 404);

    $db = DB::get();
    $db->prepare("
        INSERT INTO tm_tasks (board_id, user_id, title, description, status, priority, due_date)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ")->execute([$board_id, $user_id, $title, $description ?: null, $status, $priority, $due_date]);
    $id = (int) $db->lastInsertId();

    $task = $db->prepare("SELECT * FROM tm_tasks WHERE id = ?");
    $task->execute([$id]);
    json_ok($task->fetch(), 201);
}

function update_task(string $user_id, int $id, array $body): void {
    $db   = DB::get();
    $stmt = $db->prepare("SELECT * FROM tm_tasks WHERE id = ? AND user_id = ?");
    $stmt->execute([$id, $user_id]);
    $task = $stmt->fetch();
    if (!$task) json_err('Task not found', 'NOT_FOUND', 404);

    $title       = trim($body['title']       ?? $task['title']);
    $description = trim($body['description'] ?? $task['description'] ?? '');
    $status      = $body['status']    ?? $task['status'];
    $priority    = $body['priority']  ?? $task['priority'];
    $position    = isset($body['position']) ? (int)$body['position'] : $task['position'];

    // due_date: key present + empty string → clear; key present + valid date → set; key absent → keep existing
    if (array_key_exists('due_date', $body)) {
        $raw_due = $body['due_date'];
        if ($raw_due === null || $raw_due === '') {
            $due_date = null;
        } else {
            $d = DateTime::createFromFormat('Y-m-d', $raw_due);
            if (!$d || $d->format('Y-m-d') !== $raw_due)
                json_err('due_date must be in Y-m-d format', 'VALIDATION_ERROR');
            $due_date = $raw_due;
        }
    } else {
        $due_date = $task['due_date'];
    }

    if (array_key_exists('status', $body) && !in_array($body['status'], ['todo','in_progress','done'])) {
        json_err('Invalid status value', 'VALIDATION_ERROR', 400);
    }
    if (array_key_exists('priority', $body) && !in_array($body['priority'], ['low','medium','high'])) {
        json_err('Invalid priority value', 'VALIDATION_ERROR', 400);
    }

    if (!in_array($priority, ['low','medium','high']))       $priority = 'medium';
    if (!in_array($status,   ['todo','in_progress','done'])) $status   = $task['status'];

    $db->prepare("
        UPDATE tm_tasks SET title=?, description=?, status=?, priority=?, position=?, due_date=? WHERE id=?
    ")->execute([$title, $description ?: null, $status, $priority, $position, $due_date, $id]);

    $updated = $db->prepare("SELECT * FROM tm_tasks WHERE id = ?");
    $updated->execute([$id]);
    json_ok($updated->fetch());
}

function delete_task(string $user_id, int $id): void {
    $stmt = DB::get()->prepare("DELETE FROM tm_tasks WHERE id = ? AND user_id = ?");
    $stmt->execute([$id, $user_id]);
    if ($stmt->rowCount() === 0) json_err('Task not found', 'NOT_FOUND', 404);
    json_ok(null);
}
