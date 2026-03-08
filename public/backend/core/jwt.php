<?php
declare(strict_types=1);

require_once __DIR__ . '/response.php';

function jwt_verify(string $token): array {
    $cfg    = require __DIR__ . '/../config/env.php';
    $secret = $cfg['auth']['jwt_access_secret'];

    $parts = explode('.', $token);
    if (count($parts) !== 3) jwt_abort();

    [$headerB64, $payloadB64, $sigB64] = $parts;

    // Validate header algorithm (P4)
    $header = json_decode(base64url_decode($headerB64), true);
    if (!is_array($header) || ($header['alg'] ?? '') !== 'HS256') jwt_abort();

    // Verify signature (HS256)
    $expected = base64url_encode(hash_hmac('sha256', "{$headerB64}.{$payloadB64}", $secret, true));
    if (!hash_equals($expected, $sigB64)) jwt_abort();

    // Decode payload
    $payload = json_decode(base64url_decode($payloadB64), true);
    if (!is_array($payload)) jwt_abort();

    // Check expiry
    if (isset($payload['exp']) && $payload['exp'] < time()) {
        json_err('Token expired', 'TOKEN_EXPIRED', 401);
    }

    // Check not-before claim (P5)
    if (isset($payload['nbf']) && $payload['nbf'] > time()) {
        json_err('Token not yet valid', 'INVALID_TOKEN', 401);
    }

    return $payload;
}

function require_auth(): array {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!str_starts_with($header, 'Bearer ')) {
        json_err('Unauthorized', 'UNAUTHORIZED', 401);
    }
    return jwt_verify(substr($header, 7));
}

function base64url_encode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode(string $data): string {
    return base64_decode(strtr($data, '-_', '+/') . str_repeat('=', (4 - strlen($data) % 4) % 4));
}

function jwt_abort(): never {
    json_err('Invalid token', 'INVALID_TOKEN', 401);
}
