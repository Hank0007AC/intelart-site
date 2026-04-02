<?php
session_start();
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://intelart.ca');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }

$body = json_decode(file_get_contents('php://input'), true);

// CSRF check
if (empty($body['csrf_token']) || $body['csrf_token'] !== ($_SESSION['csrf_token'] ?? '')) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Token invalide']);
    exit;
}

$name    = htmlspecialchars(trim($body['name'] ?? ''));
$email   = filter_var(trim($body['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$company = htmlspecialchars(trim($body['company'] ?? ''));
$message = htmlspecialchars(trim($body['message'] ?? ''));

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Champs requis manquants']);
    exit;
}

$to      = 'contact@intelart.ca';
$subject = 'Nouveau message de contact - ' . $name;
$body_txt = "Nom: $name\nEmail: $email\nEntreprise: $company\n\nMessage:\n$message";
$headers  = "From: contact@intelart.ca\r\nReply-To: $email\r\nContent-Type: text/plain; charset=utf-8";

if (mail($to, $subject, $body_txt, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur envoi email']);
}
