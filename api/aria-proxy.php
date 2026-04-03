<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://intelart.ca');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }

session_start();
$now = time();
if (!isset($_SESSION['ac'])) { $_SESSION['ac'] = 0; $_SESSION['aw'] = $now; }
if ($now - $_SESSION['aw'] > 60) { $_SESSION['ac'] = 0; $_SESSION['aw'] = $now; }
if (++$_SESSION['ac'] > 25) { echo json_encode(['text'=>'Trop de messages. Attendez 1 min.','actions'=>[]]); exit; }

$body = json_decode(file_get_contents('php://input'), true);
if (!$body || empty($body['message'])) { http_response_code(400); exit; }

$msg  = substr(strip_tags($body['message']), 0, 500);
// Detect language from the message itself (overrides page lang)
$pageLang = ($body['lang'] ?? 'fr') === 'en' ? 'en' : 'fr';
$msgLower = strtolower($msg);
// Simple heuristic: detect English words
$enWords = ['hello','hi ','hey ','how','what','who','where','when','why','can you','i want','i need','help','tell me','explain','do you','are you','is it','will you','please','thank','good','great','okay','yes','no ','ok '];
$enCount = 0;
foreach ($enWords as $w) { if (strpos($msgLower, $w) !== false) $enCount++; }
$lang = ($enCount >= 1) ? 'en' : $pageLang;
$hist = array_slice($body['conversation'] ?? [], -6);

$apiKey = 'AIzaSyAO-eT7l1MrmCzvp3UAPIEcvzRPfXa18pI';
$url    = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key={$apiKey}";

$sysFR = 'Tu es Aria, l\'assistante IA d\'Intelart (agence IA Ottawa, Canada, PME B2B de services).
Professionnelle, directe, chaleureuse. Français sauf si l\'utilisateur écrit en anglais.
Tu ne te présentes JAMAIS comme Henry. Tu es Aria.

INTELART :
- Fondateur : 6+ ans B2B (Havas, Publicis, GroupeM), IA depuis 2022
- Spécialité : aider les PME de services à capter, qualifier et convertir plus de demandes clients grâce à l\'IA
- Secteurs : Recrutement, Finance, Opérations, Immobilier, Juridique, Santé — et autres

OFFRES :
1. Déploiement IA prioritaire — 5 000 $CA — 2 à 4 semaines, cas d\'usage le plus rentable identifié + système en production
2. Diagnostic IA — 2 500 $CA — 3-5 jours, analyse flux + rapport opportunités classées par ROI
3. Conseil stratégique IA — 1 200 $CA/session — Sessions de conseil de direction
4. Agent IA dédié — Devis — Agent sur mesure, déployé sur votre infrastructure
5. Sur Mesure — Devis — Projet complexe

LIENS :
- RDV gratuit 20 min : https://cal.com/intelart/echange-decouverte-discovery-call
- Déploiement IA 5000$ : https://buy.stripe.com/7sY7sNdvddJf5Kn50J6wE02
- Diagnostic 2500$ : https://buy.stripe.com/aFafZj0Ir7kRc8Lgtb6wE01
- Conseil 1200$/session : https://buy.stripe.com/6oU4gBgHp48FegT2Cl6wE00
- Email : contact@intelart.ca

RÈGLES :
- Réponses courtes (2-4 phrases max)
- Pour tout secteur, même hors liste : donner un exemple concret d\'application IA orienté revenus/conversion, puis proposer le RDV
- Si prêt à acheter : lien Stripe direct
- Ne jamais inventer de chiffres

SORTIE : objet JSON valide UNIQUEMENT. Aucun texte avant ou après. Aucun markdown. Aucun backtick.
Format exact : {"text":"réponse ici","actions":[{"label":"Texte bouton","type":"link","url":"https://..."}]}
Si pas d\'action pertinente : {"text":"réponse","actions":[]}';

$sysEN = 'You are Aria, Intelart\'s AI assistant (AI agency, Ottawa, Canada, B2B service SMBs).
Professional, direct, warm. English unless user writes French. Never present as Henry.

INTELART:
- Founder: 6+ years B2B (Havas, Publicis, GroupeM), AI since 2022
- Specialty: helping service SMBs capture, qualify and convert more client requests with AI
- Sectors: Recruitment, Finance, Operations, Real Estate, Legal, Healthcare — and others

OFFERS:
1. Priority AI Deployment — $5,000 CAD — 2-4 weeks, most profitable use case + system in production
2. AI Diagnostic — $2,500 CAD — 3-5 days, flow analysis + ROI-ranked opportunity report
3. Strategic AI Advisory — $1,200 CAD/session — Executive advisory sessions
4. Dedicated AI Agent — Quote — Custom agent, deployed on your infrastructure
5. Custom — Quote

