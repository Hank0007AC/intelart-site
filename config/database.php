<?php
// ═══════════════════════════════════════
// Intelart — Database Configuration
// DO NOT commit with real credentials
// ═══════════════════════════════════════

return [
    'host'     => 'localhost',
    'dbname'   => 'intelart_db',
    'username' => 'intelart_user',
    'password' => '', // Set on server — never commit
    'charset'  => 'utf8mb4',
    'options'  => [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ],
];
