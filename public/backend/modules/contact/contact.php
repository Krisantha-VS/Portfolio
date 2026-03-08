<?php
declare(strict_types=1);

header('Content-Type: application/json');

require_once __DIR__ . '/../../core/cors.php';
require_once __DIR__ . '/../../core/db.php';
require_once __DIR__ . '/../../core/response.php';
require_once __DIR__ . '/../../core/rate-limit.php';

handle_cors();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_err('Method not allowed', 'METHOD_NOT_ALLOWED', 405);
}

// Rate limit: 5 submissions per IP per hour
check_rate_limit('contact', 5, 3600);

// Parse body
$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    json_err('Invalid JSON body', 'INVALID_BODY', 400);
}

// Validate
$name    = trim($body['name']    ?? '');
$email   = trim($body['email']   ?? '');
$subject = trim($body['subject'] ?? '');
$message = trim($body['message'] ?? '');

if (strlen($name) < 2 || strlen($name) > 100) {
    json_err('Name must be between 2 and 100 characters', 'VALIDATION_ERROR', 400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 150) {
    json_err('Valid email address required', 'VALIDATION_ERROR', 400);
}
if (strlen($subject) < 2 || strlen($subject) > 200) {
    json_err('Subject must be between 2 and 200 characters', 'VALIDATION_ERROR', 400);
}
if (strlen($message) < 10 || strlen($message) > 5000) {
    json_err('Message must be between 10 and 5000 characters', 'VALIDATION_ERROR', 400);
}

// Sanitize
$name    = htmlspecialchars($name,    ENT_QUOTES, 'UTF-8');
$subject = htmlspecialchars($subject, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

$ip         = get_client_ip();
$user_agent = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 300);

// Save to DB
try {
    $db   = DB::get();
    $stmt = $db->prepare("
        INSERT INTO contact_messages (name, email, subject, message, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$name, $email, $subject, $message, $ip, $user_agent]);
} catch (PDOException $e) {
    error_log('Contact DB error: ' . $e->getMessage());
    json_err('Failed to save message', 'DB_ERROR', 500);
}

// Send email notification
send_notification($name, $email, $subject, $message);

json_ok(['message' => 'Message received. I will get back to you within one business day.']);

// ─── Email ───────────────────────────────────────────────

function send_notification(string $name, string $email, string $subject, string $message): void {
    $cfg  = require __DIR__ . '/../../config/env.php';
    $to   = $cfg['email']['to'];
    $from = $cfg['email']['from'];
    $from_name = $cfg['email']['from_name'];

    $mail_subject = "Portfolio Contact: {$subject}";
    $mail_body    = "New contact form submission\n\n"
                  . "Name:    {$name}\n"
                  . "Email:   {$email}\n"
                  . "Subject: {$subject}\n\n"
                  . "Message:\n{$message}\n\n"
                  . "---\nSent from portfolio contact form";

    $headers = implode("\r\n", [
        "From: {$from_name} <{$from}>",
        "Reply-To: {$name} <{$email}>",
        "X-Mailer: PHP/" . PHP_VERSION,
        "Content-Type: text/plain; charset=UTF-8",
    ]);

    // Suppress errors — mail failure shouldn't fail the request
    @mail($to, $mail_subject, $mail_body, $headers);
}
