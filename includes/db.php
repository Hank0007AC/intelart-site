<?php
// ═══════════════════════════════════════
// Intelart — PDO Database Connection
// Usage: $pdo = getDB();
// ═══════════════════════════════════════

function getDB(): PDO {
    static $pdo = null;
    if ($pdo !== null) return $pdo;

    $cfg = require __DIR__ . '/../config/database.php';
    $dsn = "mysql:host={$cfg['host']};dbname={$cfg['dbname']};charset={$cfg['charset']}";
    $pdo = new PDO($dsn, $cfg['username'], $cfg['password'], $cfg['options']);
    return $pdo;
}
