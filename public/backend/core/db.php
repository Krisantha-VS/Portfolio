<?php
declare(strict_types=1);

class DB {
    private static ?PDO $instance = null;

    public static function get(): PDO {
        if (self::$instance !== null) return self::$instance;

        $cfg = require __DIR__ . '/../config/env.php';
        $c   = $cfg['db'];
        $dsn = "mysql:host={$c['host']};port={$c['port']};dbname={$c['name']};charset={$c['charset']}";

        self::$instance = new PDO($dsn, $c['user'], $c['password'], [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]);

        return self::$instance;
    }
}
