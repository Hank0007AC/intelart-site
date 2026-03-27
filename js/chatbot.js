/* ═══════════════ CHATBOT ENGINE ═══════════════ */
(function(){

const CB_KEY = 'intelart-chat';
const cbBody = document.getElementById('cb-body');
const cbWin = document.getElementById('cb-win');
const cbFloat = document.getElementById('cb-float');
const cbBadge = document.getElementById('cb-badge');
const cbInput = document.getElementById('cb-input');
let chatOpen = false;
let chatHistory = [];
let welcomeSent = false;
let lastMsgTime = 0;
const MSG_COOLDOWN = 1000;

/* ── Navigation whitelist ── */
const ALLOWED_PAGES = ['home','about','services','offers','contact','offre-sprint','offre-audit','offre-consulting','offre-agent','offre-surmesure','secteur-recrutement','secteur-finance','secteur-operations','secteur-immobilier','secteur-juridique','secteur-sante'];

/* ── Chatbot Content (bilingual) ── */
const CB = {
fr: {
name:'Aria — Assistante Intelart',
status:'En ligne',
placeholder:'Écrivez un message...',
clearBtn:'Effacer',
welcome:'👋 Bonjour ! Je suis Aria, l\'assistante d\'Intelart. Comment puis-je vous aider aujourd\'hui ?',
welcomeBtns:['Nos offres','Prendre un RDV','Comment ça marche ?'],
offers:'Voici nos 5 offres. Laquelle vous intéresse ?',
offerBtns:['Sprint IA','Audit IA','Consulting IA','Agent IA','Sur mesure'],
sprint:'🚀 **Sprint IA** — En 10 jours, on identifie votre meilleur cas d\'usage et on livre un premier système IA fonctionnel. Prix : 5 000 $CA. Sans engagement long terme.',
sprintBtns:['Réserver 20 min','En savoir plus'],
audit:'🔍 **Audit IA** — En 3 à 5 jours, on analyse vos processus et on vous livre un rapport d\'opportunités IA classées par impact. Prix : 2 500 $CA.',
auditBtns:['Commander l\'audit','Réserver un échange'],
consulting:'💡 **Consulting IA** — Sessions stratégiques avec un expert. Aide au choix techno, architecture cible et plan de déploiement. Prix : 1 200 $CA/mois.',
consultingBtns:['Prendre rendez-vous'],
agent:'🤖 **Agent IA Personnalisé (OpenClaw)** — Agent sur mesure avec infrastructure dédiée. Conception, développement, déploiement et formation inclus. Devis sur demande.',
agentBtns:['Discuter de mon projet →'],
surmesure:'🛠️ **Sur Mesure** — Projet personnalisé selon vos besoins spécifiques. Développement, intégration complexe, automatisation avancée.',
surmesureBtns:['Soumettre ma demande'],
rdv:'📅 Réservez un échange gratuit de 20 minutes avec notre équipe. On évalue ensemble si l\'IA peut accélérer votre quotidien.',
rdvBtns:['Réserver maintenant →'],
process:'Voici comment on travaille :\n\n1️⃣ **Cadrage** (Jour 1) — On comprend vos problèmes et priorités\n2️⃣ **Diagnostic** (J 2-3) — Analyse de vos processus et opportunités\n3️⃣ **Prototype** (J 4-6) — Construction du premier système\n4️⃣ **Livraison** (J 7-10) — Système fonctionnel + documentation + formation',
processBtns:['Voir nos offres','Réserver un échange'],
priceTrigger:'Nos tarifs :\n• Sprint IA : 5 000 $CA\n• Audit IA : 2 500 $CA\n• Consulting : 1 200 $CA/mois\n• Agent IA & Sur Mesure : sur devis\n\nL\'échange initial de 20 min est gratuit.',
priceBtns:['Réserver un échange'],
timeTrigger:'⏱️ Nos délais :\n• Sprint IA : 10 jours\n• Audit IA : 3 à 5 jours\n• Consulting : sessions flexibles\n• Agent IA : selon le projet\n\nOn commence petit, on livre vite.',
timeBtns:['Réserver un échange'],
recruitTrigger:'🎯 On aide les équipes recrutement à qualifier 3x plus de candidats sans agrandir l\'équipe. Tri automatique des CV, relances programmées, pipeline centralisé.',
recruitBtns:['Voir le cas d\'usage'],
financeTrigger:'📊 On aide les services financiers à automatiser leurs rapports clients. Jusqu\'à 80% de temps économisé par rapport au traitement manuel.',
financeBtns:['Voir le cas d\'usage'],
agentTrigger:'🤖 Notre technologie OpenClaw permet de créer des agents IA personnalisés avec infrastructure dédiée. Idéal pour les besoins récurrents complexes.',
agentTriggerBtns:['Discuter du projet'],
escalade:'Je comprends que vous souhaitez parler à un membre de notre équipe. Réservez un échange direct et nous traiterons votre demande en priorité.',
escaladeBtns:['Contacter un humain →'],
litige:'⚠️ Je suis désolé d\'apprendre que vous rencontrez un problème de paiement. Je ne suis pas en mesure de traiter les litiges financiers. Veuillez contacter notre équipe directement pour résoudre cette situation rapidement.',
litigeBtns:['Contacter le support →'],
annulation:'Pour modifier ou annuler un rendez-vous, veuillez nous contacter directement. Notre équipe traitera votre demande sous 24h.',
annulationBtns:['Contacter l\'équipe →'],
fallback:'Merci pour votre message ! Pour vous répondre au mieux, je vous propose un échange rapide avec notre équipe.',
fallbackBtns:['Réserver un échange']
},
en: {
name:'Aria — Intelart Assistant',
status:'Online',
placeholder:'Type a message...',
clearBtn:'Clear',
welcome:'👋 Hi! I\'m Aria, Intelart\'s AI assistant. How can I help you today?',
welcomeBtns:['Our services','Book a call','How does it work?'],
offers:'Here are our 5 services. Which one interests you?',
offerBtns:['AI Sprint','AI Audit','AI Consulting','AI Agent','Custom'],
sprint:'🚀 **AI Sprint** — In 10 days, we identify your best use case and deliver a first working AI system. Price: 5 000 $CA. No long-term commitment.',
sprintBtns:['Book 20 min','Learn more'],
audit:'🔍 **AI Audit** — In 3 to 5 days, we analyze your processes and deliver an AI opportunity report ranked by impact. Price: 2 500 $CA.',
auditBtns:['Order the audit','Book a call'],
consulting:'💡 **AI Consulting** — Strategic sessions with an expert. Help with tech choices, target architecture, and deployment plan. Price: 1 200 $CA/month.',
consultingBtns:['Book an appointment'],
agent:'🤖 **Custom AI Agent (OpenClaw)** — Tailor-made AI agent with dedicated infrastructure. Design, development, deployment, and training included. Quote on request.',
agentBtns:['Discuss my project →'],
surmesure:'🛠️ **Custom Project** — Tailored to your specific needs. Custom development, complex integration, advanced automation.',
surmesureBtns:['Submit my request'],
rdv:'📅 Book a free 20-minute call with our team. We\'ll assess together whether AI can accelerate your daily work.',
rdvBtns:['Book now →'],
process:'Here\'s how we work:\n\n1️⃣ **Scoping** (Day 1) — We understand your problems and priorities\n2️⃣ **Diagnosis** (D 2-3) — Process analysis and opportunities\n3️⃣ **Prototype** (D 4-6) — Building the first system\n4️⃣ **Delivery** (D 7-10) — Working system + documentation + training',
processBtns:['See our services','Book a call'],
priceTrigger:'Our pricing:\n• AI Sprint: 5 000 $CA\n• AI Audit: 2 500 $CA\n• Consulting: 1 200 $CA/month\n• AI Agent & Custom: on request\n\nThe initial 20-min call is free.',
priceBtns:['Book a call'],
timeTrigger:'⏱️ Our timelines:\n• AI Sprint: 10 days\n• AI Audit: 3 to 5 days\n• Consulting: flexible sessions\n• AI Agent: depends on project\n\nWe start small, we deliver fast.',
timeBtns:['Book a call'],
recruitTrigger:'🎯 We help recruitment teams qualify 3x more candidates without growing the team. Automatic CV sorting, scheduled follow-ups, centralized pipeline.',
recruitBtns:['See use case'],
financeTrigger:'📊 We help financial services automate their client reports. Up to 80% time saved compared to manual processing.',
financeBtns:['See use case'],
agentTrigger:'🤖 Our OpenClaw technology enables custom AI agents with dedicated infrastructure. Ideal for complex recurring needs.',
agentTriggerBtns:['Discuss the project'],
escalade:'I understand you would like to speak with a team member. Book a direct call and we will handle your request as a priority.',
escaladeBtns:['Contact a human →'],
litige:'⚠️ I\'m sorry to hear you\'re experiencing a payment issue. I\'m not able to handle financial disputes. Please contact our team directly to resolve this quickly.',
litigeBtns:['Contact support →'],
annulation:'To change or cancel an appointment, please contact us directly. Our team will handle your request within 24h.',
annulationBtns:['Contact the team →'],
fallback:'Thanks for your message! To best help you, I suggest a quick chat with our team.',
fallbackBtns:['Book a call']
}
};

function getCB(){return CB[lang]||CB.fr}

/* ── Safe DOM rendering (XSS prevention) ── */
function safeBotContent(text, container){
  var parts = text.split('\n');
  parts.forEach(function(line, i){
    if(i > 0) container.appendChild(document.createElement('br'));
    var boldRe = /\*\*(.*?)\*\*/g;
    var lastIdx = 0;
    var match;
    while((match = boldRe.exec(line)) !== null){
      if(match.index > lastIdx){
        container.appendChild(document.createTextNode(line.slice(lastIdx, match.index)));
      }
      var strong = document.createElement('strong');
      strong.textContent = match[1];
      container.appendChild(strong);
      lastIdx = boldRe.lastIndex;
    }
    if(lastIdx < line.length){
      container.appendChild(document.createTextNode(line.slice(lastIdx)));
    }
  });
}

/* ── Input sanitization for API calls ── */
function sanitizeInput(text){
  return text.slice(0, 500).replace(/[\x00-\x1F]/g, '');
}

/* ── Render helpers ── */
function addBotMsg(text, btns){
var div = document.createElement('div');
div.className = 'cb-msg cb-msg-bot';
safeBotContent(text, div);
if(btns && btns.length){
var bd = document.createElement('div');
bd.className = 'cb-btns';
btns.forEach(function(b){
var btn = document.createElement('button');
btn.className = 'cb-btn';
btn.textContent = b;
btn.onclick = function(){ handleBtn(b); };
bd.appendChild(btn);
});
div.appendChild(bd);
}
cbBody.appendChild(div);
cbBody.scrollTop = cbBody.scrollHeight;
chatHistory.push({role:'bot',text:text,btns:btns||[]});
saveChat();
}

function addUserMsg(text){
var div = document.createElement('div');
div.className = 'cb-msg cb-msg-user';
div.textContent = text;
cbBody.appendChild(div);
cbBody.scrollTop = cbBody.scrollHeight;
chatHistory.push({role:'user',text:text});
saveChat();
}

function showTyping(){
var div = document.createElement('div');
div.className = 'cb-typing';
div.id = 'cb-typing';
for(var i=0;i<3;i++) div.appendChild(document.createElement('span'));
cbBody.appendChild(div);
cbBody.scrollTop = cbBody.scrollHeight;
}

function hideTyping(){
var el = document.getElementById('cb-typing');
if(el) el.remove();
}

function botReply(text, btns, delay){
showTyping();
setTimeout(function(){
hideTyping();
addBotMsg(text, btns);
}, delay||800);
}

/* ── Button handler ── */
function handleBtn(label){
addUserMsg(label);
var cb = getCB();
var l = label.toLowerCase();

/* Escalade / human contact */
if(l.includes('contacter un humain')||l.includes('contact a human')||l.includes('contacter le support')||l.includes('contact support')||l.includes('contacter l\'équipe')||l.includes('contact the team')){
  window.open('https://cal.com/intelart/echange-decouverte-discovery-call','_blank','noopener,noreferrer');return;
}
/* Offers list */
if(l==='nos offres'||l==='our services'){botReply(cb.offers, cb.offerBtns);return;}
/* Individual offers */
if(l==='sprint ia'||l==='ai sprint'){botReply(cb.sprint, cb.sprintBtns);return;}
if(l==='audit ia'||l==='ai audit'){botReply(cb.audit, cb.auditBtns);return;}
if(l==='consulting ia'||l==='ai consulting'){botReply(cb.consulting, cb.consultingBtns);return;}
if(l==='agent ia'||l==='ai agent'){botReply(cb.agent, cb.agentBtns);return;}
if(l==='sur mesure'||l==='custom'){botReply(cb.surmesure, cb.surmesureBtns);return;}
/* RDV */
if(l==='prendre un rdv'||l==='book a call'||l==='réserver un échange'||l==='book a call'){botReply(cb.rdv, cb.rdvBtns);return;}
/* Process */
if(l==='comment ça marche ?'||l==='how does it work?'){botReply(cb.process, cb.processBtns);return;}
/* Voir offres */
if(l==='voir nos offres'||l==='see our services'){botReply(cb.offers, cb.offerBtns);return;}
/* Sprint savoir plus */
if(l==='en savoir plus'||l==='learn more'){toggleChat();go('offre-sprint');return;}
/* Commander audit */
if(l==='commander l\'audit'||l==='order the audit'){window.open('https://buy.stripe.com/test_aFafZj0Ir7kRc8Lgtb6wE01','_blank','noopener,noreferrer');return;}
/* Prendre RDV / Réserver */
if(l.includes('réserver')||l.includes('book')||l==='prendre rendez-vous'||l==='book an appointment'){window.open('https://cal.com/intelart/echange-decouverte-discovery-call','_blank','noopener,noreferrer');return;}
/* Discuter projet */
if(l.includes('discuter')||l.includes('discuss')){window.open('https://cal.com/intelart/echange-decouverte-discovery-call','_blank','noopener,noreferrer');return;}
/* Soumettre demande */
if(l.includes('soumettre')||l.includes('submit')){toggleChat();go('offre-surmesure');return;}
/* Voir cas d'usage */
if(l.includes('voir le cas')||l.includes('see use case')){
if(chatHistory.some(function(h){return h.text&&(h.text.includes('recrutement')||h.text.includes('recruitment'));})){toggleChat();go('secteur-recrutement');return;}
if(chatHistory.some(function(h){return h.text&&h.text.includes('financ');})){toggleChat();go('secteur-finance');return;}
toggleChat();go('secteur-recrutement');return;
}

/* Fallback for unknown buttons */
botReply(cb.fallback, cb.fallbackBtns);
}

/* ── Keyword detection for free text ── */
function detectKeyword(text){
var t = text.toLowerCase();
var cb = getCB();
/* P1: Sensitive — disputes, billing, refunds (MUST be first) */
if(/d[eé]bit|rembours|factur|litige|probl[eè]me.*paie|double.*charge|charged.*twice|refund|billing|dispute|payment.*issue|invoice.*error|overcharged/.test(t)){botReply(cb.litige, cb.litigeBtns);return true;}
/* P1: Cancellation/modification */
if(/annul|cancel|modifier.*rendez|change.*appointment|reschedul/.test(t)){botReply(cb.annulation, cb.annulationBtns);return true;}
/* P1: Escalation to human */
if(/humain|personne|[eé]quipe|support|aide|help|human|person|team|speak|talk|agent r[eé]el|real agent|parler [àa]/.test(t)){botReply(cb.escalade, cb.escaladeBtns);return true;}
/* Standard keyword detection */
return false;
}

/* ── OpenClaw Config ── */
/* ⚠️ SECURITY: Never put API keys here in production.
   Use a server-side proxy (e.g., /api/chatbot-proxy.php) instead.
   This file is visible to all users in the browser. */
const OPENCLAW_URL = '/api/aria-proxy.php';
const OPENCLAW_KEY = ''; /* Server-side only — DO NOT fill in client JS */

async function callOpenClaw(text){
if(!OPENCLAW_URL) return null;
try {
var res = await fetch(OPENCLAW_URL, {
method:'POST',
headers:{
  'Content-Type':'application/json',
  ...(OPENCLAW_KEY?{'Authorization':'Bearer '+OPENCLAW_KEY}:{})
},
body: JSON.stringify({
  message: sanitizeInput(text),
  conversation: chatHistory.slice(-10).map(function(h){return {role:h.role,content:sanitizeInput(h.text||'')};}),
  lang: lang,
  page: curPage,
  source: 'widget'
})
});
if(!res.ok) return null;
return await res.json();
} catch(e){ return null; }
}

/* ── Send message (hybrid: local → OpenClaw → fallback) ── */
window.sendMsg = async function(){
if(Date.now() - lastMsgTime < MSG_COOLDOWN) return;
lastMsgTime = Date.now();
var val = cbInput.value.trim();
if(!val) return;
addUserMsg(val);
cbInput.value = '';

/* 1) Local keywords — instant, free */
if(detectKeyword(val)) return;

/* 2) OpenClaw agent — if configured */
if(OPENCLAW_URL){
showTyping();
var data = await callOpenClaw(val);
hideTyping();
if(data && data.text){
var btns = (data.actions||[]).map(function(a){return a.label;});
addBotMsg(data.text, btns);
if(data.navigate && ALLOWED_PAGES.indexOf(data.navigate) !== -1){ toggleChat(); go(data.navigate); }
if(data.redirect && /^https:\/\/(cal\.com|buy\.stripe\.com)\//.test(data.redirect)){ window.open(data.redirect,'_blank','noopener,noreferrer'); }
return;
}
}

/* 3) Fallback static — always a response */
var cb = getCB();
botReply(cb.fallback, cb.fallbackBtns);
};

/* ── Toggle chat ── */
window.toggleChat = function(){
chatOpen = !chatOpen;
if(chatOpen){
cbWin.classList.add('open');
cbBadge.classList.remove('show');
cbFloat.classList.remove('pulse');
if(!welcomeSent){
var cb = getCB();
setTimeout(function(){addBotMsg(cb.welcome, cb.welcomeBtns);}, 300);
welcomeSent = true;
}
cbInput.focus();
/* Focus trap */
cbWin.addEventListener('keydown', trapFocus);
} else {
cbWin.classList.remove('open');
cbWin.removeEventListener('keydown', trapFocus);
}
};

/* ── Focus trap ── */
function trapFocus(e){
if(e.key==='Escape'){toggleChat();return;}
if(e.key!=='Tab') return;
var focusable = cbWin.querySelectorAll('button,input,[tabindex]:not([tabindex="-1"])');
var first = focusable[0];
var last = focusable[focusable.length-1];
if(e.shiftKey){
if(document.activeElement===first){e.preventDefault();last.focus();}
} else {
if(document.activeElement===last){e.preventDefault();first.focus();}
}
}

/* ── Clear chat ── */
window.clearChat = function(){
chatHistory = [];
welcomeSent = false;
while(cbBody.firstChild) cbBody.removeChild(cbBody.firstChild);
sessionStorage.removeItem(CB_KEY);
var cb = getCB();
setTimeout(function(){addBotMsg(cb.welcome, cb.welcomeBtns);}, 300);
welcomeSent = true;
};

/* ── Persistence ── */
function saveChat(){
try{sessionStorage.setItem(CB_KEY, JSON.stringify({history:chatHistory,lang:lang}));}catch(e){}
}

function restoreChat(){
try{
var d = JSON.parse(sessionStorage.getItem(CB_KEY));
if(d && d.history && d.history.length){
d.history.forEach(function(m){
  var div = document.createElement('div');
  if(m.role==='bot'){
    div.className = 'cb-msg cb-msg-bot';
    safeBotContent(m.text, div);
    if(m.btns && m.btns.length){
      var bd = document.createElement('div');
      bd.className = 'cb-btns';
      m.btns.forEach(function(b){
        var btn = document.createElement('button');
        btn.className = 'cb-btn';
        btn.textContent = b;
        btn.onclick = function(){ handleBtn(b); };
        bd.appendChild(btn);
      });
      div.appendChild(bd);
    }
  } else {
    div.className = 'cb-msg cb-msg-user';
    div.textContent = m.text;
  }
  cbBody.appendChild(div);
});
chatHistory = d.history;
welcomeSent = true;
cbBody.scrollTop = cbBody.scrollHeight;
}
}catch(e){}
}

/* ── Update chatbot language ── */
window.updateChatLang = function(){
var cb = getCB();
document.getElementById('cb-hdr-name').textContent = cb.name;
document.getElementById('cb-hdr-status').textContent = cb.status;
document.getElementById('cb-clear').textContent = cb.clearBtn;
cbInput.placeholder = cb.placeholder;
};

/* ── Init ── */
restoreChat();
updateChatLang();
if(cbInput) cbInput.setAttribute('aria-label', typeof lang!=='undefined'&&lang==='en'?'Message for Aria':'Message pour Aria');

/* ── Event listeners (replaces inline onclick) ── */
if(cbFloat) cbFloat.addEventListener('click', function(){ toggleChat(); });
var cbCloseBtn = document.getElementById('cb-close');
if(cbCloseBtn) cbCloseBtn.addEventListener('click', function(){ toggleChat(); });
var cbClearBtn = document.getElementById('cb-clear');
if(cbClearBtn) cbClearBtn.addEventListener('click', function(){ clearChat(); });
var cbSendBtn = document.getElementById('cb-send');
if(cbSendBtn) cbSendBtn.addEventListener('click', function(){ sendMsg(); });
if(cbInput) cbInput.addEventListener('keydown', function(e){ if(e.key==='Enter') sendMsg(); });

/* Badge after 8s */
setTimeout(function(){
if(!chatOpen) cbBadge.classList.add('show');
},8000);

})();
