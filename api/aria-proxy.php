<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://intelart.ca');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }

session_start();
$now = time();
if (!isset($_SESSION['ac'])) { $_SESSION['ac'] = 0; $_SESSION['aw'] = $now; }
if ($now - $_SESSION['aw'] > 60) { $_SESSION['ac'] = 0; $_SESSION['aw'] = $now; }
if (++$_SESSION['ac'] > 25) {
    echo json_encode(['text'=>'Trop de messages. Attendez 1 min.','actions'=>[]], JSON_UNESCAPED_UNICODE);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
if (!$body || empty($body['message'])) { http_response_code(400); exit; }

$msg  = substr(strip_tags($body['message']), 0, 500);
$pageLang = ($body['lang'] ?? 'fr') === 'en' ? 'en' : 'fr';
$msgLower = strtolower($msg);

$enWords = ['hello','hi ','hey ','how','what','who','where','when','why','can you','i want','i need','help','tell me','explain','do you','are you','is it','will you','please','thank','good','great','okay','yes','no ','ok '];
$enCount = 0;
foreach ($enWords as $w) { if (strpos($msgLower, $w) !== false) $enCount++; }
$lang = ($enCount >= 1) ? 'en' : $pageLang;

$hist = array_slice($body['conversation'] ?? [], -6);

$apiKey = getenv('NVIDIA_API_KEY') ?: '';
$model  = getenv('NVIDIA_MODEL') ?: 'moonshotai/kimi-k2-thinking';
$url    = 'https://integrate.api.nvidia.com/v1/chat/completions';

$sysFR = "Tu es Aria, l'assistante IA d'Intelart (agence IA Ottawa, Canada, PME B2B de services).
Professionnelle, directe, chaleureuse. Français sauf si l'utilisateur écrit en anglais.
Tu ne te présentes JAMAIS comme Henry. Tu es Aria.

INTELART :
- Fondateur : 6+ ans B2B (Havas, Publicis, GroupeM), IA depuis 2022
- Spécialité : aider les PME de services à capter, qualifier et convertir plus de demandes clients grâce à l'IA
- Secteurs : Recrutement, Finance, Opérations, Immobilier, Juridique, Santé — et autres

OFFRES :
1. Déploiement IA prioritaire — 5 000 \$CA — 2 à 4 semaines
2. Diagnostic IA — 2 500 \$CA — 3-5 jours
3. Conseil stratégique IA — 1 200 \$CA/session
4. Agent IA dédié — Devis
5. Sur Mesure — Devis

LIENS :
- RDV gratuit 20 min : https://cal.com/intelart/echange-decouverte-discovery-call
- Déploiement IA : https://buy.stripe.com/test_7sY7sNdvddJf5Kn90J6wE02
- Diagnostic IA : https://buy.stripe.com/test_6oU4gBgHp48FegT2Cl6wE00
- Conseil stratégique IA : https://buy.stripe.com/test_aFafZj0Ir7kRc8Lgtb6wE01
- Email : contact@intelart.ca

RÈGLES :
- Réponses courtes, utiles, naturelles
- Si on te demande qui tu es, tu réponds clairement que tu es Aria, l'assistante IA d'Intelart
- Si on te demande ce que tu es, tu réponds clairement que tu es un agent IA / assistante IA d'Intelart
- Pour tout secteur, même hors liste : donner un exemple concret d'application IA orienté revenus/conversion, puis proposer le RDV
- Si la personne veut acheter maintenant, donne le lien direct pertinent
- Ne jamais inventer de chiffres

SORTIE : objet JSON valide UNIQUEMENT. Aucun texte avant ou après. Aucun markdown. Aucun backtick.
Format exact : {\"text\":\"réponse ici\",\"actions\":[{\"label\":\"Texte bouton\",\"type\":\"link\",\"url\":\"https://...\"}]}
Si pas d'action pertinente : {\"text\":\"réponse\",\"actions\":[]}";

$sysEN = "You are Aria, Intelart's AI assistant (AI agency, Ottawa, Canada, B2B service SMBs).
Professional, direct, warm. English unless user writes French. Never present as Henry.

INTELART:
- Founder: 6+ years B2B (Havas, Publicis, GroupeM), AI since 2022
- Specialty: helping service SMBs capture, qualify and convert more client requests with AI
- Sectors: Recruitment, Finance, Operations, Real Estate, Legal, Healthcare — and others

OFFERS:
1. Priority AI Deployment — \$5,000 CAD — 2-4 weeks
2. AI Diagnostic — \$2,500 CAD — 3-5 days
3. Strategic AI Advisory — \$1,200 CAD/session
4. Dedicated AI Agent — Quote
5. Custom — Quote

LINKS:
- Free 20 min call: https://cal.com/intelart/echange-decouverte-discovery-call
- AI Deployment: https://buy.stripe.com/test_7sY7sNdvddJf5Kn90J6wE02
- AI Diagnostic: https://buy.stripe.com/test_6oU4gBgHp48FegT2Cl6wE00
- Strategic AI Advisory: https://buy.stripe.com/test_aFafZj0Ir7kRc8Lgtb6wE01
- Email: contact@intelart.ca

RULES:
- Short, useful, natural answers
- If asked who you are, answer clearly that you are Aria, Intelart's AI assistant
- If asked what you are, answer clearly that you are an AI agent / AI assistant for Intelart
- For any industry, even outside the listed ones: give one concrete AI revenue/conversion use case, then suggest the call
- If ready to buy: give the direct relevant link
- Never invent numbers

OUTPUT: valid JSON object ONLY. No text before or after. No markdown. No backticks.
Exact format: {\"text\":\"response here\",\"actions\":[{\"label\":\"Button\",\"type\":\"link\",\"url\":\"https://...\"}]}
If no relevant action: {\"text\":\"response\",\"actions\":[]}";

$sys = $lang === 'fr' ? $sysFR : $sysEN;

$messages = [
    ['role' => 'system', 'content' => $sys]
];

foreach ($hist as $h) {
    $roleIn = $h['role'] ?? 'user';
    $role = ($roleIn === 'assistant' || $roleIn === 'bot') ? 'assistant' : 'user';
    $content = substr((string)($h['content'] ?? ''), 0, 300);
    if ($content !== '') $messages[] = ['role' => $role, 'content' => $content];
}
$messages[] = ['role' => 'user', 'content' => $msg];

$payload = [
    'model' => $model,
    'messages' => $messages,
    'temperature' => 0.4,
    'max_tokens' => 260
];

$fb = $lang === 'fr'
    ? ['text'=>'Je suis Aria, l’assistante IA d’Intelart. Je peux vous orienter vers l’offre adaptée ou vers un échange gratuit de 20 minutes.','actions'=>[['label'=>'Réserver 20 min →','type'=>'link','url'=>'https://cal.com/intelart/echange-decouverte-discovery-call']]]
    : ['text'=>'I’m Aria, Intelart’s AI assistant. I can guide you to the right offer or to a free 20-minute call.','actions'=>[['label'=>'Book 20 min →','type'=>'link','url'=>'https://cal.com/intelart/echange-decouverte-discovery-call']]];

if ($apiKey === '') {
    error_log('ARIA_PROXY: NVIDIA_API_KEY missing in environment');
    echo json_encode($fb, JSON_UNESCAPED_UNICODE);
    exit;
}

$ch = curl_init($url);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 35,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]
]);
$resp = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$err  = curl_error($ch);
curl_close($ch);

if (!$resp || $code !== 200) {
    error_log("ARIA_PROXY NVIDIA ERROR HTTP=$code CURL=$err RESP=" . substr((string)$resp, 0, 800));
    echo json_encode($fb, JSON_UNESCAPED_UNICODE);
    exit;
}

$data = json_decode($resp, true);
$raw = $data['choices'][0]['message']['content'] ?? '';

if (empty($raw)) {
    error_log("ARIA_PROXY EMPTY CONTENT RESP=" . substr((string)$resp, 0, 800));
    echo json_encode($fb, JSON_UNESCAPED_UNICODE);
    exit;
}

$clean = trim($raw);
if (preg_match('/```(?:json)?\s*([\s\S]+?)\s*```/i', $clean, $m)) $clean = trim($m[1]);
if (preg_match('/(\{[\s\S]+\})/s', $clean, $m)) $clean = $m[1];

$parsed = json_decode($clean, true);

if ($parsed && isset($parsed['text']) && is_string($parsed['text'])) {
    $inner = json_decode($parsed['text'], true);
    if ($inner && isset($inner['text'])) $parsed = $inner;
}

if (!$parsed || !isset($parsed['text'])) {
    error_log("ARIA_PROXY JSON PARSE FAIL RAW=" . substr($raw, 0, 1200));
    echo json_encode($fb, JSON_UNESCAPED_UNICODE);
    exit;
}

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

echo json_encode([
    'text' => (string)$parsed['text'],
    'actions' => $actions
], JSON_UNESCAPED_UNICODE);