LINKS:
- Free 20 min call: https://cal.com/intelart/echange-decouverte-discovery-call
- AI Deployment $5,000: https://buy.stripe.com/7sY7sNdvddJf5Kn50J6wE02
- Email: contact@intelart.ca

OUTPUT: valid JSON object ONLY. No text before or after. No markdown. No backticks.
Exact format: {"text":"response here","actions":[{"label":"Button","type":"link","url":"https://..."}]}';

$sys = $lang === 'fr' ? $sysFR : $sysEN;

$contents = [];
foreach ($hist as $h) {
    if (empty($h['role']) || empty($h['content'])) continue;
    $contents[] = ['role' => $h['role'] === 'assistant' ? 'model' : 'user', 'parts' => [['text' => substr($h['content'], 0, 300)]]];
}
$contents[] = ['role' => 'user', 'parts' => [['text' => $msg]]];

$payload = [
    'system_instruction' => ['parts' => [['text' => $sys]]],
    'contents'           => $contents,
    'generationConfig'   => ['temperature' => 0.6, 'maxOutputTokens' => 450]
    // No responseMimeType — let Gemini output plain JSON as instructed
];

$ch = curl_init($url);
curl_setopt_array($ch, [CURLOPT_POST=>true, CURLOPT_POSTFIELDS=>json_encode($payload), CURLOPT_RETURNTRANSFER=>true, CURLOPT_TIMEOUT=>15, CURLOPT_HTTPHEADER=>['Content-Type: application/json']]);
$resp = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$fb = $lang === 'fr'
    ? ['text'=>'Je suis là pour vous aider ! Réservez un échange gratuit ou écrivez à contact@intelart.ca','actions'=>[['label'=>'Réserver 20 min →','type'=>'link','url'=>'https://cal.com/intelart/echange-decouverte-discovery-call']]]
    : ['text'=>'Happy to help! Book a free call or email contact@intelart.ca','actions'=>[['label'=>'Book 20 min →','type'=>'link','url'=>'https://cal.com/intelart/echange-decouverte-discovery-call']]];

if (!$resp || $code !== 200) { echo json_encode($fb, JSON_UNESCAPED_UNICODE); exit; }

$raw = json_decode($resp, true)['candidates'][0]['content']['parts'][0]['text'] ?? '';
if (empty($raw)) { echo json_encode($fb, JSON_UNESCAPED_UNICODE); exit; }

// ── Parse JSON from Gemini output ──
$parsed = null;

// Step 1: extract from markdown code block
if (preg_match('/```(?:json)?\s*([\s\S]+?)\s*```/i', $raw, $cm)) {
    $clean = trim($cm[1]);
} else {
    $clean = trim($raw);
}

// Step 2: remove leading prose, keep from first {
if (preg_match('/(\{[\s\S]+\})/s', $clean, $jm)) {
    $clean = $jm[1];
}

// Step 3: direct parse
$parsed = json_decode($clean, true);

// Step 4: nested JSON in text field
if ($parsed && isset($parsed['text']) && is_string($parsed['text'])) {
    $inner = json_decode($parsed['text'], true);
    if ($inner && isset($inner['text'])) $parsed = $inner;
}

// Step 5: last resort - try all JSON-like objects
if (!$parsed || !isset($parsed['text'])) {
    preg_match_all('/\{[^{}]*(?:\{[^{}]*\}[^{}]*)?\}/s', $raw, $all);
    foreach (array_reverse($all[0]) as $cand) {
        $try = json_decode($cand, true);
        if ($try && isset($try['text'])) { $parsed = $try; break; }
    }
}

if (!$parsed || !isset($parsed['text'])) { echo json_encode($fb, JSON_UNESCAPED_UNICODE); exit; }

// Sanitize actions
$actions = [];
if (!empty($parsed['actions']) && is_array($parsed['actions'])) {
    foreach (array_slice($parsed['actions'], 0, 2) as $a) {
        if (empty($a['label']) || empty($a['type'])) continue;
        if ($a['type'] === 'link' && !empty($a['url'])) {
            if (!preg_match('#^https://(cal\.com|buy\.stripe\.com|intelart\.ca)#', $a['url'])) continue;
            $actions[] = $a;
        } elseif ($a['type'] === 'page' && !empty($a['page'])) {
            $actions[] = $a;
        }
    }
}

echo json_encode(['text' => $parsed['text'], 'actions' => $actions], JSON_UNESCAPED_UNICODE);
