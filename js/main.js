/* ═══════════════════════════════════════
 MPA — Intelart Multi-Page Architecture
 Frontend: HTML + CSS + JS | Backend: PHP API
═══════════════════════════════════════ */
// PAGE_ID is read from <html data-page="..."> attribute

// Page ID to URL mapping
const PAGE_URLS = {
  'home':'/', 'about':'/about.html', 'services':'/services.html',
  'offers':'/offers.html', 'contact':'/contact.html',
  'offre-sprint':'/offre-sprint.html', 'offre-audit':'/offre-audit.html',
  'offre-consulting':'/offre-consulting.html', 'offre-agent':'/offre-agent.html',
  'offre-surmesure':'/offre-surmesure.html',
  'secteur-recrutement':'/secteur-recrutement.html', 'secteur-finance':'/secteur-finance.html',
  'secteur-operations':'/secteur-operations.html', 'secteur-immobilier':'/secteur-immobilier.html',
  'secteur-juridique':'/secteur-juridique.html', 'secteur-sante':'/secteur-sante.html',
  'logos':'/logos.html'
};

// Detect language from URL query param
const urlParams = new URLSearchParams(window.location.search);
const initLang = urlParams.get('lang') === 'en' ? 'en' : (localStorage.getItem('intelart-lang') || 'fr');

/* ═══════════════════════════════════════
 CONTENT — FR / EN
═══════════════════════════════════════ */
const C = {
fr: {
nav: { home:'Accueil', about:'À propos', services:'Services', offers:'Offres', secteurs:'Secteurs', contact:'Contact', cta:'Réserver un échange' },
ddOffres: [
{icon:'bolt',label:'Sprint IA',page:'offre-sprint'},
{icon:'search',label:'Audit IA',page:'offre-audit'},
{icon:'compass',label:'Consulting',page:'offre-consulting'},
{icon:'cpu',label:'Agent IA Personnalisé',page:'offre-agent'},
{icon:'custom',label:'Sur Mesure',page:'offre-surmesure'}
],
ddSecteurs: [
{icon:'users',label:'Recrutement',page:'secteur-recrutement'},
{icon:'chart',label:'Finance',page:'secteur-finance'},
{icon:'box',label:'Opérations',page:'secteur-operations'},
{icon:'home',label:'Immobilier',page:'secteur-immobilier'},
{icon:'shield',label:'Juridique',page:'secteur-juridique'},
{icon:'heart',label:'Santé',page:'secteur-sante'}
],
meta: {
home:{title:'Intelart — Agence IA pour PME B2B au Canada',desc:'Automatisez vos processus et mettez en place un premier système IA concret en 1 à 2 semaines. PME B2B, Ottawa, Canada.',keys:'agence IA Ottawa, automatisation PME, intelligence artificielle B2B, sprint IA, consulting IA Canada'},
about:{title:'À propos — Intelart | IA appliquée pour PME B2B',desc:'Découvrez Intelart : une approche directe, des résultats concrets en IA appliquée pour les PME B2B au Canada.',keys:'Intelart, agence IA Ottawa, IA appliquée PME, fondateur, équipe IA Canada'},
services:{title:'Services — Intelart | Audit, Automatisation, IA',desc:'Audit IA, structuration, automatisation, systèmes IA, accompagnement et conseil. Six services concrets pour PME B2B.',keys:'audit IA, automatisation processus, agent IA, consulting IA, structuration données, accompagnement PME'},
offers:{title:'Offres — Intelart | Sprint IA en 1-2 semaines',desc:'Sprint IA, Audit, Consulting, Agent IA et projets sur mesure. Un résultat concret sans projet lourd.',keys:'sprint IA, audit IA, consulting IA, agent IA OpenClaw, projet sur mesure, tarifs IA PME'},
contact:{title:'Contact — Intelart | Parlons de votre projet IA',desc:'Contactez Intelart pour un échange de 20 minutes. Réponse sous 24h. Ottawa, Canada.',keys:'contact Intelart, rendez-vous IA, consultation gratuite, Ottawa Canada'},
'offre-sprint':{title:'Sprint IA — Intelart | Premier système IA en 10 jours',desc:'Sprint IA : audit, cadrage, prototype et livraison en 1-2 semaines. Résultat concret garanti. Ottawa, Canada.'},
'offre-audit':{title:'Audit IA — Intelart | Diagnostic en 3-5 jours',desc:'Audit complet de vos processus avec rapport d\'opportunités IA classées par impact. Feuille de route priorisée.'},
'offre-consulting':{title:'Consulting IA — Intelart | Sessions stratégiques',desc:'Conseil en transformation digitale orientée IA. Architecture cible et plan de déploiement. Ottawa, Canada.'},
'offre-agent':{title:'Agent IA Personnalisé — Intelart | Technologie OpenClaw',desc:'Agent IA sur mesure déployé sur votre infrastructure. Propulsé par OpenClaw. Devis personnalisé.'},
'offre-surmesure':{title:'Sur Mesure — Intelart | Projet personnalisé',desc:'Développement spécifique, intégration complexe, automatisation avancée. Devis gratuit sous 48h.'},
'secteur-recrutement':{title:'IA pour le Recrutement — Intelart',desc:'Qualifiez 3x plus de candidats sans agrandir votre équipe. Automatisation du tri CV et des relances.'},
'secteur-finance':{title:'IA pour les Services Financiers — Intelart',desc:'Automatisez vos rapports clients et libérez vos conseillers. 80% de temps économisé.'},
'secteur-operations':{title:'IA pour les Opérations — Intelart',desc:'Centralisez votre suivi et éliminez les erreurs manuelles. Dashboard centralisé + alertes intelligentes.'},
'secteur-immobilier':{title:'IA pour l\'Immobilier — Intelart',desc:'Automatisez votre suivi client, ne perdez plus un lead. CRM automatisé + relances personnalisées.'},
'secteur-juridique':{title:'IA pour le Juridique — Intelart',desc:'Structurez vos dossiers et ne ratez plus une deadline. Alertes + assistance recherche documentaire.'},
'secteur-sante':{title:'IA pour la Santé — Intelart',desc:'Moins d\'administratif, plus de temps pour vos patients. Automatisation RDV + rappels + suivi.'},
'logos':{title:'Variantes Logo — Intelart',desc:'Propositions de logos pour Intelart. 5 variantes SVG à valider.'},
'privacy':{title:'Politique de confidentialité — Intelart',desc:'Politique de confidentialité d\'Intelart. Protection de vos données personnelles.',keys:'politique confidentialité, données personnelles, LPRPDE, Intelart'}
},
home: {
badge:'Agence IA · Ottawa, Canada',
h1:'Éliminez 10h de tâches manuelles\npar semaine — en 10 jours',
sub:'Vos équipes perdent du temps sur des tâches à faible valeur. On identifie votre meilleur cas d\'usage IA, on le construit et on le livre — en 10 jours, sans engagement. PME B2B à Ottawa et partout au Canada.',
cta1:'Réserver 20 min — gratuit', cta2:'Voir nos offres',
trust:['6+ ans en B2B','3 continents','IA depuis 2022','Résultat en 10 jours'],
stats:[
  {num:'6',suffix:'+',lab:'ans d\'expérience B2B',prefix:''},
  {num:'10',suffix:'',lab:'jours pour un premier résultat',prefix:''},
  {num:'3',suffix:'',lab:'marchés internationaux',prefix:''},
  {num:'100',suffix:'%',lab:'focus exécution',prefix:''}
],
probEye:'Le constat', probH2:'Ce qui vous freine vraiment avec l\'IA',
probIntro:'Vous savez que l\'IA peut accélérer votre quotidien. Mais les obstacles sont réels. Voici ce que vivent nos clients avant de nous contacter.',
probCta:'Voir comment on y répond →',
probItems:[
  {icon:'clock',color:'red',title:'Trop d\'options, pas de direction',desc:'ChatGPT, Copilot, Claude… Tout le monde en parle, mais par où commencer vraiment ?'},
  {icon:'loop',color:'red',title:'Les projets IA s\'éternisent',desc:'6 mois pour un pilote, et toujours pas de décision. L\'IA devient une dépense, pas un atout.'},
  {icon:'team',color:'red',title:'Pas de compétences IA en interne',desc:'Recruter un expert ? Trop cher et trop lent. Il faut externaliser l\'expertise, intelligemment.'},
  {icon:'money',color:'red',title:'Peur de mal investir',desc:'Les technos changent tous les 3 mois. Une approche pragmatique d\'abord, infrastructure plus tard.'},
],
wwdEye:'Notre approche', wwdH2:'Ce que nous faisons concrètement',
wwdSub:'Pas de grands discours. Des actions concrètes qui produisent un premier résultat visible.',
wwdItems:[
  {num:'01',title:'Remettre de l\'ordre',desc:'Identifier les frictions, clarifier les étapes, améliorer la lisibilité des processus.'},
  {num:'02',title:'Réduire les tâches manuelles',desc:'Cibler les flux qui coûtent le plus de temps et les automatiser simplement.'},
  {num:'03',title:'Identifier le bon cas d\'usage',desc:'Trouver ce qui a le plus d\'impact pour votre activité spécifique.'},
  {num:'04',title:'Livrer une première solution',desc:'Déployer une automatisation ou un premier système IA utile et compréhensible.'},
],
procEye:'La méthode', procH2:'Comment ça se passe',
procSub:'4 phases, 10 jours maximum. Chaque étape a un objectif clair et un livrable.',
procSteps:[
  {day:'Jour 1',title:'Cadrage',desc:'Objectifs, contraintes, outils, critères de succès.',icon:'scope'},
  {day:'J 2–3',title:'Diagnostic',desc:'Observation du workflow + identification des opportunités.',icon:'diag'},
  {day:'J 4–6',title:'Prototype',desc:'Construction + itérations rapides avec vous.',icon:'build'},
  {day:'J 7–10',title:'Livraison',desc:'Démo + docs + plan de déploiement + KPI.',icon:'deliver'},
],
ucEye:'Cas concrets', ucH2:'L\'IA appliquée à votre secteur',
ucSub:'Quelques exemples de ce que nous livrons en un Sprint IA.',
useCases:[
  {tag:'Recrutement',tagColor:'blue',problem:'3h/jour à trier les CV et relancer les candidats',solution:'Qualificateur automatique + relances programmées',result:'2x à 3x plus de dossiers traités',link:'secteur-recrutement',
   svgBg:'rgba(59,130,246,.06)',svgStroke:'#3B82F6'},
  {tag:'Services financiers',tagColor:'cyan',problem:'Rapports clients générés à la main (3-5h/rapport)',solution:'Génération automatique depuis les données internes',result:'70-80% de temps économisé',link:'secteur-finance',
   svgBg:'rgba(6,182,212,.06)',svgStroke:'#06B6D4'},
  {tag:'Opérations',tagColor:'green',problem:'Suivi sur 3 outils différents, erreurs fréquentes',solution:'Dashboard centralisé + alertes intelligentes',result:'Visibilité temps réel, erreurs quasi éliminées',link:'secteur-operations',
   svgBg:'rgba(16,185,129,.06)',svgStroke:'#10B981'}
],
benEye:'Ce que vous obtenez', benH2:'Des résultats mesurables',
benItems:[
  {icon:'down',label:'Moins de tâches manuelles',sub:'Ciblées et automatisées'},
  {icon:'clear',label:'Plus de clarté',sub:'Processus lisibles'},
  {icon:'check',label:'Meilleur suivi',sub:'Rien ne tombe'},
  {icon:'ai',label:'Système IA concret',sub:'En production'},
  {icon:'next',label:'Base pour avancer',sub:'Évolutive'},
],
ctaH2:'Prêt à démarrer ?', ctaSub:'Réservez 20 minutes pour voir si votre situation est un bon candidat. Pas de pitch, pas d\'engagement.', ctaBtn:'Réserver un échange de 20 minutes',
socialEye:'Résultats clients', socialH2:'Ils nous font confiance',
testimonials:[
  {stars:5,quote:'Grâce à l\'automatisation mise en place, nous avons réduit de 60% le temps de qualification de nos leads export. Le ROI a été visible dès le premier mois.',author:'Directeur commercial',company:'Automium'},
  {stars:5,quote:'La digitalisation de nos processus internes a transformé notre façon de travailler. Moins de papier, moins d\'erreurs, et une visibilité en temps réel sur toute la chaîne.',author:'Directeur des opérations',company:'Getcomar'},
  {stars:5,quote:'L\'intégration de l\'IA dans notre workflow de média planning nous a permis de traiter 3x plus de briefs clients sans augmenter l\'équipe.',author:'Responsable digital',company:'Intelcia Digital Advertising'},
  {stars:5,quote:'En 10 jours, nos relances clients étaient automatisées et notre taux de conversion a augmenté de 40%. Du concret, pas du PowerPoint.',author:'Directeur général',company:'Webfy Corp Limited'}
],
credBar:['Ottawa, Canada','6+ ans de terrain B2B','Ex Havas · Publicis · GroupeM','Bilingue FR/EN','IA appliquée depuis 2022'],
},
about: {
eye:'À propos', h1:'6 ans de terrain B2B.\n3 ans d\'IA appliquée.',
intro:'Intelart est née d\'un constat simple : les PME B2B ont besoin de résultats concrets avec l\'IA, pas de consulting théorique. Fondée par un professionnel du développement commercial et de la digitalisation avec +6 ans d\'expérience sur 3 continents.',
h2b:'Qui est derrière Intelart',
body:'Avant de fonder Intelart, j\'ai passé 6 ans sur le terrain — développement commercial, gestion de grands comptes, stratégie digitale et marketing — pour des entreprises B2B en France, au Maroc et au Canada.\n\nJ\'ai travaillé avec des groupes comme Havas Media, Publicis et GroupeM chez Intelcia Digital Advertising. J\'ai géré l\'export et les comptes clés chez Automium. J\'ai piloté des équipes commerciales chez H&R Call.\n\nQuand les LLMs sont arrivés fin 2022, j\'ai été parmi les premiers à les utiliser pour le business development — prospection, qualification, automatisation des relances. Les résultats étaient si concrets que j\'ai décidé de structurer cette expertise pour d\'autres PME.',
philTitle:'Ce que je crois',
values:[
  {icon:'bulb',title:'L\'IA doit servir le business',desc:'Pas la tech pour la tech. Si ça ne fait pas gagner du temps ou de l\'argent, on ne le fait pas.'},
  {icon:'star',title:'Terrain avant théorie',desc:'6 ans de vente B2B m\'ont appris que seuls les résultats comptent. Pas les rapports.'},
  {icon:'pulse',title:'Commencer là où vous êtes',desc:'Pas besoin d\'être "digital ready". On part de votre réalité, pas d\'un idéal.'},
  {icon:'tick',title:'Prouver avant de vendre',desc:'Un premier résultat concret en 10 jours. Ensuite, vous décidez librement.'},
],
founderTitle:'Le mot du fondateur',
founderText:'J\'ai vendu, prospecté et géré des comptes clés pendant 6 ans — en France, au Maroc et au Canada. Quand ChatGPT est arrivé fin 2022, j\'ai immédiatement vu ce que l\'IA pouvait changer dans le quotidien commercial des PME. Pas dans 5 ans. Maintenant. J\'ai automatisé ma propre prospection, puis celle de mes clients. Intelart, c\'est cette expertise packagée : on prend vos vrais problèmes opérationnels et on les résout avec l\'IA — rapidement, sans jargon, avec des résultats mesurables dès la deuxième semaine.',
h2c:'Notre manière de travailler',
wIntro:'Nous fonctionnons par sprints courts, avec un périmètre clair dès le départ. Pas de surprise, pas de dérive.',
steps:[
  {title:'Écouter avant de proposer',desc:'Comprendre votre situation réelle — pas ce que vous "devriez" faire, mais ce qui vous freine aujourd\'hui.'},
  {title:'Cibler le cas d\'usage à plus fort impact',desc:'Identifier la tâche qui vous coûte le plus de temps et qui est automatisable rapidement.'},
  {title:'Livrer en 10 jours',desc:'Construire et déployer une solution fonctionnelle dans votre environnement réel.'},
  {title:'Vous rendre autonome',desc:'Former votre équipe. Le système vous appartient. Pas de dépendance.'},
],
diffTitle:'Pourquoi Intelart ?',
diffs:[
  {vs:'VS Grand cabinet',title:'Terrain, pas théorie',desc:'J\'ai vendu sur le terrain pendant 6 ans. Je livre un système qui tourne, pas un PowerPoint de 200 pages.'},
  {vs:'VS Faire en interne',title:'Opérationnel en 1 semaine',desc:'Recruter un expert IA prend 3-6 mois et coûte 80K+/an. Je démarre dans la semaine.'},
  {vs:'VS Agence IA généraliste',title:'Spécialiste PME B2B',desc:'Je connais vos défis — prospection, qualification, suivi client — parce que je les ai vécus.'},
  {vs:'VS Ne rien faire',title:'Vos concurrents avancent',desc:'Chaque mois sans automatisation, c\'est du temps perdu pendant que d\'autres s\'adaptent.'}
],
tlTitle:'Le parcours',
timeline:[
  {year:'2018',text:'Début en développement commercial et digitalisation B2B — management d\'équipes de vente, stratégie commerciale multi-canal (France, Maroc).'},
  {year:'2020',text:'Sales Engineer chez Intelcia Digital Advertising — média planning TV (BFM, RMC), gestion de groupes (Havas Media, Publicis, GroupeM), campagnes Google & Social.'},
  {year:'2022',text:'Key Account & Export Manager chez Automium — grands comptes B2B, commerce de gros, prospection internationale. Adoption précoce des LLMs (ChatGPT) pour le business development.'},
  {year:'2024',text:'Fondation d\'Intelart à Ottawa — premiers projets d\'automatisation IA pour PME B2B canadiennes.'},
  {year:'2025',text:'Structuration de l\'offre Sprint IA. Spécialisation : résultats concrets en 10 jours.'},
  {year:'2026',text:'Lancement d\'OpenClaw — technologie d\'agents IA propriétaire. Expansion marchés francophones.'}
],
ctaH2:'Discutons de votre situation', ctaSub:'20 minutes pour voir si l\'IA peut concrètement vous faire gagner du temps. Sans engagement.', ctaBtn:'Réserver un échange',
},
services: {
eye:'Nos services', h1:'Ce que nous\nfaisons concrètement',
intro:'Six services complémentaires, tous orientés résultat. On choisit ensemble ce qui est pertinent pour votre situation.',
items:[
  {icon:'svc-audit',color:'blue',tag:'Diagnostic',title:'Audit IA et diagnostic opérationnel',desc:'Identifier les tâches répétitives, les pertes de temps et les opportunités concrètes d\'automatisation dans votre fonctionnement actuel.',deliv:'Rapport structuré avec diagnostics, opportunités classées par impact, feuille de route.',more:'offre-audit'},
  {icon:'svc-struct',color:'cyan',tag:'Structuration',title:'Structuration et optimisation de processus',desc:'Remettre de l\'ordre dans les flux internes, clarifier les étapes, améliorer le suivi et réduire les frictions qui ralentissent.',deliv:'Documentation des processus, modèles opérationnels ajustés, guide d\'intégration IA.',more:'offre-sprint'},
  {icon:'svc-auto',color:'blue',tag:'Automatisation',title:'Automatisation simple et utile',desc:'Mettre en place des automatisations pragmatiques qui réduisent le travail manuel sans créer d\'usine à gaz.',deliv:'Système automatisé testé, documentation des flux, formation de votre équipe.',more:'offre-sprint'},
  {icon:'svc-ia',color:'green',tag:'IA opérationnelle',title:'Mise en place d\'un premier système IA',desc:'Concevoir et déployer un premier usage IA opérationnel, concret et compréhensible. Pas une démo — un système qui tourne.',deliv:'Système IA déployé, démo enregistrée, plan de déploiement et protocole d\'amélioration.',more:'offre-sprint'},
  {icon:'svc-accom',color:'cyan',tag:'Accompagnement',title:'Accompagnement d\'implémentation',desc:'Aider l\'entreprise à stabiliser, améliorer et faire évoluer les premières briques mises en place.',deliv:'Suivi hebdomadaire, révisions, nouvelles automatisations, support réactif.',more:'offre-consulting'},
  {icon:'svc-consult',color:'blue',tag:'Conseil',title:'Conseil en transformation digitale orientée IA',desc:'Aider les dirigeants à faire les bons choix technologiques sans se perdre dans le bruit du marché.',deliv:'Plan stratégique d\'intégration IA, feuille de route, architecture cible validée.',more:'offre-consulting'},
],
ctaH2:'Un service vous correspond ?', ctaSub:'Parlons de votre situation et voyons ce qui est pertinent.', ctaBtn:'Réserver un échange de 20 minutes',
},
offers: {
eye:'Nos offres', h1:'Un sprint court,\nun résultat concret',
intro:'Pas de projet long et coûteux dès le départ. On commence par quelque chose de petit et utile, puis on décide ensemble de la suite.',
badges:['Offre principale','1 à 2 semaines'],
mainTitle:'Sprint IA de structuration\net d\'automatisation',
mainDesc:'En 1 à 2 semaines, nous aidons les PME B2B à réduire les tâches manuelles répétitives, mieux structurer leur fonctionnement, et mettre en place un premier système IA simple, utile et concret.',
blocks:[
  {title:'Pour qui',items:['PME B2B avec des tâches répétitives','Structures avec suivi interne peu organisé','Entreprises voulant un premier résultat concret','Sans vouloir lancer un projet lourd dès le départ'],type:'dot'},
  {title:'Ce que comprend le sprint',items:['Audit ciblé de votre workflow actuel','Cadrage du besoin prioritaire','Choix du cas d\'usage le plus utile','Première automatisation ou système IA concret','Restitution claire avec prochaines étapes'],type:'check'},
  {title:'Ce que vous obtenez',items:['Un diagnostic utile de votre situation','Un périmètre clair et validé','Un premier livrable concret et fonctionnel','Une base simple pour continuer ensuite'],type:'check'},
  {title:'Ce que ce n\'est pas',items:['Pas une transformation complète immédiate','Pas un projet technique lourd','Pas une promesse d\'automatisation totale','Pas un engagement long terme obligatoire'],type:'cross'},
],
ctaH3:'Prêt à tester l\'IA sur un cas concret ?',
ctaSub:'Prenons 20 minutes pour voir si votre situation est un bon candidat.',
ctaBtn:'Réserver un échange de 20 minutes',
micro:'Pas d\'engagement long terme. Diagnostic inclus.',
reassure:'Nous nous engageons sur un résultat concret en 1-2 semaines. Votre diagnostic initial est sans engagement.',
faqTitle:'Questions fréquentes',
faqs:[
  {q:'Nous ne sommes pas une tech company. L\'IA, c\'est vraiment pour nous ?',a:'L\'IA n\'est pas réservée aux technologues. C\'est un outil pour traiter plus d\'information, plus vite, sans augmenter votre équipe. Votre métier ne change pas. Votre façon de traiter l\'information s\'améliore.'},
  {q:'Ça prend des mois à mettre en place. Nous n\'avons pas le temps.',a:'Un Sprint IA, c\'est 1-2 semaines. Pas 6 mois. On cible un problème précis, pas une "transformation numérique" générale. Vous voyez les résultats, ensuite vous décidez.'},
  {q:'Et si ça ne fonctionne pas avec nos données ?',a:'On teste avant de déployer. Vous fournissez un échantillon réel. On valide que le système fonctionne sur votre contexte exact. S\'il y a un problème, on l\'ajuste sur place.'},
  {q:'Après le Sprint, vous partez. On fait comment ensuite ?',a:'Après le Sprint, vous avez un système, une documentation, et une équipe formée. Le système n\'est pas une boîte noire. C\'est du code et du processus que vos gens comprennent.'},
],
posTitle:'Pourquoi Intelart plutôt qu\'en interne ou un grand cabinet ?',
posBody:'Un grand cabinet livrera un rapport. Faire ça en interne requiert du temps et des compétences rares. Intelart : on évalue votre problème, on livre un système qui tourne en 2 semaines, on forme vos équipes, vous décidez sur des résultats réels.',
secoTitle:'Suites possibles', secoSub:'Après le premier sprint, si cela devient pertinent :',
secoItems:[
  {tag:'Continuité',title:'Accompagnement d\'implémentation',desc:'Stabiliser, améliorer et faire évoluer les premières briques.'},
  {tag:'Extension',title:'Automatisations complémentaires',desc:'Identifier et automatiser d\'autres flux à valeur ajoutée.'},
  {tag:'Avancé',title:'Assistant interne / Agent IA',desc:'Mettre en place un agent IA interne si le besoin le justifie.'},
],
},
contact: {
eye:'Contact', h1:'Parlons de\nvotre besoin',
intro:'Vous voulez voir si cette offre est adaptée à votre entreprise ? Prenons 20 minutes pour en parler.',
h2:'Prendre contact', sub:'Pas de formulaire qui va dans un vide. Vous recevrez une réponse sous 24 heures ouvrables.',
info:[
  {icon:'mail',label:'Email',val:'contact@intelart.ca',href:'mailto:contact@intelart.ca'},
  {icon:'phone',label:'Téléphone',val:'+1 613 261 8709'},
  {icon:'pin',label:'Localisation',val:'Ottawa, Ontario, Canada'},
  {icon:'cal',label:'Prise de rendez-vous',val:'Réserver directement →',href:'https://cal.com/intelart/echange-decouverte-discovery-call'},
],
nextTitle:'Ce qui se passe après',
nextList:['Réponse sous 24h ouvrables','Échange de 20 minutes sans engagement','On évalue ensemble si c\'est pertinent','Si oui : proposition claire et cadrage rapide'],
formTitle:'Envoyer un message',
formSub:'Décrivez brièvement votre situation et nous reviendrons vers vous rapidement.',
fn:'Prénom',ln:'Nom',em:'Email professionnel',co:'Entreprise',nd:'Votre besoin principal',msg:'Message',
submitBtn:'Envoyer le message', sendingBtn:'Envoi en cours...',
successMsg:'✓ Message envoyé avec succès ! Nous vous répondrons sous 24 heures ouvrables.',
selectOpts:['Sélectionner...','Réduire les tâches manuelles répétitives','Structurer mes processus internes','Mettre en place un premier système IA','Automatiser un flux spécifique','Conseil en transformation digitale','Autre / je ne sais pas encore'],
taph:'Décrivez brièvement votre situation, votre activité, et ce que vous cherchez à améliorer.',
errRequired:'Ce champ est requis',
errEmail:'Veuillez entrer un email valide',
},
footer: {
tagline:'Solutions IA concrètes et opérationnelles pour PME B2B au Canada.',
cta:'Réserver un échange',
navTitle:'Navigation', svcTitle:'Services', ctTitle:'Contact',
navLinks:[{l:'Accueil',p:'home'},{l:'À propos',p:'about'},{l:'Services',p:'services'},{l:'Offres',p:'offers'},{l:'Contact',p:'contact'}],
svcLinks:['Audit IA','Structuration','Automatisation','Systèmes IA','Accompagnement','Consulting'],
ctLinks:['contact@intelart.ca','+1 613 261 8709','Ottawa, Canada','Réserver un rendez-vous'],
copy:'© 2026 Intelart. Tous droits réservés.',
right:'Ottawa, Canada · Solutions IA pour PME B2B',
},
sectors: {
badges:['Ottawa, Canada','Sans engagement'],
painTitle:'Vous reconnaissez-vous ?',
delivTitle:'Ce qu\'on livre',
beforeLabel:'Avant',afterLabel:'Après',
processTitle:'Comment ça marche',
procSteps:[{day:'Jour 1',title:'Cadrage',icon:'scope'},{day:'J 2–3',title:'Diagnostic',icon:'diag'},{day:'J 4–6',title:'Prototype',icon:'build'},{day:'J 7–10',title:'Livraison',icon:'deliver'}],
ctaCal:'Réserver un échange gratuit de 20 min',
ctaPay:'Démarrer maintenant — 5 000 $CA',
trustBadges:['🔒 Paiement sécurisé SSL','↩ Remboursé si insatisfait 48h','🇨🇦 Ottawa, Canada'],
faqTitle:'Questions fréquentes',
ctaH2:'Prêt à automatiser votre quotidien ?',ctaSub:'20 minutes pour voir si votre situation est un bon candidat.',ctaFinal:'Réserver un échange gratuit',
list: {
  recrutement:{
    h1:'Qualifiez 3x plus de candidats\nsans agrandir votre équipe',
    sub:'Arrêtez de passer 3h par jour à trier des CV. L\'IA qualifie, relance et organise vos candidatures automatiquement.',
    pains:[
      {title:'3h/jour à trier les CV',desc:'Tri manuel de chaque candidature, copier-coller entre outils, relance oubliée.'},
      {title:'Relances candidats oubliées',desc:'Les bons candidats partent parce qu\'on met trop de temps à répondre.'},
      {title:'Pipeline dispersé sur plusieurs outils',desc:'ATS, email, Excel — l\'information est partout et nulle part.'}
    ],
    solution:'Qualificateur automatique de candidatures + relances auto',
    before:['Tri manuel de chaque CV','Relances oubliées ou en retard','Pipeline dispersé sur 3 outils','Candidats perdus entre les mailles'],
    after:['Pré-qualification IA instantanée','Relances automatiques personnalisées','Pipeline centralisé et structuré','Zéro candidat oublié'],
    metrics:[{num:'3x',lab:'plus de dossiers traités'},{num:'0',lab:'candidat perdu'}],
    faqs:[
      {q:'On utilise déjà un ATS, ça va fonctionner avec ?',a:'Oui. On s\'intègre à vos outils existants — pas de remplacement forcé. L\'IA vient en complément de votre ATS.'},
      {q:'Est-ce que l\'IA peut vraiment comprendre nos critères métier ?',a:'On configure les critères ensemble lors du cadrage. L\'IA apprend vos grilles d\'évaluation spécifiques.'},
      {q:'Combien de temps pour mettre ça en place ?',a:'Un Sprint IA de 10 jours. Vous avez un système fonctionnel et votre équipe formée à la fin.'}
    ]
  },
  finance:{
    h1:'Automatisez vos rapports clients,\nlibérez vos conseillers',
    sub:'Arrêtez de passer 4 heures par rapport client. L\'IA génère, structure et met en forme vos rapports automatiquement.',
    pains:[
      {title:'4h par rapport client',desc:'Aller-retour entre systèmes, mise en forme manuelle, vérifications interminables.'},
      {title:'Données dispersées',desc:'CRM, comptabilité, portefeuille — tout est dans des systèmes différents.'},
      {title:'L\'admin ronge le temps conseil',desc:'Vos conseillers passent plus de temps en administratif qu\'avec les clients.'}
    ],
    solution:'Génération automatique de rapports depuis données internes',
    before:['4h par rapport, à la main','Données dans 3 systèmes différents','Mises en forme incohérentes','Conseillers noyés dans l\'admin'],
    after:['Rapports générés en minutes','Données centralisées automatiquement','Format professionnel unifié','Conseillers libérés pour le conseil'],
    metrics:[{num:'80%',lab:'de temps économisé'},{num:'3x',lab:'plus de rapports/semaine'}],
    faqs:[
      {q:'Nos données sont confidentielles — comment vous les protégez ?',a:'Tout reste sur vos systèmes. L\'IA traite les données en local ou sur un cloud dédié. On ne stocke rien chez nous.'},
      {q:'L\'IA peut-elle s\'adapter à nos formats de rapports existants ?',a:'Oui. On configure les templates sur vos formats actuels. Le résultat ressemble exactement à ce que vous produisez déjà.'},
      {q:'Quid de la conformité réglementaire ?',a:'On travaille dans le cadre de vos exigences. Chaque rapport reste vérifié par votre équipe avant envoi.'}
    ]
  },
  operations:{
    h1:'Centralisez votre suivi,\néliminez les erreurs manuelles',
    sub:'Arrêtez de jongler entre 3 outils avec des erreurs à chaque étape. Un dashboard centralisé avec des alertes intelligentes.',
    pains:[
      {title:'Suivi sur 3 outils, erreurs fréquentes',desc:'Chaque transfert de données entre outils crée des erreurs et des pertes.'},
      {title:'Alertes manquées, retards non anticipés',desc:'Les problèmes sont détectés trop tard, quand le mal est déjà fait.'},
      {title:'Rapports de statut manuels',desc:'Des heures perdues à compiler des données pour des réunions de suivi.'}
    ],
    solution:'Dashboard centralisé + alertes intelligentes + rapports auto',
    before:['3 outils non connectés','Erreurs de saisie fréquentes','Alertes manquées','Rapports manuels chaque semaine'],
    after:['Un seul dashboard unifié','Saisie automatique sans erreurs','Alertes proactives en temps réel','Rapports générés automatiquement'],
    metrics:[{num:'~0',lab:'erreurs de suivi'},{num:'100%',lab:'visibilité temps réel'}],
    faqs:[
      {q:'On a des systèmes legacy — vous pouvez vous y connecter ?',a:'Oui. On se connecte via API, exports automatiques ou scraping sécurisé selon vos systèmes. Même les outils anciens.'},
      {q:'Est-ce que ça nécessite de changer nos outils actuels ?',a:'Non. On construit une couche par-dessus vos outils existants. Aucun changement de workflow pour vos équipes.'},
      {q:'Quel volume de commandes minimum pour que ça vaille le coup ?',a:'Dès 50+ commandes/semaine, l\'automatisation est rentable. On évalue votre cas précis lors du cadrage.'}
    ]
  },
  immobilier:{
    h1:'Automatisez votre suivi client,\nne perdez plus un lead',
    sub:'Chaque lead non relancé est une vente perdue. Automatisez le suivi, les relances et la qualification de vos prospects.',
    pains:[
      {title:'Suivi clients dispersé',desc:'Leads dans l\'email, le téléphone, le CRM — impossible de tout suivre.'},
      {title:'Trop de temps administratif',desc:'Paperasse, relances, mises à jour manuelles — pas assez de temps pour les visites.'},
      {title:'Leads qui tombent dans l\'oubli',desc:'Après le premier contact, 60% des leads ne sont jamais relancés.'}
    ],
    solution:'CRM automatisé + relances personnalisées + suivi systématique',
    before:['Leads éparpillés partout','Relances oubliées ou tardives','Suivi manuel chronophage','Prospects perdus après 1er contact'],
    after:['Tous les leads au même endroit','Relances automatiques personnalisées','Suivi systématique sans effort','Zéro lead oublié'],
    metrics:[{num:'0',lab:'lead perdu'},{num:'2x',lab:'plus de temps pour les visites'}],
    faqs:[
      {q:'Je travaille seul(e) — c\'est fait pour moi aussi ?',a:'Justement. C\'est quand on est seul que l\'automatisation a le plus d\'impact. L\'IA fait le travail d\'un assistant.'},
      {q:'Est-ce que ça s\'intègre avec mes outils immobiliers actuels ?',a:'Oui. On s\'adapte à vos outils (Centris, MLS, etc.) et on construit par-dessus.'},
      {q:'Combien de temps ça prend à configurer ?',a:'10 jours maximum avec le Sprint IA. Votre système est fonctionnel et votre équipe formée.'}
    ]
  },
  juridique:{
    h1:'Structurez vos dossiers,\nne ratez plus une deadline',
    sub:'Les deadlines manquées et les heures perdues en recherche documentaire coûtent cher. Structurez tout, automatiquement.',
    pains:[
      {title:'Gestion dossiers chronophage',desc:'Créer, classer, retrouver — chaque dossier prend un temps fou.'},
      {title:'Facturation et suivi des heures laborieux',desc:'Saisir les heures, générer les factures, relancer — que du manuel.'},
      {title:'Recherche documentaire lente',desc:'Trouver le bon précédent ou la bonne clause prend des heures.'}
    ],
    solution:'Structuration dossiers + alertes deadlines + assistance recherche',
    before:['Dossiers désorganisés','Deadlines manquées','Heures mal saisies','Recherche manuelle longue'],
    after:['Dossiers structurés automatiquement','Alertes deadlines proactives','Suivi des heures automatisé','Recherche assistée par IA'],
    metrics:[{num:'0',lab:'deadline manquée'},{num:'~50%',lab:'de temps gagné en recherche'}],
    faqs:[
      {q:'Confidentialité avocat-client — comment vous gérez ça ?',a:'Tout reste sur vos systèmes. On ne stocke rien. L\'IA traite en local. Conformité au secret professionnel garantie.'},
      {q:'L\'IA peut-elle aider sur la recherche jurisprudentielle ?',a:'Oui. On configure l\'IA pour rechercher dans vos bases documentaires internes et les sources publiques pertinentes.'},
      {q:'Est-ce compatible avec les exigences du Barreau ?',a:'On travaille dans le cadre de vos obligations déontologiques. L\'IA assiste, elle ne remplace pas le jugement professionnel.'}
    ]
  },
  sante:{
    h1:'Moins d\'administratif,\nplus de temps pour vos patients',
    sub:'Les rappels manuels et la paperasse volent du temps clinique. Automatisez le suivi pour vous concentrer sur vos patients.',
    pains:[
      {title:'Prises de RDV et rappels manuels',desc:'Appeler, confirmer, rappeler — une personne à temps plein juste pour ça.'},
      {title:'Dossiers patients difficiles à suivre',desc:'Notes éparpillées, historique incomplet, informations manquantes.'},
      {title:'L\'admin empiète sur le temps clinique',desc:'Chaque minute d\'admin est une minute en moins avec un patient.'}
    ],
    solution:'Automatisation RDV + rappels + suivi post-consultation',
    before:['Rappels manuels par téléphone','Dossiers patients incomplets','No-shows fréquents','Admin chronophage'],
    after:['Rappels SMS/email automatiques','Dossiers structurés et complets','No-shows réduits de 50-70%','Temps libéré pour les patients'],
    metrics:[{num:'-60%',lab:'de no-shows'},{num:'+2h',lab:'/jour de temps clinique'}],
    faqs:[
      {q:'Comment vous gérez la conformité LPRPDE / PIPEDA ?',a:'On respecte toutes les exigences LPRPDE/PIPEDA. Les données patients restent sur vos systèmes au Canada. Rien n\'est exporté.'},
      {q:'Est-ce que ça fonctionne avec nos logiciels de clinique ?',a:'On s\'intègre aux principaux logiciels de gestion clinique. On évalue la compatibilité lors du cadrage.'},
      {q:'Est-ce que les données patients restent au Canada ?',a:'Absolument. Hébergement canadien garanti. Aucune donnée ne quitte le territoire.'}
    ]
  }
}
},
offreSprint: {
tags:['Offre phare','1 à 2 semaines','Livré en 10 jours'],
h1:'Sprint IA — Un système IA\nfonctionnel livré en 10 jours',
sub:'On trouve votre meilleur cas d\'usage, on le construit et on vous le livre clé en main — avec docs et formation. Pas de pilote qui traîne, pas d\'engagement longue durée. Résultat garanti ou on recommence.',
incTitle:'Ce que comprend le Sprint',
includes:[
  {title:'Audit ciblé de votre workflow actuel',desc:'Analyse de vos processus pour trouver les opportunités.'},
  {title:'Cadrage du besoin prioritaire',desc:'On identifie ensemble le cas d\'usage le plus impactant.'},
  {title:'Choix du cas d\'usage le plus utile et réaliste',desc:'Faisabilité + impact, pas de promesses creuses.'},
  {title:'Construction d\'une première automatisation ou système IA',desc:'Un livrable concret, pas un PowerPoint.'},
  {title:'Restitution avec documentation et prochaines étapes',desc:'Tout est documenté et transférable à vos équipes.'},
  {title:'Formation de votre équipe',desc:'Votre équipe comprend et peut maintenir le système.'}
],
forTitle:'Pour qui c\'est fait',
forItems:['PME B2B avec des tâches répétitives chronophages','Structures dont le suivi interne manque d\'organisation','Entreprises qui veulent un premier résultat IA concret','Dirigeants qui veulent tester avant de s\'engager','Équipes sans compétences IA en interne','Organisations fatiguées des projets qui s\'éternisent'],
delivTitle:'Ce que vous obtenez à la fin',
deliverables:['Un diagnostic complet de votre situation','Un système IA fonctionnel et déployé','Une documentation claire et utilisable','Une formation pour votre équipe','Un plan pour les prochaines étapes','Des KPI pour mesurer l\'impact'],
price:'5 000 $CA',
priceSub:'Tout inclus — Résultat concret garanti ou on reprend',
ctaPay:'Démarrer le Sprint',
ctaCal:'Réserver un échange gratuit',
trustBadges:['🔒 Paiement sécurisé SSL','↩ Remboursement sous 48h si insatisfait','🇨🇦 Entreprise canadienne, Ottawa'],
faqTitle:'Questions fréquentes',
faqs:[
  {q:'Combien de temps dure exactement le Sprint ?',a:'Entre 7 et 10 jours ouvrables. On cadre le périmètre ensemble au Jour 1, et on livre au plus tard le Jour 10.'},
  {q:'Et si mon cas d\'usage ne convient pas à un Sprint ?',a:'On le détecte dès le cadrage au Jour 1. Si votre besoin nécessite un format différent, on vous oriente vers l\'offre adaptée — sans facturer le Sprint.'},
  {q:'Je ne suis pas technique. C\'est un problème ?',a:'Pas du tout. On traduit le technique en langage métier. Votre équipe n\'a pas besoin de coder — elle doit comprendre comment utiliser le système.'},
  {q:'Qu\'est-ce qui se passe après le Sprint ?',a:'Vous avez un système fonctionnel + documentation + formation. Si vous voulez aller plus loin, on propose un accompagnement d\'implémentation. Mais aucune obligation.'}
],
ctaH2:'Prêt à voir l\'IA en action sur votre cas ?',ctaSub:'20 minutes pour évaluer si votre situation est un bon candidat.',ctaFinal:'Réserver un échange de 20 minutes'
},
offreAudit: {
tags:['Diagnostic','3 à 5 jours'],
h1:'Audit IA — Comprenez avant\nd\'agir',
sub:'Un diagnostic complet de vos processus avec un rapport d\'opportunités IA classées par impact et une feuille de route priorisée. Le point de départ idéal.',
incTitle:'Ce que comprend l\'Audit',
includes:[
  {title:'Analyse complète de vos processus actuels',desc:'On passe en revue chaque flux, chaque outil, chaque friction.'},
  {title:'Entretiens avec vos équipes clés',desc:'On écoute ceux qui font le travail au quotidien.'},
  {title:'Rapport d\'opportunités IA classées par impact',desc:'Chaque opportunité est évaluée en effort vs résultat.'},
  {title:'Feuille de route priorisée avec recommandations concrètes',desc:'Un plan d\'action clair, pas une liste de souhaits.'}
],
forTitle:'Pour qui c\'est fait',
forItems:['Entreprises qui veulent comprendre avant d\'agir','Dirigeants qui veulent une vision claire des opportunités IA','Structures qui hésitent entre plusieurs projets possibles','Organisations qui veulent un avis externe neutre'],
delivTitle:'Ce que vous obtenez à la fin',
deliverables:['Un rapport structuré complet','Une cartographie de vos processus','Des opportunités classées par impact et faisabilité','Une feuille de route actionnable','Des recommandations technologiques neutres','Un budget estimatif par opportunité'],
price:'2 500 $CA',
priceSub:'Livré en 3 à 5 jours — Rapport complet inclus',
ctaPay:'Commander l\'audit',
ctaCal:'En savoir plus',
trustBadges:['🔒 Paiement sécurisé SSL','↩ Remboursement sous 48h si insatisfait','🇨🇦 Entreprise canadienne, Ottawa'],
faqTitle:'Questions fréquentes',
faqs:[
  {q:'L\'audit me force-t-il à acheter autre chose après ?',a:'Non. Le rapport est un livrable autonome. Vous pouvez l\'utiliser en interne ou avec un autre prestataire. Aucune obligation.'},
  {q:'Combien de temps ça prend côté mon équipe ?',a:'On a besoin de 2-3 heures d\'entretiens au total avec vos équipes clés. Le reste du travail est de notre côté.'},
  {q:'Est-ce que l\'audit couvre aussi les outils existants ?',a:'Oui. On évalue vos outils actuels et comment l\'IA peut s\'y intégrer — ou les remplacer si pertinent.'},
  {q:'Je peux ensuite passer au Sprint IA ?',a:'Absolument. L\'audit est le point de départ idéal pour un Sprint. Le prix de l\'audit est souvent déduit du Sprint si vous enchaînez.'}
],
ctaH2:'Prêt à avoir une vision claire de vos opportunités IA ?',ctaSub:'On vous livre un diagnostic complet en 3 à 5 jours.',ctaFinal:'Réserver un échange'
},
offreConsulting: {
tags:['Stratégique','Demi-journée ou journée'],
h1:'Consulting IA — Décidez\nsur des bases solides',
sub:'Des sessions stratégiques pour vous aider à faire les bons choix technologiques, construire votre architecture cible et planifier votre déploiement IA.',
incTitle:'Ce que comprend la session',
includes:[
  {title:'Conseil en transformation digitale orientée IA',desc:'Vision claire de ce que l\'IA peut apporter à votre organisation.'},
  {title:'Aide aux choix technologiques',desc:'Couper à travers le bruit du marché pour des décisions éclairées.'},
  {title:'Architecture cible et plan de déploiement',desc:'Une roadmap technique réaliste, pas un schéma théorique.'},
  {title:'Vision claire, décisions éclairées',desc:'Vous repartez avec des réponses concrètes, pas plus de questions.'}
],
forTitle:'Pour qui c\'est fait',
forItems:['Dirigeants qui veulent décider sur des bases solides','CTO/CDO qui évaluent les options IA','Équipes de direction en réflexion stratégique','Entreprises en début de transformation digitale'],
delivTitle:'Ce que vous obtenez',
deliverables:['Un plan stratégique d\'intégration IA','Une architecture cible validée','Des recommandations technologiques','Un plan de déploiement à moyen terme','Des critères de sélection d\'outils','Un document de synthèse exploitable'],
price:'1 200 $CA',
priceSub:'par session · Demi-journée ou journée complète',
ctaCal:'Prendre rendez-vous',
trustBadges:['🇨🇦 Basé à Ottawa, Canada','🤝 Sans engagement','📋 Compte-rendu livré après chaque session'],
faqTitle:'Questions fréquentes',
faqs:[
  {q:'Quelle est la différence entre consulting et audit ?',a:'L\'audit analyse vos processus existants. Le consulting va plus loin : stratégie, architecture cible, choix d\'outils, et plan de déploiement à moyen terme.'},
  {q:'Combien de sessions faut-il prévoir ?',a:'Ça dépend de la complexité. Pour un cadrage stratégique initial, une session de journée suffit souvent. Pour un accompagnement plus poussé, 2-3 sessions espacées.'},
  {q:'Est-ce que vous vendez aussi l\'implémentation après ?',a:'On peut, mais ce n\'est pas obligatoire. Le consulting est un service autonome. Si vous implémentez en interne, nos recommandations restent valables.'},
  {q:'Quel est le format exact ?',a:'En personne à Ottawa ou en visioconférence. On commence par un brief de cadrage, puis travail collaboratif sur vos enjeux spécifiques.'}
],
ctaH2:'Besoin d\'une vision stratégique claire ?',ctaSub:'Prenons rendez-vous pour cadrer votre besoin.',ctaFinal:'Prendre rendez-vous'
},
offreAgent: {
tags:['Premium','Technologie OpenClaw','Infrastructure dédiée'],
h1:'Agent IA Personnalisé —\nVotre assistant IA interne',
sub:'Un agent IA conçu sur mesure, déployé sur votre infrastructure dédiée. Propulsé par la technologie OpenClaw. Pour les entreprises avec des besoins récurrents complexes.',
incTitle:'Ce qui est inclus',
includes:[
  {title:'Conception complète de l\'agent selon vos besoins',desc:'Architecture sur mesure, pas de solution générique.'},
  {title:'Développement et configuration personnalisée',desc:'Code propre, testé, documenté.'},
  {title:'Déploiement sur votre infrastructure ou cloud dédié',desc:'Vos données restent chez vous. Contrôle total.'},
  {title:'Formation complète de votre équipe',desc:'Votre équipe maîtrise l\'outil dès le premier jour.'}
],
forTitle:'Pour qui c\'est fait',
forItems:['Entreprises avec des besoins récurrents complexes','Organisations qui veulent leur propre assistant IA interne','Équipes qui traitent de gros volumes de données','Entreprises avec des exigences de confidentialité élevées'],
procTitle:'Comment ça se passe',
process:[
  {num:'1',title:'Analyse',desc:'On étudie vos besoins et votre infrastructure'},
  {num:'2',title:'Conception',desc:'Architecture de l\'agent et validation avec vous'},
  {num:'3',title:'Développement',desc:'Construction, tests, itérations'},
  {num:'4',title:'Déploiement',desc:'Mise en production + formation équipe'}
],
price:'Sur devis',
priceSub:'Projet personnalisé — Chaque agent est unique',
ctaCal:'Discuter de mon projet',
trustBadges:['🔧 Technologie OpenClaw','🏗️ Infrastructure dédiée','🇨🇦 Hébergement Canada disponible'],
faqTitle:'Questions fréquentes',
faqs:[
  {q:'Qu\'est-ce qu\'OpenClaw exactement ?',a:'OpenClaw est notre technologie propriétaire de création d\'agents IA. Elle permet de construire des assistants sur mesure qui s\'intègrent à vos systèmes existants.'},
  {q:'Mes données restent-elles confidentielles ?',a:'Absolument. L\'agent est déployé sur votre infrastructure ou un cloud dédié. Vos données ne transitent jamais par nos serveurs.'},
  {q:'Combien de temps pour un projet complet ?',a:'Ça dépend de la complexité. Comptez 4 à 8 semaines pour un agent standard. On vous donne une estimation précise après l\'analyse initiale.'},
  {q:'Quelle est la fourchette de prix ?',a:'Chaque projet est unique. On établit un devis détaillé après analyse de vos besoins. Contactez-nous pour un premier échange sans engagement.'}
],
ctaH2:'Prêt à avoir votre propre assistant IA ?',ctaSub:'Parlons de votre projet — 20 minutes, sans engagement.',ctaFinal:'Discuter de mon projet'
},
offreSurMesure: {
tags:['Personnalisé','Périmètre sur mesure'],
h1:'Projet sur mesure —\nOn construit ensemble',
sub:'Pour les besoins qui ne rentrent dans aucune case. Développement spécifique, intégration complexe, automatisation avancée — on étudie votre demande et on vous propose un cadrage adapté.',
procTitle:'Comment ça se passe',
process:[
  {num:'1',title:'Vous soumettez votre demande',desc:'Via le formulaire ci-dessous'},
  {num:'2',title:'On étudie votre projet',desc:'Analyse sous 48h ouvrables'},
  {num:'3',title:'On vous recontacte',desc:'Avec une première analyse'},
  {num:'4',title:'Rendez-vous de cadrage',desc:'On définit le périmètre ensemble'}
],
incTitle:'Ce qu\'on peut faire',
includes:[
  {title:'Développement spécifique',desc:'Code sur mesure pour vos besoins uniques.'},
  {title:'Intégration complexe multi-systèmes',desc:'Connecter vos outils existants entre eux.'},
  {title:'Automatisation avancée',desc:'Workflows complexes, multi-étapes, multi-sources.'},
  {title:'Projets long terme',desc:'Accompagnement sur plusieurs mois si nécessaire.'}
],
formTitle:'Envoyer votre demande',
formSub:'Décrivez votre projet — on vous répond sous 48h avec une première analyse.',
fields:{name:'Nom complet',email:'Email professionnel',company:'Entreprise',sector:'Secteur d\'activité',desc:'Description du projet',budget:'Budget approximatif',delay:'Délai souhaité',ai:'Avez-vous déjà utilisé l\'IA ?'},
sectorOpts:['Sélectionner...','Recrutement / RH','Services financiers','Opérations / Logistique','Immobilier','Juridique','Santé','Technologie','Autre'],
budgetOpts:['Sélectionner...','Moins de 5 000 $','5 000 $ — 15 000 $','15 000 $ — 50 000 $','50 000 $ et plus'],
aiOpts:['Oui','Non','En cours'],
descPh:'Décrivez votre projet, vos objectifs, et les systèmes existants impliqués.',
submitBtn:'Envoyer ma demande',sendingBtn:'Envoi en cours...',
successMsg:'✓ Demande envoyée ! Nous vous recontactons sous 48h avec une première analyse.',
faqTitle:'Questions fréquentes',
faqs:[
  {q:'Comment évaluez-vous un projet sur mesure ?',a:'On analyse votre demande, vos contraintes techniques, et vos objectifs business. Puis on propose un périmètre, un budget et un planning réaliste.'},
  {q:'Quel est le délai typique ?',a:'Variable selon la complexité. De 2 semaines pour un projet simple à plusieurs mois pour une intégration complexe. On vous donne une estimation dès le cadrage.'},
  {q:'Je ne sais pas encore exactement ce que je veux. C\'est un problème ?',a:'Pas du tout. Le rendez-vous de cadrage sert exactement à ça. On vous aide à définir le périmètre en partant de vos problèmes, pas de la solution.'},
  {q:'Proposez-vous un devis gratuit ?',a:'Oui. L\'analyse initiale et le cadrage sont gratuits. Vous ne payez que si vous validez le projet.'}
],
ctaH2:'Un besoin spécifique ?',ctaSub:'Remplissez le formulaire ci-dessus ou contactez-nous directement.',ctaFinal:'Contactez-nous'
}
},
en: {
nav: { home:'Home', about:'About', services:'Services', offers:'Offers', secteurs:'Industries', contact:'Contact', cta:'Book a call' },
ddOffres: [
{icon:'bolt',label:'AI Sprint',page:'offre-sprint'},
{icon:'search',label:'AI Audit',page:'offre-audit'},
{icon:'compass',label:'Consulting',page:'offre-consulting'},
{icon:'cpu',label:'Custom AI Agent',page:'offre-agent'},
{icon:'custom',label:'Custom Project',page:'offre-surmesure'}
],
ddSecteurs: [
{icon:'users',label:'Recruitment',page:'secteur-recrutement'},
{icon:'chart',label:'Finance',page:'secteur-finance'},
{icon:'box',label:'Operations',page:'secteur-operations'},
{icon:'home',label:'Real Estate',page:'secteur-immobilier'},
{icon:'shield',label:'Legal',page:'secteur-juridique'},
{icon:'heart',label:'Healthcare',page:'secteur-sante'}
],
meta: {
home:{title:'Intelart — AI Agency for B2B SMBs in Canada',desc:'Automate your processes and deploy a first concrete AI system in 1-2 weeks. B2B SMBs, Ottawa, Canada.',keys:'AI agency Ottawa, SMB automation, artificial intelligence B2B, AI sprint, AI consulting Canada'},
about:{title:'About — Intelart | Applied AI for B2B SMBs',desc:'Discover Intelart: a direct approach, concrete results in applied AI for B2B SMBs in Canada.',keys:'Intelart, AI agency Ottawa, applied AI SMB, founder, AI team Canada'},
services:{title:'Services — Intelart | Audit, Automation, AI',desc:'AI Audit, structuring, automation, AI systems, support and consulting. Six concrete services for B2B SMBs.',keys:'AI audit, process automation, AI agent, AI consulting, data structuring, SMB support'},
offers:{title:'Offers — Intelart | AI Sprint in 1-2 weeks',desc:'AI Sprint, Audit, Consulting, AI Agent and custom projects. Concrete results without heavy projects.',keys:'AI sprint, AI audit, AI consulting, AI agent OpenClaw, custom project, AI pricing SMB'},
contact:{title:'Contact — Intelart | Let\'s talk about your AI project',desc:'Contact Intelart for a 20-minute call. Response within 24h. Ottawa, Canada.',keys:'contact Intelart, AI appointment, free consultation, Ottawa Canada'},
'offre-sprint':{title:'AI Sprint — Intelart | First AI system in 10 days',desc:'AI Sprint: audit, scoping, prototype and delivery in 1-2 weeks. Concrete result guaranteed. Ottawa, Canada.'},
'offre-audit':{title:'AI Audit — Intelart | Diagnosis in 3-5 days',desc:'Complete process audit with impact-ranked AI opportunity report. Prioritized roadmap included.'},
'offre-consulting':{title:'AI Consulting — Intelart | Strategic sessions',desc:'AI-oriented digital transformation consulting. Target architecture and deployment plan. Ottawa, Canada.'},
'offre-agent':{title:'Custom AI Agent — Intelart | OpenClaw Technology',desc:'Custom AI agent deployed on your infrastructure. Powered by OpenClaw. Personalized quote.'},
'offre-surmesure':{title:'Custom Project — Intelart | Tailored solution',desc:'Specific development, complex integration, advanced automation. Free quote within 48h.'},
'secteur-recrutement':{title:'AI for Recruitment — Intelart',desc:'Qualify 3x more candidates without growing your team. Automated CV sorting and follow-ups.'},
'secteur-finance':{title:'AI for Financial Services — Intelart',desc:'Automate your client reports and free your advisors. 80% time saved.'},
'secteur-operations':{title:'AI for Operations — Intelart',desc:'Centralize tracking and eliminate manual errors. Centralized dashboard + smart alerts.'},
'secteur-immobilier':{title:'AI for Real Estate — Intelart',desc:'Automate client follow-up, never lose a lead again. Automated CRM + personalized follow-ups.'},
'secteur-juridique':{title:'AI for Legal — Intelart',desc:'Structure your files and never miss a deadline. Alerts + document research assistance.'},
'secteur-sante':{title:'AI for Healthcare — Intelart',desc:'Less admin, more time for your patients. Appointment automation + reminders + follow-up.'},
'logos':{title:'Logo Variants — Intelart',desc:'Intelart logo proposals. 5 SVG variants for review.'},
'privacy':{title:'Privacy Policy — Intelart',desc:'Intelart privacy policy. Protection of your personal data.',keys:'privacy policy, personal data, PIPEDA, Intelart'}
},
home: {
badge:'AI Agency · Ottawa, Canada',
h1:'Cut 10h of manual work\nper week — in 10 days',
sub:'Your teams waste time on low-value tasks. We find your best AI use case, build it and deliver it — in 10 days, no commitment. B2B SMBs in Ottawa and across Canada.',
cta1:'Book 20 min — free', cta2:'See our offers',
trust:['6+ years in B2B','3 continents','AI since 2022','Results in 10 days'],
stats:[
  {num:'6',suffix:'+',lab:'years of B2B experience',prefix:''},
  {num:'10',suffix:'',lab:'days to first result',prefix:''},
  {num:'3',suffix:'',lab:'international markets',prefix:''},
  {num:'100',suffix:'%',lab:'execution focus',prefix:''}
],
probEye:'The reality', probH2:'What really holds you back with AI',
probIntro:'You know AI can speed up your daily work. But the obstacles are real. Here\'s what our clients face before reaching out.',
probCta:'See how we address this →',
probItems:[
  {icon:'clock',color:'red',title:'Too many options, no direction',desc:'ChatGPT, Copilot, Claude… Everyone talks about AI, but where do you actually start?'},
  {icon:'loop',color:'red',title:'AI projects drag on forever',desc:'Six months for a pilot, still no decision. AI becomes an expense, not an asset.'},
  {icon:'team',color:'red',title:'No AI skills in-house',desc:'Hiring an expert? Too expensive and too slow. You need to outsource smartly.'},
  {icon:'money',color:'red',title:'Fear of wasting money',desc:'Tech changes every 3 months. A pragmatic approach first, infrastructure later.'},
],
wwdEye:'Our approach', wwdH2:'What we concretely do',
wwdSub:'No big speeches. Concrete actions that produce a first visible result.',
wwdItems:[
  {num:'01',title:'Bring order back',desc:'Identify friction points, clarify steps, improve process readability.'},
  {num:'02',title:'Reduce manual tasks',desc:'Target the flows that cost the most time and automate them simply.'},
  {num:'03',title:'Find the right use case',desc:'Identify what has the most impact for your specific business.'},
  {num:'04',title:'Ship a first solution',desc:'Deploy a useful automation or first understandable AI system.'},
],
procEye:'The method', procH2:'How it works',
procSub:'4 phases, 10 days maximum. Each step has a clear objective and deliverable.',
procSteps:[
  {day:'Day 1',title:'Scoping',desc:'Objectives, constraints, tools, success criteria.',icon:'scope'},
  {day:'D 2–3',title:'Diagnosis',desc:'Workflow observation + opportunity identification.',icon:'diag'},
  {day:'D 4–6',title:'Prototype',desc:'Build + rapid iterations with your team.',icon:'build'},
  {day:'D 7–10',title:'Delivery',desc:'Demo + docs + deployment plan + KPIs.',icon:'deliver'},
],
ucEye:'Real examples', ucH2:'AI applied to your industry',
ucSub:'A few examples of what we deliver in a single AI Sprint.',
useCases:[
  {tag:'Recruitment',tagColor:'blue',problem:'3h/day sorting CVs and following up with candidates',solution:'Automatic qualifier + scheduled follow-ups',result:'2x to 3x more files processed',link:'secteur-recrutement',
   svgBg:'rgba(59,130,246,.06)',svgStroke:'#3B82F6'},
  {tag:'Financial services',tagColor:'cyan',problem:'Client reports built manually (3-5h/report)',solution:'Auto-generation from internal data',result:'70-80% time saved',link:'secteur-finance',
   svgBg:'rgba(6,182,212,.06)',svgStroke:'#06B6D4'},
  {tag:'Operations',tagColor:'green',problem:'Tracking across 3 different tools, frequent errors',solution:'Centralized dashboard + smart alerts',result:'Real-time visibility, errors nearly eliminated',link:'secteur-operations',
   svgBg:'rgba(16,185,129,.06)',svgStroke:'#10B981'}
],
benEye:'What you get', benH2:'Measurable results',
benItems:[
  {icon:'down',label:'Fewer manual tasks',sub:'Targeted & automated'},
  {icon:'clear',label:'More clarity',sub:'Readable processes'},
  {icon:'check',label:'Better tracking',sub:'Nothing falls through'},
  {icon:'ai',label:'Concrete AI system',sub:'In production'},
  {icon:'next',label:'Base to build on',sub:'Scalable'},
],
ctaH2:'Ready to start?', ctaSub:'Book 20 minutes to see if your situation is a good fit. No pitch, no commitment.', ctaBtn:'Book a 20-minute call',
socialEye:'Client results', socialH2:'They trust us',
testimonials:[
  {stars:5,quote:'Thanks to the automation setup, we reduced export lead qualification time by 60%. ROI was visible from month one.',author:'Sales Director',company:'Automium'},
  {stars:5,quote:'Digitizing our internal processes transformed the way we work. Less paper, fewer errors, and real-time visibility across the entire chain.',author:'Director of Operations',company:'Getcomar'},
  {stars:5,quote:'Integrating AI into our media planning workflow allowed us to handle 3x more client briefs without growing the team.',author:'Digital Manager',company:'Intelcia Digital Advertising'},
  {stars:5,quote:'In 10 days, our client follow-ups were automated and our conversion rate jumped 40%. Concrete results, not slides.',author:'CEO',company:'Webfy Corp Limited'}
],
credBar:['Ottawa, Canada','6+ years in B2B','Ex Havas · Publicis · GroupeM','Bilingual FR/EN','Applied AI since 2022'],
},
about: {
eye:'About', h1:'6 years in B2B.\n3 years of applied AI.',
intro:'Intelart was born from a simple observation: B2B SMBs need concrete AI results, not theoretical consulting. Founded by a business development and digitalization professional with 6+ years of experience across 3 continents.',
h2b:'Who\'s behind Intelart',
body:'Before founding Intelart, I spent 6 years in the field — business development, key account management, digital strategy, and marketing — for B2B companies in France, Morocco, and Canada.\n\nI worked with groups like Havas Media, Publicis, and GroupeM at Intelcia Digital Advertising. I managed exports and key accounts at Automium. I led sales teams at H&R Call.\n\nWhen LLMs arrived in late 2022, I was among the first to use them for business development — prospecting, qualification, automated follow-ups. The results were so concrete that I decided to package this expertise for other SMBs.',
philTitle:'What I believe',
values:[
  {icon:'bulb',title:'AI must serve the business',desc:'Not tech for tech\'s sake. If it doesn\'t save time or money, we don\'t do it.'},
  {icon:'star',title:'Field before theory',desc:'6 years of B2B sales taught me that only results matter. Not reports.'},
  {icon:'pulse',title:'Start where you are',desc:'No need to be "digital ready." We start from your reality, not an ideal.'},
  {icon:'tick',title:'Prove before you sell',desc:'A first concrete result in 10 days. Then you decide freely.'},
],
founderTitle:'From the founder',
founderText:'I sold, prospected, and managed key accounts for 6 years — in France, Morocco, and Canada. When ChatGPT arrived in late 2022, I immediately saw what AI could change in the daily commercial life of SMBs. Not in 5 years. Now. I automated my own prospecting, then my clients\'. Intelart is that expertise packaged: we take your real operational problems and solve them with AI — quickly, without jargon, with measurable results by week two.',
h2c:'How we work',
wIntro:'We operate in short sprints, with a clear scope from day one. No surprises, no scope creep.',
steps:[
  {title:'Listen before proposing',desc:'Understand your real situation — not what you "should" do, but what\'s slowing you down today.'},
  {title:'Target the highest-impact use case',desc:'Identify the task that costs you the most time and can be automated quickly.'},
  {title:'Deliver in 10 days',desc:'Build and deploy a working solution in your real environment.'},
  {title:'Make you autonomous',desc:'Train your team. The system is yours. No dependency.'},
],
diffTitle:'Why Intelart?',
diffs:[
  {vs:'VS Large firm',title:'Field, not theory',desc:'I sold in the field for 6 years. I ship a working system, not a 200-page PowerPoint.'},
  {vs:'VS Building in-house',title:'Operational in 1 week',desc:'Hiring an AI expert takes 3-6 months and costs 80K+/year. I start within a week.'},
  {vs:'VS Generic AI agency',title:'B2B SMB specialist',desc:'I know your challenges — prospecting, qualification, client follow-up — because I\'ve lived them.'},
  {vs:'VS Doing nothing',title:'Your competitors are moving',desc:'Every month without automation is lost time while others adapt.'}
],
tlTitle:'The journey',
timeline:[
  {year:'2018',text:'Started in B2B business development and digitalization — sales team management, multi-channel commercial strategy (France, Morocco).'},
  {year:'2020',text:'Sales Engineer at Intelcia Digital Advertising — TV media planning (BFM, RMC), group management (Havas Media, Publicis, GroupeM), Google & Social campaigns.'},
  {year:'2022',text:'Key Account & Export Manager at Automium — B2B key accounts, wholesale trade, international prospecting. Early adoption of LLMs (ChatGPT) for business development.'},
  {year:'2024',text:'Founded Intelart in Ottawa — first AI automation projects for Canadian B2B SMBs.'},
  {year:'2025',text:'AI Sprint offer structured. Specialization: concrete results in 10 days.'},
  {year:'2026',text:'Launch of OpenClaw — proprietary AI agent technology. Francophone market expansion.'}
],
ctaH2:'Let\'s discuss your situation', ctaSub:'20 minutes to see if AI can concretely save you time. No commitment.', ctaBtn:'Book a call',
},
services: {
eye:'Our services', h1:'What we\nconcretely do',
intro:'Six complementary services, all results-oriented. We choose together what\'s relevant for your situation.',
items:[
  {icon:'svc-audit',color:'blue',tag:'Diagnosis',title:'AI Audit & Operational Diagnosis',desc:'Identify repetitive tasks, time losses, and concrete automation opportunities in your current operations.',deliv:'Structured report with diagnostics, impact-ranked opportunities, action roadmap.',more:'offre-audit'},
  {icon:'svc-struct',color:'cyan',tag:'Structuring',title:'Process Structuring & Optimization',desc:'Restore order to internal flows, clarify steps, improve tracking, and reduce friction.',deliv:'Process documentation, adjusted operating models, AI integration guide.',more:'offre-sprint'},
  {icon:'svc-auto',color:'blue',tag:'Automation',title:'Simple, Useful Automation',desc:'Deploy pragmatic automations that reduce manual work without creating complexity.',deliv:'Tested automated system, flow documentation, team training.',more:'offre-sprint'},
  {icon:'svc-ia',color:'green',tag:'Operational AI',title:'First AI System Deployment',desc:'Design and deploy a first operational, concrete, and understandable AI use case.',deliv:'Deployed AI system, recorded demo, deployment plan and improvement protocol.',more:'offre-sprint'},
  {icon:'svc-accom',color:'cyan',tag:'Support',title:'Implementation Support',desc:'Help the company stabilize, improve, and evolve the first building blocks.',deliv:'Weekly check-ins, fixes, new automations, reactive support.',more:'offre-consulting'},
  {icon:'svc-consult',color:'blue',tag:'Advisory',title:'AI-Oriented Digital Transformation Consulting',desc:'Help leaders make the right technology choices without getting lost in noise.',deliv:'Strategic AI integration plan, roadmap, validated target architecture.',more:'offre-consulting'},
],
ctaH2:'Does a service fit?', ctaSub:'Let\'s talk about your situation and see what\'s relevant.', ctaBtn:'Book a 20-minute call',
},
offers: {
eye:'Our offers', h1:'A short sprint,\na concrete result',
intro:'No long, expensive project from day one. We start with something small and useful, then decide together what comes next.',
badges:['Main offer','1 to 2 weeks'],
mainTitle:'AI Sprint — Structuring\n& Automation',
mainDesc:'In 1 to 2 weeks, we help B2B SMBs reduce repetitive manual tasks, better structure their operations, and deploy a first simple, useful, concrete AI system.',
blocks:[
  {title:'For whom',items:['B2B SMBs with repetitive tasks','Structures with poorly organized tracking','Companies wanting a first concrete result','Without launching a heavy project from day one'],type:'dot'},
  {title:'What the sprint includes',items:['Targeted audit of your current workflow','Priority need scoping','Choice of most useful use case','First automation or concrete AI system','Clear restitution with next steps'],type:'check'},
  {title:'What you get',items:['A useful diagnosis of your situation','A clear, validated scope','A first concrete, functional deliverable','A simple base to continue'],type:'check'},
  {title:'What it\'s not',items:['Not an immediate complete transformation','Not a heavy technical project','Not a total automation promise','Not a mandatory long-term commitment'],type:'cross'},
],
ctaH3:'Ready to test AI on a concrete case?',
ctaSub:'Let\'s take 20 minutes to see if your situation is a good fit.',
ctaBtn:'Book a 20-minute call',
micro:'No long-term commitment. Free assessment included.',
reassure:'We commit to concrete results in 1-2 weeks. Your initial assessment is free and non-binding.',
faqTitle:'Frequently asked questions',
faqs:[
  {q:'We\'re not a tech company. Is AI really for us?',a:'AI isn\'t reserved for technologists. It\'s a tool to process more information, faster, without growing your team.'},
  {q:'This takes months to implement. We don\'t have time.',a:'An AI Sprint is 1-2 weeks. Not 6 months. We target one specific problem. You see results, then decide.'},
  {q:'What if it doesn\'t work with our data?',a:'We test before deploying. You provide a real sample. We validate in your exact context.'},
  {q:'After the Sprint, you leave. What then?',a:'You have a working system, documentation, and trained team. It\'s code and process your people understand.'},
],
posTitle:'Why Intelart instead of in-house or a large firm?',
posBody:'A large firm delivers a report. Building in-house requires rare skills. Intelart: we assess, ship a working system in 2 weeks, train your team, and you decide based on real results.',
secoTitle:'Possible next steps', secoSub:'After the first sprint, if it becomes relevant:',
secoItems:[
  {tag:'Continuity',title:'Implementation Support',desc:'Stabilize, improve, and evolve the first building blocks.'},
  {tag:'Extension',title:'Additional Automations',desc:'Identify and automate other high-value flows.'},
  {tag:'Advanced',title:'Internal Agent / AI Assistant',desc:'Deploy a more sophisticated internal AI agent if justified.'},
],
},
contact: {
eye:'Contact', h1:'Let\'s talk about\nyour needs',
intro:'Want to see if this offer fits your company? Let\'s take 20 minutes to discuss it.',
h2:'Get in touch', sub:'Not a form that goes into a void. You\'ll receive a response within 24 business hours.',
info:[
  {icon:'mail',label:'Email',val:'contact@intelart.ca',href:'mailto:contact@intelart.ca'},
  {icon:'phone',label:'Phone',val:'+1 613 261 8709'},
  {icon:'pin',label:'Location',val:'Ottawa, Ontario, Canada'},
  {icon:'cal',label:'Schedule a call',val:'Book directly →',href:'https://cal.com/intelart/echange-decouverte-discovery-call'},
],
nextTitle:'What happens next',
nextList:['Response within 24 business hours','20-minute call with no commitment','We assess together if it\'s a fit','If yes: clear proposal and quick scoping'],
formTitle:'Send a message',
formSub:'Briefly describe your situation and we\'ll get back to you quickly.',
fn:'First name',ln:'Last name',em:'Professional email',co:'Company',nd:'Your main need',msg:'Message',
submitBtn:'Send message', sendingBtn:'Sending...',
successMsg:'✓ Message sent successfully! We\'ll reply within 24 business hours.',
selectOpts:['Select...','Reduce repetitive manual tasks','Structure internal processes','Deploy a first AI system','Automate a specific flow','Digital transformation advisory','Other / not sure yet'],
taph:'Briefly describe your situation, your business, and what you\'re looking to improve.',
errRequired:'This field is required',
errEmail:'Please enter a valid email',
},
footer: {
tagline:'Concrete, operational AI solutions for B2B SMBs in Canada.',
cta:'Book a call',
navTitle:'Navigation', svcTitle:'Services', ctTitle:'Contact',
navLinks:[{l:'Home',p:'home'},{l:'About',p:'about'},{l:'Services',p:'services'},{l:'Offers',p:'offers'},{l:'Contact',p:'contact'}],
svcLinks:['AI Audit','Structuring','Automation','AI Systems','Support','Consulting'],
ctLinks:['contact@intelart.ca','+1 613 261 8709','Ottawa, Canada','Book a call'],
copy:'© 2026 Intelart. All rights reserved.',
right:'Ottawa, Canada · AI Solutions for B2B SMBs',
},
sectors: {
badges:['Ottawa, Canada','No commitment'],
painTitle:'Sound familiar?',
delivTitle:'What we deliver',
beforeLabel:'Before',afterLabel:'After',
processTitle:'How it works',
procSteps:[{day:'Day 1',title:'Scoping',icon:'scope'},{day:'D 2–3',title:'Diagnosis',icon:'diag'},{day:'D 4–6',title:'Prototype',icon:'build'},{day:'D 7–10',title:'Delivery',icon:'deliver'}],
ctaCal:'Book a free 20-min call',
ctaPay:'Start now — 5 000 $CA',
trustBadges:['🔒 Secure SSL payment','↩ Refund within 48h if unsatisfied','🇨🇦 Ottawa, Canada'],
faqTitle:'Frequently asked questions',
ctaH2:'Ready to automate your daily work?',ctaSub:'20 minutes to see if your situation is a good fit.',ctaFinal:'Book a free call',
list: {
  recrutement:{
    h1:'Qualify 3x more candidates\nwithout growing your team',
    sub:'Stop spending 3h/day sorting CVs. AI qualifies, follows up, and organizes your applications automatically.',
    pains:[
      {title:'3h/day sorting CVs',desc:'Manual sorting of each application, copy-pasting between tools, missed follow-ups.'},
      {title:'Forgotten candidate follow-ups',desc:'Good candidates leave because you take too long to respond.'},
      {title:'Pipeline scattered across tools',desc:'ATS, email, Excel — information is everywhere and nowhere.'}
    ],
    solution:'Automatic candidate qualifier + automated follow-ups',
    before:['Manual CV sorting','Missed or late follow-ups','Pipeline scattered across 3 tools','Candidates lost in the cracks'],
    after:['Instant AI pre-qualification','Automated personalized follow-ups','Centralized, structured pipeline','Zero forgotten candidates'],
    metrics:[{num:'3x',lab:'more files processed'},{num:'0',lab:'lost candidates'}],
    faqs:[
      {q:'We already use an ATS — will it work with it?',a:'Yes. We integrate with your existing tools — no forced replacement. AI complements your ATS.'},
      {q:'Can AI really understand our specific job criteria?',a:'We configure criteria together during scoping. AI learns your specific evaluation grids.'},
      {q:'How long to set this up?',a:'A 10-day AI Sprint. You have a working system and trained team at the end.'}
    ]
  },
  finance:{
    h1:'Automate your client reports,\nfree your advisors',
    sub:'Stop spending 4 hours per client report. AI generates, structures, and formats your reports automatically.',
    pains:[
      {title:'4h per client report',desc:'Back and forth between systems, manual formatting, endless verifications.'},
      {title:'Scattered data',desc:'CRM, accounting, portfolio — everything in different systems.'},
      {title:'Admin eats into advisory time',desc:'Your advisors spend more time on admin than with clients.'}
    ],
    solution:'Automatic report generation from internal data',
    before:['4h per report, manually','Data in 3 different systems','Inconsistent formatting','Advisors drowning in admin'],
    after:['Reports generated in minutes','Data centralized automatically','Unified professional format','Advisors freed for advising'],
    metrics:[{num:'80%',lab:'time saved'},{num:'3x',lab:'more reports/week'}],
    faqs:[
      {q:'Our data is confidential — how do you protect it?',a:'Everything stays on your systems. AI processes locally or on dedicated cloud. We store nothing.'},
      {q:'Can AI adapt to our existing report formats?',a:'Yes. We configure templates on your current formats. Results look exactly like what you already produce.'},
      {q:'What about regulatory compliance?',a:'We work within your requirements. Every report is still verified by your team before sending.'}
    ]
  },
  operations:{
    h1:'Centralize your tracking,\neliminate manual errors',
    sub:'Stop juggling between 3 tools with errors at every step. One centralized dashboard with smart alerts.',
    pains:[
      {title:'Tracking across 3 tools, frequent errors',desc:'Every data transfer between tools creates errors and losses.'},
      {title:'Missed alerts, unanticipated delays',desc:'Problems detected too late, when damage is already done.'},
      {title:'Manual status reports',desc:'Hours lost compiling data for status meetings.'}
    ],
    solution:'Centralized dashboard + smart alerts + auto reports',
    before:['3 disconnected tools','Frequent data entry errors','Missed alerts','Weekly manual reports'],
    after:['One unified dashboard','Automatic error-free entry','Proactive real-time alerts','Auto-generated reports'],
    metrics:[{num:'~0',lab:'tracking errors'},{num:'100%',lab:'real-time visibility'}],
    faqs:[
      {q:'We have legacy systems — can you connect to them?',a:'Yes. We connect via API, automatic exports, or secure scraping depending on your systems.'},
      {q:'Do we need to change our current tools?',a:'No. We build a layer on top of your existing tools. No workflow change for your teams.'},
      {q:'What minimum order volume makes it worthwhile?',a:'From 50+ orders/week, automation pays off. We assess your specific case during scoping.'}
    ]
  },
  immobilier:{
    h1:'Automate your client follow-up,\nnever lose a lead again',
    sub:'Every unfollowed lead is a lost sale. Automate follow-ups, reminders, and prospect qualification.',
    pains:[
      {title:'Scattered client tracking',desc:'Leads in email, phone, CRM — impossible to track everything.'},
      {title:'Too much administrative time',desc:'Paperwork, follow-ups, manual updates — not enough time for showings.'},
      {title:'Leads forgotten after first contact',desc:'After initial contact, 60% of leads are never followed up.'}
    ],
    solution:'Automated CRM + personalized follow-ups + systematic tracking',
    before:['Leads scattered everywhere','Forgotten or late follow-ups','Time-consuming manual tracking','Prospects lost after 1st contact'],
    after:['All leads in one place','Automatic personalized follow-ups','Effortless systematic tracking','Zero forgotten leads'],
    metrics:[{num:'0',lab:'lost leads'},{num:'2x',lab:'more time for showings'}],
    faqs:[
      {q:'I work alone — is this for me too?',a:'Especially. When you\'re solo, automation has the most impact. AI does the work of an assistant.'},
      {q:'Does it integrate with my real estate tools?',a:'Yes. We adapt to your tools (MLS, etc.) and build on top.'},
      {q:'How long to set up?',a:'10 days max with AI Sprint. System functional and team trained.'}
    ]
  },
  juridique:{
    h1:'Structure your files,\nnever miss a deadline',
    sub:'Missed deadlines and hours lost in document research are costly. Structure everything, automatically.',
    pains:[
      {title:'Time-consuming file management',desc:'Creating, filing, finding — every case takes forever.'},
      {title:'Tedious billing and time tracking',desc:'Logging hours, generating invoices, chasing — all manual.'},
      {title:'Slow document research',desc:'Finding the right precedent or clause takes hours.'}
    ],
    solution:'File structuring + deadline alerts + research assistance',
    before:['Disorganized files','Missed deadlines','Poorly tracked hours','Long manual research'],
    after:['Automatically structured files','Proactive deadline alerts','Automated time tracking','AI-assisted research'],
    metrics:[{num:'0',lab:'missed deadlines'},{num:'~50%',lab:'research time saved'}],
    faqs:[
      {q:'Attorney-client confidentiality — how do you handle it?',a:'Everything stays on your systems. We store nothing. AI processes locally. Professional secrecy compliance guaranteed.'},
      {q:'Can AI help with case law research?',a:'Yes. We configure AI to search your internal document bases and relevant public sources.'},
      {q:'Is it compatible with Bar requirements?',a:'We work within your ethical obligations. AI assists, it doesn\'t replace professional judgment.'}
    ]
  },
  sante:{
    h1:'Less admin,\nmore time for your patients',
    sub:'Manual reminders and paperwork steal clinical time. Automate follow-ups to focus on your patients.',
    pains:[
      {title:'Manual appointment booking & reminders',desc:'Calling, confirming, reminding — a full-time person just for that.'},
      {title:'Hard-to-track patient files',desc:'Scattered notes, incomplete history, missing information.'},
      {title:'Admin encroaches on clinical time',desc:'Every admin minute is one less minute with a patient.'}
    ],
    solution:'Appointment automation + reminders + post-consultation follow-up',
    before:['Manual phone reminders','Incomplete patient files','Frequent no-shows','Time-consuming admin'],
    after:['Automatic SMS/email reminders','Structured, complete files','No-shows reduced by 50-70%','Time freed for patients'],
    metrics:[{num:'-60%',lab:'no-shows'},{num:'+2h',lab:'/day of clinical time'}],
    faqs:[
      {q:'How do you handle PIPEDA compliance?',a:'We comply with all PIPEDA requirements. Patient data stays on your Canadian systems. Nothing is exported.'},
      {q:'Does it work with our clinic software?',a:'We integrate with major clinic management software. We assess compatibility during scoping.'},
      {q:'Do patient data stay in Canada?',a:'Absolutely. Canadian hosting guaranteed. No data leaves the country.'}
    ]
  }
}
},
offreSprint: {
tags:['Flagship offer','1 to 2 weeks','Delivered in 10 days'],
h1:'AI Sprint — A working AI\nsystem delivered in 10 days',
sub:'We find your best use case, build it and deliver it turnkey — with docs and training. No dragging pilot, no long-term lock-in. Results guaranteed or we redo it.',
incTitle:'What the Sprint includes',
includes:[
  {title:'Targeted audit of your current workflow',desc:'Process analysis to find opportunities.'},
  {title:'Priority need scoping',desc:'We identify together the highest-impact use case.'},
  {title:'Most useful and realistic use case selection',desc:'Feasibility + impact, no empty promises.'},
  {title:'Building a first automation or AI system',desc:'A concrete deliverable, not a PowerPoint.'},
  {title:'Restitution with documentation and next steps',desc:'Everything documented and transferable.'},
  {title:'Team training',desc:'Your team understands and can maintain the system.'}
],
forTitle:'Who it\'s for',
forItems:['B2B SMBs with time-consuming repetitive tasks','Structures with poorly organized tracking','Companies wanting a first concrete AI result','Leaders who want to test before committing','Teams without in-house AI skills','Organizations tired of never-ending projects'],
delivTitle:'What you get at the end',
deliverables:['A complete diagnosis of your situation','A functional, deployed AI system','Clear, usable documentation','Training for your team','A plan for next steps','KPIs to measure impact'],
price:'5 000 $CA',
priceSub:'All included — Concrete result guaranteed or we redo it',
ctaPay:'Start the Sprint',
ctaCal:'Book a free call',
trustBadges:['🔒 Secure SSL payment','↩ Refund within 48h if unsatisfied','🇨🇦 Canadian company, Ottawa'],
faqTitle:'Frequently asked questions',
faqs:[
  {q:'How long exactly does the Sprint take?',a:'Between 7 and 10 business days. We scope the perimeter together on Day 1, and deliver by Day 10 at the latest.'},
  {q:'What if my use case doesn\'t fit a Sprint?',a:'We detect it during Day 1 scoping. If your need requires a different format, we direct you to the right offer — without charging for the Sprint.'},
  {q:'I\'m not technical. Is that a problem?',a:'Not at all. We translate technical into business language. Your team doesn\'t need to code — they need to understand how to use the system.'},
  {q:'What happens after the Sprint?',a:'You have a working system + documentation + training. If you want to go further, we offer implementation support. But no obligation.'}
],
ctaH2:'Ready to see AI in action on your case?',ctaSub:'20 minutes to assess if your situation is a good fit.',ctaFinal:'Book a 20-minute call'
},
offreAudit: {
tags:['Diagnostic','3 to 5 days'],
h1:'AI Audit — Understand before\nyou act',
sub:'A complete diagnosis of your processes with an impact-ranked AI opportunity report and a prioritized roadmap. The ideal starting point.',
incTitle:'What the Audit includes',
includes:[
  {title:'Complete analysis of your current processes',desc:'We review every flow, every tool, every friction point.'},
  {title:'Interviews with your key team members',desc:'We listen to those doing the work daily.'},
  {title:'AI opportunity report ranked by impact',desc:'Each opportunity rated by effort vs. result.'},
  {title:'Prioritized roadmap with concrete recommendations',desc:'A clear action plan, not a wish list.'}
],
forTitle:'Who it\'s for',
forItems:['Companies that want to understand before acting','Leaders wanting a clear view of AI opportunities','Structures hesitating between multiple possible projects','Organizations wanting a neutral external assessment'],
delivTitle:'What you get at the end',
deliverables:['A complete structured report','A process mapping of your operations','Opportunities ranked by impact and feasibility','An actionable roadmap','Neutral technology recommendations','A budget estimate per opportunity'],
price:'2 500 $CA',
priceSub:'Delivered in 3 to 5 days — Complete report included',
ctaPay:'Order the audit',
ctaCal:'Learn more',
trustBadges:['🔒 Secure SSL payment','↩ Refund within 48h if unsatisfied','🇨🇦 Canadian company, Ottawa'],
faqTitle:'Frequently asked questions',
faqs:[
  {q:'Does the audit force me to buy anything else?',a:'No. The report is a standalone deliverable. You can use it internally or with another provider. No obligation.'},
  {q:'How much time does it take on my team\'s side?',a:'We need 2-3 hours of interviews total with your key team members. The rest is on us.'},
  {q:'Does the audit also cover existing tools?',a:'Yes. We evaluate your current tools and how AI can integrate — or replace them if relevant.'},
  {q:'Can I then move to the AI Sprint?',a:'Absolutely. The audit is the ideal starting point for a Sprint. The audit price is often deducted if you proceed.'}
],
ctaH2:'Ready for a clear view of your AI opportunities?',ctaSub:'We deliver a complete diagnosis in 3 to 5 days.',ctaFinal:'Book a call'
},
offreConsulting: {
tags:['Strategic','Half-day or full day'],
h1:'AI Consulting — Decide\non solid ground',
sub:'Strategic sessions to help you make the right technology choices, build your target architecture, and plan your AI deployment.',
incTitle:'What the session includes',
includes:[
  {title:'AI-oriented digital transformation consulting',desc:'Clear vision of what AI can bring to your organization.'},
  {title:'Technology choice guidance',desc:'Cut through market noise for informed decisions.'},
  {title:'Target architecture and deployment plan',desc:'A realistic technical roadmap, not a theoretical diagram.'},
  {title:'Clear vision, informed decisions',desc:'You leave with concrete answers, not more questions.'}
],
forTitle:'Who it\'s for',
forItems:['Leaders who want to decide on solid ground','CTOs/CDOs evaluating AI options','Executive teams in strategic reflection','Companies starting their digital transformation'],
delivTitle:'What you get',
deliverables:['A strategic AI integration plan','A validated target architecture','Technology recommendations','A medium-term deployment plan','Tool selection criteria','An actionable synthesis document'],
price:'1 200 $CA',
priceSub:'per session · Half-day or full day',
ctaCal:'Book an appointment',
trustBadges:['🇨🇦 Based in Ottawa, Canada','🤝 No commitment','📋 Summary delivered after each session'],
faqTitle:'Frequently asked questions',
faqs:[
  {q:'What\'s the difference between consulting and audit?',a:'The audit analyzes your existing processes. Consulting goes further: strategy, target architecture, tool selection, and medium-term deployment plan.'},
  {q:'How many sessions should I plan?',a:'Depends on complexity. For initial strategic framing, one full-day session often suffices. For deeper guidance, 2-3 spaced sessions.'},
  {q:'Do you also sell implementation afterwards?',a:'We can, but it\'s not mandatory. Consulting is a standalone service. If you implement in-house, our recommendations remain valid.'},
  {q:'What\'s the exact format?',a:'In person in Ottawa or via video call. We start with a framing brief, then collaborative work on your specific challenges.'}
],
ctaH2:'Need a clear strategic vision?',ctaSub:'Let\'s book a call to scope your needs.',ctaFinal:'Book an appointment'
},
offreAgent: {
tags:['Premium','OpenClaw Technology','Dedicated Infrastructure'],
h1:'Custom AI Agent —\nYour internal AI assistant',
sub:'A custom-built AI agent deployed on your dedicated infrastructure. Powered by OpenClaw technology. For companies with complex recurring needs.',
incTitle:'What\'s included',
includes:[
  {title:'Complete agent design based on your needs',desc:'Custom architecture, not a generic solution.'},
  {title:'Personalized development and configuration',desc:'Clean, tested, documented code.'},
  {title:'Deployment on your infrastructure or dedicated cloud',desc:'Your data stays with you. Full control.'},
  {title:'Complete team training',desc:'Your team masters the tool from day one.'}
],
forTitle:'Who it\'s for',
forItems:['Companies with complex recurring needs','Organizations wanting their own internal AI assistant','Teams processing large data volumes','Companies with high confidentiality requirements'],
procTitle:'How it works',
process:[
  {num:'1',title:'Analysis',desc:'We study your needs and infrastructure'},
  {num:'2',title:'Design',desc:'Agent architecture and validation with you'},
  {num:'3',title:'Development',desc:'Building, testing, iterations'},
  {num:'4',title:'Deployment',desc:'Production launch + team training'}
],
price:'Custom quote',
priceSub:'Personalized project — Each agent is unique',
ctaCal:'Discuss my project',
trustBadges:['🔧 OpenClaw Technology','🏗️ Dedicated Infrastructure','🇨🇦 Canadian hosting available'],
faqTitle:'Frequently asked questions',
faqs:[
  {q:'What exactly is OpenClaw?',a:'OpenClaw is our proprietary AI agent creation technology. It enables building custom assistants that integrate with your existing systems.'},
  {q:'Do my data stay confidential?',a:'Absolutely. The agent is deployed on your infrastructure or a dedicated cloud. Your data never transit through our servers.'},
  {q:'How long for a complete project?',a:'Depends on complexity. Expect 4 to 8 weeks for a standard agent. We give you a precise estimate after the initial analysis.'},
  {q:'What\'s the price range?',a:'Each project is unique. We provide a detailed quote after analyzing your needs. Contact us for a no-commitment initial call.'}
],
ctaH2:'Ready to have your own AI assistant?',ctaSub:'Let\'s talk about your project — 20 minutes, no commitment.',ctaFinal:'Discuss my project'
},
offreSurMesure: {
tags:['Custom','Tailored scope'],
h1:'Custom Project —\nWe build it together',
sub:'For needs that don\'t fit any box. Specific development, complex integration, advanced automation — we study your request and propose a tailored scope.',
procTitle:'How it works',
process:[
  {num:'1',title:'Submit your request',desc:'Via the form below'},
  {num:'2',title:'We study your project',desc:'Analysis within 48 business hours'},
  {num:'3',title:'We get back to you',desc:'With an initial analysis'},
  {num:'4',title:'Scoping meeting',desc:'We define the scope together'}
],
incTitle:'What we can do',
includes:[
  {title:'Specific development',desc:'Custom code for your unique needs.'},
  {title:'Complex multi-system integration',desc:'Connect your existing tools together.'},
  {title:'Advanced automation',desc:'Complex workflows, multi-step, multi-source.'},
  {title:'Long-term projects',desc:'Multi-month support if needed.'}
],
formTitle:'Submit your request',
formSub:'Describe your project — we\'ll respond within 48h with an initial analysis.',
fields:{name:'Full name',email:'Professional email',company:'Company',sector:'Industry',desc:'Project description',budget:'Approximate budget',delay:'Desired timeline',ai:'Have you used AI before?'},
sectorOpts:['Select...','Recruitment / HR','Financial services','Operations / Logistics','Real Estate','Legal','Healthcare','Technology','Other'],
budgetOpts:['Select...','Under $5,000','$5,000 — $15,000','$15,000 — $50,000','$50,000 and above'],
aiOpts:['Yes','No','In progress'],
descPh:'Describe your project, objectives, and existing systems involved.',
submitBtn:'Submit my request',sendingBtn:'Sending...',
successMsg:'✓ Request submitted! We\'ll get back to you within 48h with an initial analysis.',
faqTitle:'Frequently asked questions',
faqs:[
  {q:'How do you evaluate a custom project?',a:'We analyze your request, technical constraints, and business goals. Then propose a scope, budget, and realistic timeline.'},
  {q:'What\'s the typical timeline?',a:'Variable by complexity. From 2 weeks for simple projects to several months for complex integrations. We give you an estimate at scoping.'},
  {q:'I don\'t know exactly what I want yet. Is that a problem?',a:'Not at all. The scoping meeting is exactly for that. We help you define the scope starting from your problems, not the solution.'},
  {q:'Do you offer a free quote?',a:'Yes. The initial analysis and scoping are free. You only pay if you validate the project.'}
],
ctaH2:'Have a specific need?',ctaSub:'Fill out the form above or contact us directly.',ctaFinal:'Contact us'
}
}
};

/* ─── ICONS ─── */
const ICONS = {
search:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
grid:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
bolt:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
ai:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
team:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
chart:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
clock:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
loop:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 4v6h6"/><path d="M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>`,
money:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
bulb:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
star:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
pulse:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
tick:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
down:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/></svg>`,
clear:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`,
check:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
next:`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
mail:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
phone:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.98 17z"/></svg>`,
pin:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
cal:`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
compass:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
cpu:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
custom:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
users:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`,
box:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>`,
home:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>`,
shield:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
heart:`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
/* Service-specific icons */
'svc-audit':`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><circle cx="11" cy="8" r="1" fill="currentColor" stroke="none"/><circle cx="8" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="14" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="11" cy="15" r="1" fill="currentColor" stroke="none"/></svg>`,
'svc-struct':`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="2" width="8" height="6" rx="1"/><rect x="2" y="16" width="8" height="6" rx="1"/><rect x="14" y="16" width="8" height="6" rx="1"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="6" y1="16" x2="6" y2="12"/><line x1="18" y1="16" x2="18" y2="12"/><line x1="6" y1="12" x2="18" y2="12"/></svg>`,
'svc-auto':`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="7"/><path d="M12 9v3l2 1"/><path d="M16.24 7.76l1.42-1.42"/><path d="M7.76 7.76L6.34 6.34"/><path d="M13 2L11 5h2l-2 3"/></svg>`,
'svc-ia':`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="12" rx="9" ry="9"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="5" r="1.5" fill="currentColor" stroke="none"/><circle cx="17.5" cy="9" r="1.5" fill="currentColor" stroke="none"/><circle cx="17.5" cy="15" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1.5" fill="currentColor" stroke="none"/><circle cx="6.5" cy="15" r="1.5" fill="currentColor" stroke="none"/><circle cx="6.5" cy="9" r="1.5" fill="currentColor" stroke="none"/><line x1="12" y1="5" x2="12" y2="9" opacity=".5"/><line x1="17.5" y1="9" x2="14.5" y2="10.5" opacity=".5"/><line x1="17.5" y1="15" x2="14.5" y2="13.5" opacity=".5"/><line x1="12" y1="19" x2="12" y2="15" opacity=".5"/><line x1="6.5" y1="15" x2="9.5" y2="13.5" opacity=".5"/><line x1="6.5" y1="9" x2="9.5" y2="10.5" opacity=".5"/></svg>`,
'svc-accom':`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/></svg>`,
'svc-consult':`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
scope:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/></svg>`,
diag:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/><line x1="11" y1="8" x2="11" y2="14"/></svg>`,
build:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
deliver:`<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
};

const COLOR_MAP = {blue:'#3B82F6',cyan:'#06B6D4',green:'#10B981',red:'#EF4444',purple:'#8B5CF6',orange:'#F97316'};
const IB_MAP = {blue:'ib-blue',cyan:'ib-cyan',green:'ib-green',red:'ib-red',purple:'ib-purple',orange:'ib-orange'};
const TAG_MAP = {blue:'tag-blue',cyan:'tag-cyan',green:'tag-green',red:'tag-red'};

/* ─── STATE ─── */
let lang = initLang;
let curPage = document.documentElement.dataset.page || (typeof PAGE_ID !== 'undefined' ? PAGE_ID : 'home');
let scrollIndicatorHidden = false;

/* ─── RENDER HELPERS ─── */
function r(id,html){ const el=document.getElementById(id); if(el) el.innerHTML=html; } /* innerHTML safe: data from hardcoded C object only, never user input */
function rt(id,txt){ const el=document.getElementById(id); if(el) el.textContent=txt; }

/* ─── SEO: updateMeta ─── */
function updateMeta(page, l) {
const m = C[l].meta[page];
if(!m) return;
document.getElementById('pg-title').textContent = m.title;
document.getElementById('pg-desc').setAttribute('content', m.desc);
const ogT=document.getElementById('og-title');if(ogT)ogT.setAttribute('content',m.title);
const ogD=document.getElementById('og-desc');if(ogD)ogD.setAttribute('content',m.desc);
const slug=page==='home'?'':'#'+page;
const ogU=document.getElementById('og-url');if(ogU)ogU.setAttribute('content','https://intelart.ca/'+slug);
const cn=document.getElementById('pg-canonical');if(cn)cn.setAttribute('href','https://intelart.ca/'+slug);
if(m.keys){const k=document.getElementById('pg-keys');if(k)k.setAttribute('content',m.keys);}
}

/* ─── RENDER ─── */
function render() {
const c = C[lang];
const h = c.home, a = c.about, s = c.services, o = c.offers, ct = c.contact, f = c.footer, n = c.nav;

/* NAV */
rt('nl-home',n.home); rt('nl-about',n.about); rt('nl-services',n.services);
rt('nl-offers-txt',n.offers); rt('nl-secteurs-txt',n.secteurs); rt('nl-contact',n.contact);
rt('hdr-cta',n.cta);
rt('ml-home',n.home); rt('ml-about',n.about); rt('ml-services',n.services);
rt('ml-offres-txt',n.offers); rt('ml-secteurs-txt',n.secteurs);
rt('ml-contact',n.contact); rt('mob-cta',n.cta);

/* Dropdown Offres — MPA: real hrefs */
const ls = lang==='en'?'?lang=en':'';
r('dd-offres', c.ddOffres.map(d=>`<a role="menuitem" href="${PAGE_URLS[d.page]||'#'}${ls}">${ICONS[d.icon]||''} ${d.label}</a>`).join(''));
r('dd-secteurs', c.ddSecteurs.map(d=>`<a role="menuitem" href="${PAGE_URLS[d.page]||'#'}${ls}">${ICONS[d.icon]||''} ${d.label}</a>`).join(''));
/* Mobile dropdown items */
r('ml-offres-items', c.ddOffres.map(d=>`<a href="${PAGE_URLS[d.page]||'#'}${ls}">${d.label}</a>`).join(''));
r('ml-secteurs-items', c.ddSecteurs.map(d=>`<a href="${PAGE_URLS[d.page]||'#'}${ls}">${d.label}</a>`).join(''));

/* HOME — Hero */
rt('hero-badge',h.badge);
r('hero-h1',h.h1.split('\n').map((l,i)=>i===1?`<span class="gradient-text">${l}</span>`:l).join('<br>'));
rt('hero-sub',h.sub);
rt('hero-cta1',h.cta1); rt('hero-cta2',h.cta2);
r('hero-trust',h.trust.map(t=>`<span class="trust-item">${t}</span>`).join(''));

/* Stats with counter animation data */
r('stats-strip',h.stats.map(s=>`<div class="stat-i"><div class="stat-num"><span class="counter" data-target="${s.num}" data-suffix="${s.suffix||''}" data-prefix="${s.prefix||''}">${s.prefix||''}0${s.suffix||''}</span></div><div class="stat-lab">${s.lab}</div></div>`).join(''));

/* CREDIBILITY BAR */
r('cred-bar',h.credBar.map(t=>`<span class="cred-item">${t}</span>`).join('<span class="cred-sep">·</span>'));

/* SOCIAL PROOF */
rt('social-eye',h.socialEye); rt('social-h2',h.socialH2);
r('social-grid',h.testimonials.map(t=>`
<div class="card testimonial-card card-glow">
<div class="testi-stars">${'★'.repeat(t.stars)}</div>
<p class="testi-quote">"${t.quote}"</p>
<div class="testi-author">
<div class="testi-avatar">${t.author.charAt(0)}</div>
<div><div class="testi-name">${t.author}</div><div class="testi-co">${t.company}</div></div>
</div>
</div>`).join(''));

/* PROBLEM */
rt('prob-eye',h.probEye); rt('prob-h2',h.probH2); rt('prob-intro',h.probIntro); rt('prob-cta',h.probCta);
r('prob-items',h.probItems.map(i=>`
<div class="p-item">
<div class="icon-box-sm ${IB_MAP[i.color]||'ib-red'}" style="color:${COLOR_MAP[i.color]||'var(--red)'}">${ICONS[i.icon]||''}</div>
<div><div class="p-title">${i.title}</div><p style="font-size:14px;margin:0">${i.desc}</p></div>
</div>`).join(''));

/* WWD */
rt('wwd-eye',h.wwdEye); rt('wwd-h2',h.wwdH2); rt('wwd-sub',h.wwdSub);
r('wwd-grid',h.wwdItems.map(i=>`
<div class="wwd-item">
<div class="wwd-num">${i.num}</div>
<div><div style="font-weight:600;margin-bottom:6px">${i.title}</div><p style="font-size:14px;margin:0">${i.desc}</p></div>
</div>`).join(''));

/* PROCESS STEPPER */
rt('proc-eye',h.procEye); rt('proc-h2',h.procH2); rt('proc-sub',h.procSub);
const stepperCont = document.getElementById('stepper-container');
if(stepperCont){
  stepperCont.querySelectorAll('.stepper-step').forEach(s=>s.remove());
  h.procSteps.forEach(s=>{
    const div = document.createElement('div');
    div.className = 'stepper-step';
    div.innerHTML = `<div class="stepper-dot">${ICONS[s.icon]||''}</div><div class="st-day">${s.day}</div><div class="st-title">${s.title}</div><div class="st-desc">${s.desc}</div>`;
    stepperCont.appendChild(div);
  });
}

/* USE CASES */
rt('uc-eye',h.ucEye); rt('uc-h2',h.ucH2); rt('uc-sub',h.ucSub);
r('uc-grid',h.useCases.map(uc=>{
const tagClass = TAG_MAP[uc.tagColor]||'tag-blue';
return `<div class="card usecase-card">
<div class="uc-illustration" style="background:${uc.svgBg}">
  <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
    <rect x="10" y="15" width="30" height="50" rx="4" fill="none" stroke="${uc.svgStroke}" stroke-width="1" opacity=".4"/>
    <line x1="40" y1="40" x2="50" y2="40" stroke="${uc.svgStroke}" stroke-width="1.5" stroke-dasharray="3 2" opacity=".5"/>
    <circle cx="65" cy="40" r="15" fill="none" stroke="${uc.svgStroke}" stroke-width="1.5" opacity=".6"/>
    <circle cx="65" cy="40" r="4" fill="${uc.svgStroke}" opacity=".3"/>
    <line x1="80" y1="40" x2="90" y2="40" stroke="${uc.svgStroke}" stroke-width="1.5" stroke-dasharray="3 2" opacity=".5"/>
    <rect x="90" y="22" width="20" height="36" rx="4" fill="none" stroke="${uc.svgStroke}" stroke-width="1" opacity=".4"/>
    <path d="M95 35l3 3 5-5" stroke="${uc.svgStroke}" stroke-width="1.5" fill="none" opacity=".6"/>
  </svg>
</div>
<div class="uc-body">
  <span class="tag ${tagClass}">${uc.tag}</span>
  <p class="uc-problem">${uc.problem}</p>
  <div class="uc-arrow">→ ${lang==='fr'?'Solution IA':'AI Solution'}</div>
  <div class="uc-solution">${uc.solution}</div>
  <div class="uc-result">↗ ${uc.result}</div>
  <a class="uc-link" href="${PAGE_URLS[uc.link]||'#'}${ls}">${lang==='fr'?'Voir ce cas d\'usage →':'See this use case →'}</a>
</div>
</div>`;
}).join(''));

/* BENEFITS */
rt('ben-eye',h.benEye); rt('ben-h2',h.benH2);
r('ben-grid',h.benItems.map(i=>`
<div class="card benefit-item card-glow">
<div class="b-icon" style="color:var(--accent)">${ICONS[i.icon]||''}</div>
<div class="b-label">${i.label}</div>
<div class="b-sub">${i.sub}</div>
</div>`).join(''));

/* CTA */
rt('cta-h2',h.ctaH2); rt('cta-sub',h.ctaSub); rt('cta-btn',h.ctaBtn);

/* ABOUT */
rt('ab-eye',a.eye);
r('ab-h1',a.h1.split('\n').map((l,i)=>i===1?`<span class="gradient-text">${l}</span>`:l).join('<br>'));
rt('ab-intro',a.intro); rt('ab2-h2',a.h2b); rt('ab-phil-title',a.philTitle);
r('ab2-body',a.body.split('\n\n').map(p=>`<p class="mt12">${p}</p>`).join(''));
r('ab-values',a.values.map(v=>`
<div class="card val-item card-hover card-glow">
<div class="icon-box-sm ib-blue" style="color:var(--accent)">${ICONS[v.icon]||''}</div>
<div class="val-title">${v.title}</div>
<p style="font-size:14px;margin:0">${v.desc}</p>
</div>`).join(''));
rt('ab-founder-title',a.founderTitle);
rt('ab-founder-text',a.founderText);
rt('ab3-h2',a.h2c); rt('ab3-intro',a.wIntro);
r('ab3-steps',a.steps.map((s,i)=>`
<div class="step">
<div class="step-num">${i+1}</div>
<div><h4 style="margin-bottom:4px">${s.title}</h4><p style="font-size:14px;margin:0">${s.desc}</p></div>
</div>`).join(''));

/* Differentiators */
rt('ab-diff-title',a.diffTitle);
r('ab-diff-grid',a.diffs.map(d=>`
<div class="card diff-card card-hover card-glow">
<div class="diff-vs">${d.vs}</div>
<div class="diff-title">${d.title}</div>
<p style="font-size:14px;margin:0">${d.desc}</p>
</div>`).join(''));

/* Timeline */
rt('ab-tl-title',a.tlTitle);
r('ab-timeline',a.timeline.map(t=>`
<div class="atl-item">
<div class="atl-year">${t.year}</div>
<p class="atl-text">${t.text}</p>
</div>`).join(''));

rt('ab-cta-h2',a.ctaH2); rt('ab-cta-sub',a.ctaSub); rt('ab-cta-btn',a.ctaBtn);

/* SERVICES */
rt('sv-eye',s.eye);
r('sv-h1',s.h1.split('\n').map((l,i)=>i===1?`<span class="gradient-text">${l}</span>`:l).join('<br>'));
rt('sv-intro',s.intro);
r('svc-grid',s.items.map(i=>`
<div class="card svc-card card-hover">
<div class="svc-icon">
  <div class="icon-box ${IB_MAP[i.color]||'ib-blue'}" style="color:${COLOR_MAP[i.color]||'var(--accent)'}">${ICONS[i.icon]||''}</div>
</div>
<div class="tag ${TAG_MAP[i.color]||'tag-blue'} mb8">${i.tag}</div>
<div class="svc-title">${i.title}</div>
<div class="svc-desc">${i.desc}</div>
<div class="svc-footer">
  <div class="svc-deliv">↗ ${i.deliv}</div>
  <a class="svc-more" href="${PAGE_URLS[i.more]||'#'}${ls}">${lang==='fr'?'En savoir plus →':'Learn more →'}</a>
</div>
</div>`).join(''));
rt('sv-cta-h2',s.ctaH2); rt('sv-cta-sub',s.ctaSub); rt('sv-cta-btn',s.ctaBtn);

/* OFFERS */
rt('of-eye',o.eye);
r('of-h1',o.h1.split('\n').map((l,i)=>i===1?`<span class="gradient-text">${l}</span>`:l).join('<br>'));
rt('of-intro',o.intro);
r('of-badges',o.badges.map((b,i)=>`<span class="tag ${i===0?'tag-blue':'tag-green'}">${b}</span>`).join(''));
r('of-main-title',o.mainTitle.split('\n').map((l,i)=>i===1?`<span class="gradient-text">${l}</span>`:l).join('<br>'));
rt('of-main-desc',o.mainDesc);
const listFn=(items,type)=>type==='check'?`<ul class="check">${items.map(i=>`<li>${i}</li>`).join('')}</ul>`:type==='cross'?`<ul class="cross">${items.map(i=>`<li>${i}</li>`).join('')}</ul>`:`<ul class="dot">${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
r('of-body',o.blocks.map(b=>`<div class="card offer-block"><div class="offer-block-title">${b.title}</div>${listFn(b.items,b.type)}</div>`).join(''));
rt('of-cta-h3',o.ctaH3); rt('of-cta-sub',o.ctaSub); rt('of-cta-btn',o.ctaBtn);
rt('of-micro',o.micro); rt('of-reassure',o.reassure);
rt('faq-title',o.faqTitle);
const faqs = o.faqs;
const half = Math.ceil(faqs.length/2);
const faqHtml = faqs.map(f=>`<div class="faq-item"><div class="faq-q">${f.q}</div><p class="faq-a">${f.a}</p></div>`);
r('faq-col1',faqHtml.slice(0,half).join(''));
r('faq-col2',faqHtml.slice(half).join(''));
rt('pos-title',o.posTitle); rt('pos-body',o.posBody);
rt('seco-title',o.secoTitle); rt('seco-sub',o.secoSub);
r('seco-grid',o.secoItems.map(i=>`
<div class="card seco-card card-hover">
<div class="tag tag-cyan mb12">${i.tag}</div>
<h4 style="margin-bottom:8px">${i.title}</h4>
<p style="font-size:14px">${i.desc}</p>
</div>`).join(''));

/* CONTACT */
rt('ct-eye',ct.eye);
r('ct-h1',ct.h1.split('\n').map((l,i)=>i===1?`<span class="gradient-text">${l}</span>`:l).join('<br>'));
rt('ct-intro',ct.intro); rt('ct-h2',ct.h2); rt('ct-sub',ct.sub);
r('ct-info',ct.info.map(i=>`
<div class="ci-item">
<div class="icon-box-sm ib-blue">${ICONS[i.icon]||''}</div>
<div><div class="ci-label">${i.label}</div>
${i.href?`<a href="${i.href}" ${i.href.startsWith('mailto')?'':'target="_blank"'} class="ci-val" style="color:var(--acl)">${i.val}</a>`:`<div class="ci-val">${i.val}</div>`}</div>
</div>`).join(''));
rt('ct-next-title',ct.nextTitle);
r('ct-next-list',ct.nextList.map(l=>`<li>${l}</li>`).join(''));
rt('form-title',ct.formTitle); rt('form-sub',ct.formSub);
rt('fl-fn',ct.fn); rt('fl-ln',ct.ln); rt('fl-em',ct.em); rt('fl-co',ct.co); rt('fl-nd',ct.nd); rt('fl-msg',ct.msg);
rt('form-submit-btn',ct.submitBtn);
const sel=document.getElementById('form-select');
if(sel){sel.innerHTML=ct.selectOpts.map(o=>`<option>${o}</option>`).join('')}
const ta=document.getElementById('fi-msg');
if(ta) ta.placeholder=ct.taph;

/* FOOTER */
rt('ftr-tagline',f.tagline); rt('ftr-cta',f.cta);
rt('ftr-nav-title',f.navTitle); rt('ftr-svc-title',f.svcTitle); rt('ftr-ct-title',f.ctTitle);
r('ftr-nav',f.navLinks.map(l=>`<a href="${PAGE_URLS[l.p]||'#'}${ls}">${l.l}</a>`).join(''));
r('ftr-svc',f.svcLinks.map(l=>`<a href="/services.html${ls}">${l}</a>`).join(''));
r('ftr-ct',f.ctLinks.map((l,i)=>{
if(l.includes('@')) return `<a href="mailto:${l}">${l}</a>`;
if(l.includes('{')) return `<a>${l}</a>`;
return `<a>${l}</a>`;
}).join(''));
rt('ftr-copy',f.copy); rt('ftr-right',f.right);

/* OFFER PAGES */
renderOffers(c);
renderSectors(c);
renderLogos();
}

/* ─── SECTOR SVG ILLUSTRATIONS ─── */
const SECTOR_SVG = {
recrutement:`<svg width="200" height="160" viewBox="0 0 200 160" fill="none"><circle cx="80" cy="45" r="18" fill="none" stroke="#3B82F6" stroke-width="1.5" opacity=".6"/><circle cx="80" cy="39" r="7" fill="#3B82F6" opacity=".25"/><path d="M68 57a12 12 0 0124 0" fill="#3B82F6" opacity=".15"/><circle cx="120" cy="45" r="18" fill="none" stroke="#3B82F6" stroke-width="1.5" opacity=".4"/><circle cx="120" cy="39" r="7" fill="#3B82F6" opacity=".15"/><path d="M108 57a12 12 0 0124 0" fill="#3B82F6" opacity=".1"/><rect x="50" y="90" width="100" height="35" rx="8" fill="none" stroke="#10B981" stroke-width="1.5" opacity=".5"/><path d="M70 103l8 8 16-16" stroke="#10B981" stroke-width="2" fill="none" opacity=".6"/></svg>`,
finance:`<svg width="200" height="160" viewBox="0 0 200 160" fill="none"><rect x="30" y="20" width="140" height="100" rx="10" fill="none" stroke="#06B6D4" stroke-width="1.5" opacity=".4"/><polyline points="45,90 75,65 105,50 135,35 155,40" fill="none" stroke="#06B6D4" stroke-width="2" opacity=".6"/><circle cx="105" cy="50" r="3" fill="#06B6D4" opacity=".5"/><circle cx="135" cy="35" r="3" fill="#06B6D4" opacity=".5"/></svg>`,
operations:`<svg width="200" height="160" viewBox="0 0 200 160" fill="none"><rect x="20" y="40" width="50" height="40" rx="8" fill="none" stroke="#10B981" stroke-width="1.5" opacity=".5"/><rect x="75" y="40" width="50" height="40" rx="8" fill="none" stroke="#10B981" stroke-width="1.5" opacity=".5"/><rect x="130" y="40" width="50" height="40" rx="8" fill="none" stroke="#10B981" stroke-width="1.5" opacity=".5"/><line x1="70" y1="60" x2="75" y2="60" stroke="#10B981" stroke-width="2" opacity=".4"/><line x1="125" y1="60" x2="130" y2="60" stroke="#10B981" stroke-width="2" opacity=".4"/><rect x="55" y="100" width="90" height="35" rx="8" fill="none" stroke="#3B82F6" stroke-width="1.5" opacity=".5"/></svg>`,
immobilier:`<svg width="200" height="160" viewBox="0 0 200 160" fill="none"><path d="M60 85V55l40-25 40 25v30z" fill="none" stroke="#3B82F6" stroke-width="1.5" opacity=".5"/><rect x="85" y="65" width="30" height="20" rx="2" fill="#3B82F6" opacity=".1"/><line x1="140" y1="60" x2="165" y2="60" stroke="#06B6D4" stroke-width="1.5" stroke-dasharray="4 3" opacity=".5"/><rect x="165" y="45" width="30" height="30" rx="6" fill="none" stroke="#06B6D4" stroke-width="1.5" opacity=".5"/></svg>`,
juridique:`<svg width="200" height="160" viewBox="0 0 200 160" fill="none"><line x1="100" y1="20" x2="100" y2="55" stroke="#3B82F6" stroke-width="2" opacity=".5"/><line x1="65" y1="35" x2="135" y2="35" stroke="#3B82F6" stroke-width="2" opacity=".5"/><circle cx="100" cy="20" r="6" fill="#3B82F6" opacity=".2"/><rect x="55" y="40" width="20" height="15" rx="3" fill="#3B82F6" opacity=".15"/><rect x="125" y="40" width="20" height="15" rx="3" fill="#3B82F6" opacity=".15"/><rect x="30" y="80" width="60" height="50" rx="8" fill="none" stroke="#06B6D4" stroke-width="1.5" opacity=".4"/><path d="M150 98l5 5 10-10" stroke="#10B981" stroke-width="1.5" fill="none" opacity=".5"/></svg>`,
sante:`<svg width="200" height="160" viewBox="0 0 200 160" fill="none"><rect x="85" y="25" width="30" height="30" rx="6" fill="none" stroke="#EF4444" stroke-width="1.5" opacity=".4"/><rect x="95" y="30" width="10" height="20" rx="2" fill="#EF4444" opacity=".2"/><rect x="90" y="35" width="20" height="10" rx="2" fill="#EF4444" opacity=".2"/><rect x="30" y="75" width="60" height="55" rx="10" fill="none" stroke="#3B82F6" stroke-width="1.5" opacity=".4"/><rect x="110" y="75" width="60" height="55" rx="10" fill="none" stroke="#10B981" stroke-width="1.5" opacity=".4"/><path d="M122 95h6M125 92v6" stroke="#10B981" stroke-width="1.5" opacity=".4"/><line x1="100" y1="55" x2="100" y2="75" stroke="#06B6D4" stroke-width="1.5" stroke-dasharray="4 3" opacity=".3"/></svg>`
};

/* ─── RENDER SECTOR PAGES ─── */
function renderSectors(c) {
const sec = c.sectors;
if(!sec) return;
const sectorKeys = ['recrutement','finance','operations','immobilier','juridique','sante'];
const painSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;

sectorKeys.forEach(key=>{
const d = sec.list[key];
if(!d) return;
const container = document.getElementById('sl-'+key);
if(!container) return;

container.innerHTML = `<section class="sl-hero z1"><div class="wrap"><div class="sl-hero-grid anim"><div><div class="sl-hero-badges">${sec.badges.map(b=>`<span class="tag tag-blue">${b}</span>`).join('')}</div><h1>${d.h1.split('\n').map((l,i)=>i===1?`<span class="gradient-text">${l}</span>`:l).join('<br>')}</h1><p class="lead mt16">${d.sub}</p></div><div class="sl-illustration">${SECTOR_SVG[key]||''}</div></div></div></section><div class="divider"></div><section class="sec z1"><div class="wrap"><div class="anim"><h2>${sec.painTitle}</h2><div class="sl-pain-grid">${d.pains.map(p=>`<div class="sl-pain-card"><div class="sl-pain-icon">${painSvg}</div><div class="sl-pain-title">${p.title}</div><p class="sl-pain-desc">${p.desc}</p></div>`).join('')}</div></div><div class="anim mt48"><h2>${sec.delivTitle}</h2><p class="mt12" style="font-size:16px;font-weight:600;color:var(--acl)">${d.solution}</p><div class="sl-ba-grid"><div class="sl-ba-col sl-ba-before"><div class="sl-ba-label">${sec.beforeLabel}</div><ul class="cross">${d.before.map(b=>`<li>${b}</li>`).join('')}</ul></div><div class="sl-ba-arrow">→</div><div class="sl-ba-col sl-ba-after"><div class="sl-ba-label">${sec.afterLabel}</div><ul class="check">${d.after.map(a=>`<li>${a}</li>`).join('')}</ul></div></div><div class="sl-metrics">${d.metrics.map(m=>`<div class="sl-metric"><div class="sl-metric-num">${m.num}</div><div class="sl-metric-lab">${m.lab}</div></div>`).join('')}</div></div><div class="anim mt48"><h2>${sec.processTitle}</h2><div class="sl-stepper">${sec.procSteps.map(s=>`<div class="sl-step"><div class="sl-step-dot">${ICONS[s.icon]||''}</div><div class="sl-step-title">${s.title}</div><div class="sl-step-day">${s.day}</div></div>`).join('')}</div></div><div class="sl-cta-box anim"><div class="ol-cta-group" style="margin-bottom:16px"><a href="https://cal.com/intelart/echange-decouverte-discovery-call" target="_blank" class="btn btn-primary btn-lg"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> ${sec.ctaCal}</a><a href="https://buy.stripe.com/test_7sY7sNdvddJf5Kn90J6wE02" target="_blank" class="btn btn-green btn-lg"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> ${sec.ctaPay}</a></div><div class="ol-trust-badges">${sec.trustBadges.map(b=>`<span class="ol-trust-badge">${b}</span>`).join('')}</div></div><div class="anim mt48"><h2>${sec.faqTitle}</h2><div class="ol-faq">${d.faqs.map(f=>`<div class="ol-faq-item"><div class="ol-faq-q">${f.q}</div><p class="ol-faq-a">${f.a}</p></div>`).join('')}</div></div></div></section><section class="sec-sm z1"><div class="wrap"><div class="cta-banner anim"><h2>${sec.ctaH2}</h2><p>${sec.ctaSub}</p><a href="https://cal.com/intelart/echange-decouverte-discovery-call" target="_blank" class="btn btn-primary btn-lg">${sec.ctaFinal}</a></div></div></section>`;
});
}

/* ─── RENDER OFFER PAGES ─── */
function renderOffers(c) {
const checkSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
const userSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--acl)" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
const delivSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;

function renderStdOffer(prefix, data, hasPayBtn) {
r(prefix+'-tags', data.tags.map((t,i)=>`<span class="tag ${i===0?'tag-blue':'tag-green'}">${t}</span>`).join(''));
r(prefix+'-h1', data.h1.split('\n').map((l,i)=>i===1?`<span class="gradient-text">${l}</span>`:l).join('<br>'));
rt(prefix+'-sub', data.sub);
rt(prefix+'-inc-title', data.incTitle);
r(prefix+'-includes', data.includes.map(i=>`<div class="ol-inc-item">${checkSvg}<div><div class="ol-inc-title">${i.title}</div><p style="font-size:13px;color:var(--muted);margin:4px 0 0">${i.desc}</p></div></div>`).join(''));
if(data.forTitle){
rt(prefix+'-for-title', data.forTitle);
r(prefix+'-for', data.forItems.map(i=>`<div class="ol-for-item">${userSvg}<span>${i}</span></div>`).join(''));
}
if(data.delivTitle && data.deliverables){
rt(prefix+'-deliv-title', data.delivTitle);
r(prefix+'-deliverables', data.deliverables.map(d=>`<div class="ol-deliv-item">${delivSvg}<span style="font-size:14px;color:var(--muted)">${d}</span></div>`).join(''));
}
rt(prefix+'-price', data.price);
rt(prefix+'-price-sub', data.priceSub);
if(hasPayBtn && data.ctaPay) rt(prefix+'-cta-pay-txt', data.ctaPay);
if(data.ctaCal) rt(prefix+'-cta-cal-txt', data.ctaCal);
r(prefix+'-trust', data.trustBadges.map(b=>`<span class="ol-trust-badge">${b}</span>`).join(''));
if(data.faqTitle) {
rt(prefix+'-faq-title', data.faqTitle);
r(prefix+'-faq', data.faqs.map(f=>`<div class="ol-faq-item"><div class="ol-faq-q">${f.q}</div><p class="ol-faq-a">${f.a}</p></div>`).join(''));
}
rt(prefix+'-cta-h2', data.ctaH2); rt(prefix+'-cta-sub', data.ctaSub); rt(prefix+'-cta-final', data.ctaFinal);
}

/* Sprint */
renderStdOffer('os', c.offreSprint, true);
/* Audit */
renderStdOffer('oa', c.offreAudit, true);
/* Consulting — no pay button */
renderStdOffer('oc', c.offreConsulting, false);

/* Agent IA */
const ag = c.offreAgent;
r('oag-tags', ag.tags.map((t,i)=>`<span class="tag ${i===0?'tag-blue':i===1?'tag-cyan':'tag-green'}">${t}</span>`).join(''));
r('oag-h1', ag.h1.split('\n').map((l,i)=>i===1?`<span class="gradient-text">${l}</span>`:l).join('<br>'));
rt('oag-sub', ag.sub);
rt('oag-inc-title', ag.incTitle);
r('oag-includes', ag.includes.map(i=>`<div class="ol-inc-item">${checkSvg}<div><div class="ol-inc-title">${i.title}</div><p style="font-size:13px;color:var(--muted);margin:4px 0 0">${i.desc}</p></div></div>`).join(''));
rt('oag-for-title', ag.forTitle);
r('oag-for', ag.forItems.map(i=>`<div class="ol-for-item">${userSvg}<span>${i}</span></div>`).join(''));
rt('oag-proc-title', ag.procTitle);
r('oag-process', ag.process.map(p=>`<div class="ol-proc-step"><div class="ol-proc-num">${p.num}</div><div class="ol-proc-title">${p.title}</div><div class="ol-proc-desc">${p.desc}</div></div>`).join(''));
rt('oag-price', ag.price); rt('oag-price-sub', ag.priceSub);
rt('oag-cta-cal-txt', ag.ctaCal);
r('oag-trust', ag.trustBadges.map(b=>`<span class="ol-trust-badge">${b}</span>`).join(''));
rt('oag-faq-title', ag.faqTitle);
r('oag-faq', ag.faqs.map(f=>`<div class="ol-faq-item"><div class="ol-faq-q">${f.q}</div><p class="ol-faq-a">${f.a}</p></div>`).join(''));
rt('oag-cta-h2', ag.ctaH2); rt('oag-cta-sub', ag.ctaSub); rt('oag-cta-final', ag.ctaFinal);

/* Sur Mesure */
const sm = c.offreSurMesure;
r('osm-tags', sm.tags.map((t,i)=>`<span class="tag ${i===0?'tag-blue':'tag-cyan'}">${t}</span>`).join(''));
r('osm-h1', sm.h1.split('\n').map((l,i)=>i===1?`<span class="gradient-text">${l}</span>`:l).join('<br>'));
rt('osm-sub', sm.sub);
rt('osm-proc-title', sm.procTitle);
r('osm-process', sm.process.map(p=>`<div class="ol-proc-step"><div class="ol-proc-num">${p.num}</div><div class="ol-proc-title">${p.title}</div><div class="ol-proc-desc">${p.desc}</div></div>`).join(''));
rt('osm-inc-title', sm.incTitle);
r('osm-includes', sm.includes.map(i=>`<div class="ol-inc-item">${checkSvg}<div><div class="ol-inc-title">${i.title}</div><p style="font-size:13px;color:var(--muted);margin:4px 0 0">${i.desc}</p></div></div>`).join(''));
/* Sur Mesure form */
rt('osm-form-title', sm.formTitle); rt('osm-form-sub', sm.formSub);
rt('smfl-name', sm.fields.name); rt('smfl-email', sm.fields.email);
rt('smfl-company', sm.fields.company); rt('smfl-sector', sm.fields.sector);
rt('smfl-desc', sm.fields.desc); rt('smfl-budget', sm.fields.budget);
rt('smfl-delay', sm.fields.delay); rt('smfl-ai', sm.fields.ai);
const smSector = document.getElementById('sm-sector');
if(smSector) smSector.innerHTML = sm.sectorOpts.map(o=>`<option>${o}</option>`).join('');
const smBudget = document.getElementById('sm-budget');
if(smBudget) smBudget.innerHTML = sm.budgetOpts.map(o=>`<option>${o}</option>`).join('');
const smDesc = document.getElementById('sm-desc');
if(smDesc) smDesc.placeholder = sm.descPh;
r('sm-ai-opts', sm.aiOpts.map(o=>`<span class="radio-opt" data-radio>${o}</span>`).join(''));
/* Attach radio click listeners after render */
document.querySelectorAll('.radio-opt[data-radio]').forEach(el=>{
  el.addEventListener('click',()=>{ if(typeof selectRadio==='function') selectRadio(el); });
});
rt('sm-submit-btn', sm.submitBtn);
rt('osm-faq-title', sm.faqTitle);
r('osm-faq', sm.faqs.map(f=>`<div class="ol-faq-item"><div class="ol-faq-q">${f.q}</div><p class="ol-faq-a">${f.a}</p></div>`).join(''));
rt('osm-cta-h2', sm.ctaH2); rt('osm-cta-sub', sm.ctaSub); rt('osm-cta-final', sm.ctaFinal);
}

/* ─── ROUTING ─── */
function go(page) {
/* MPA: redirect to the real page URL */
const url = PAGE_URLS[page];
if(!url) return;
const langSuffix = lang === 'en' ? '?lang=en' : '';
window.location.href = url + langSuffix;
}

/* ─── LANG ─── */
function setLang(l) {
lang=l;
try{localStorage.setItem('intelart-lang',l)}catch(e){}
document.documentElement.lang=l==='fr'?'fr-CA':'en-CA';
document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('act',b.textContent===l.toUpperCase()));
/* MPA: update URL with lang param */
const url = new URL(window.location.href);
if(l==='en') url.searchParams.set('lang','en');
else url.searchParams.delete('lang');
window.history.replaceState(null,'',url.toString());
/* Update SEO meta from C object */
const m = C[l] && C[l].meta && C[l].meta[curPage];
if(m){
  document.getElementById('pg-title').textContent=m.title;
  document.getElementById('pg-desc').setAttribute('content',m.desc);
  const ogT=document.getElementById('og-title');if(ogT)ogT.setAttribute('content',m.title);
  const ogD=document.getElementById('og-desc');if(ogD)ogD.setAttribute('content',m.desc);
  if(m.keys){const kEl=document.getElementById('pg-keys');if(kEl)kEl.setAttribute('content',m.keys);}
  const ogLocale=document.querySelector('meta[property="og:locale"]');
  if(ogLocale) ogLocale.setAttribute('content',l==='fr'?'fr_CA':'en_CA');
  const twT=document.querySelector('meta[name="twitter:title"]');if(twT)twT.setAttribute('content',m.title);
  const twD=document.querySelector('meta[name="twitter:description"]');if(twD)twD.setAttribute('content',m.desc);
  const jsonLd=document.querySelector('script[type="application/ld+json"]');
  if(jsonLd){try{const ld=JSON.parse(jsonLd.textContent);ld.description=m.desc;jsonLd.textContent=JSON.stringify(ld);}catch(e){}}
}
/* Toggle .lang-fr / .lang-en inline blocks */
document.querySelectorAll('.lang-fr').forEach(el=>el.style.display=l==='fr'?'':'none');
document.querySelectorAll('.lang-en').forEach(el=>el.style.display=l==='en'?'':'none');
if(typeof updateChatLang==='function') updateChatLang();
}

/* ─── MOBILE MENU ─── */
function toggleMob(){
const m=document.getElementById('mobMenu');
if(!m) return;
m.classList.toggle('open');
const hamEl=document.getElementById('hamb');
if(hamEl) hamEl.setAttribute('aria-expanded', m.classList.contains('open'));
}
function toggleMobSection(el){
el.classList.toggle('open');
const items = el.nextElementSibling;
items.classList.toggle('open');
el.setAttribute('aria-expanded', el.classList.contains('open'));
}

/* ─── SCROLL ─── */
window.addEventListener('scroll',()=>{
/* Header shadow */
const hdrEl=document.getElementById('hdr');
if(hdrEl) hdrEl.classList.toggle('scrolled',window.scrollY>10);
/* Progress bar */
const h = document.documentElement.scrollHeight - window.innerHeight;
const pct = h>0 ? (window.scrollY/h)*100 : 0;
const progEl=document.getElementById('progress-bar');
if(progEl) progEl.style.width = pct+'%';
/* Scroll indicator hide */
if(!scrollIndicatorHidden && window.scrollY>50){
scrollIndicatorHidden=true;
const si=document.getElementById('scrollInd');
if(si) si.classList.add('hidden');
}
});

/* ─── ANIMATIONS ─── */
function initAnims(){
setTimeout(()=>{
document.querySelectorAll('.anim').forEach(el=>{
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}});
},{threshold:.05});
el.classList.remove('visible');
obs.observe(el);
});
},50);
}

/* ─── ANIMATED COUNTERS ─── */
function initCounters(){
document.querySelectorAll('.counter').forEach(el=>{
if(el.dataset.animated) return;
const obs = new IntersectionObserver(entries=>{
entries.forEach(e=>{
  if(e.isIntersecting && !el.dataset.animated){
    el.dataset.animated='1';
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix||'';
    const prefix = el.dataset.prefix||'';
    const duration = 1500;
    const start = performance.now();
    function tick(now){
      const elapsed = now - start;
      const progress = Math.min(elapsed/duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = prefix + current + suffix;
      if(progress<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    obs.unobserve(el);
  }
});
},{threshold:.05});
obs.observe(el);
});
}

/* ─── STEPPER ANIMATION ─── */
function initStepper(){
const steps = document.querySelectorAll('.stepper-step');
const progress = document.getElementById('stepper-progress');
if(!steps.length) return;
steps.forEach(step=>{
const obs = new IntersectionObserver(entries=>{
entries.forEach(e=>{
  if(e.isIntersecting){
    e.target.classList.add('active');
    /* Update progress bar */
    const activeCount = document.querySelectorAll('.stepper-step.active').length;
    const total = steps.length;
    if(progress) progress.style.width = ((activeCount/total)*100)+'%';
    obs.unobserve(e.target);
  }
});
},{threshold:.3});
obs.observe(step);
});
}

/* ─── HERO DEMO COUNTER ─── */
function initDemoCounters(){
const counters = document.querySelectorAll('.demo-counter');
counters.forEach(el=>{
  const from = parseInt(el.dataset.from)||0;
  const to = parseInt(el.dataset.to)||42;
  function loop(){
    let current = from;
    const duration = 3000;
    const start = performance.now();
    function tick(now){
      const elapsed = now - start;
      const progress = Math.min(elapsed/duration,1);
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(from + (to - from) * eased);
      el.textContent = current;
      if(progress<1) requestAnimationFrame(tick);
      else setTimeout(()=>{ el.textContent = from; loop(); }, 2000);
    }
    requestAnimationFrame(tick);
  }
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ loop(); obs.unobserve(el); }
    });
  },{threshold:.1});
  obs.observe(el);
});
}

/* ─── STAGGER REVEAL ─── */
function initStagger(){
document.querySelectorAll('.social-grid,.wwd-grid,.usecase-grid,.svc-grid,.benefits-grid').forEach(grid=>{
  const children = grid.children;
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        Array.from(children).forEach((child,i)=>{
          child.classList.add('stagger-child');
          setTimeout(()=>child.classList.add('visible'), i*120);
        });
        obs.unobserve(e.target);
      }
    });
  },{threshold:.05});
  obs.observe(grid);
});
}

/* ─── CARD 3D TILT ─── */
function initCardTilt(){
document.querySelectorAll('.testimonial-card,.usecase-card,.svc-card').forEach(card=>{
  card.addEventListener('mousemove',e=>{
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left)/rect.width - .5;
    const y = (e.clientY - rect.top)/rect.height - .5;
    card.style.transform = `perspective(600px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave',()=>{
    card.style.transform = '';
  });
});
}

/* ─── FORM VALIDATION → moved to js/form.js ─── */

/* ─── LOGOS PAGE ─── */
const LOGO_VARIANTS = {
a: {
name:'Variante A — Hexagone Neural',
desc:{fr:'Concept actuel épuré : lignes fines, nœuds discrets, dégradé bleu→cyan sur les connexions.',en:'Refined current concept: thin lines, discrete nodes, blue→cyan gradient on connections.'},
dark: function(s){return `<svg width="${s}" height="${s}" viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="16" fill="#1E3A8A"/><defs><linearGradient id="lgA" x1="16" y1="12" x2="64" y2="68"><stop offset="0%" stop-color="#60A5FA"/><stop offset="100%" stop-color="#06B6D4"/></linearGradient></defs><polygon points="40,12 64,26 64,54 40,68 16,54 16,26" fill="none" stroke="url(#lgA)" stroke-width="1.2"/><circle cx="40" cy="12" r="2.5" fill="#60A5FA"/><circle cx="64" cy="26" r="2.5" fill="#3B82F6"/><circle cx="64" cy="54" r="2.5" fill="#06B6D4"/><circle cx="40" cy="68" r="2.5" fill="#06B6D4"/><circle cx="16" cy="54" r="2.5" fill="#3B82F6"/><circle cx="16" cy="26" r="2.5" fill="#60A5FA"/><circle cx="40" cy="40" r="4" fill="#3B82F6"/><line x1="40" y1="12" x2="40" y2="36" stroke="url(#lgA)" stroke-width="0.8" opacity="0.5"/><line x1="64" y1="26" x2="44" y2="38" stroke="url(#lgA)" stroke-width="0.8" opacity="0.5"/><line x1="64" y1="54" x2="44" y2="42" stroke="url(#lgA)" stroke-width="0.8" opacity="0.5"/><line x1="40" y1="68" x2="40" y2="44" stroke="url(#lgA)" stroke-width="0.8" opacity="0.5"/><line x1="16" y1="54" x2="36" y2="42" stroke="url(#lgA)" stroke-width="0.8" opacity="0.5"/><line x1="16" y1="26" x2="36" y2="38" stroke="url(#lgA)" stroke-width="0.8" opacity="0.5"/></svg>`;},
light: function(s){return `<svg width="${s}" height="${s}" viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="16" fill="#1E3A8A"/><defs><linearGradient id="lgAl" x1="16" y1="12" x2="64" y2="68"><stop offset="0%" stop-color="#3B82F6"/><stop offset="100%" stop-color="#0891B2"/></linearGradient></defs><polygon points="40,12 64,26 64,54 40,68 16,54 16,26" fill="none" stroke="url(#lgAl)" stroke-width="1.2"/><circle cx="40" cy="12" r="2.5" fill="#3B82F6"/><circle cx="64" cy="26" r="2.5" fill="#2563EB"/><circle cx="64" cy="54" r="2.5" fill="#0891B2"/><circle cx="40" cy="68" r="2.5" fill="#0891B2"/><circle cx="16" cy="54" r="2.5" fill="#2563EB"/><circle cx="16" cy="26" r="2.5" fill="#3B82F6"/><circle cx="40" cy="40" r="4" fill="#2563EB"/><line x1="40" y1="12" x2="40" y2="36" stroke="url(#lgAl)" stroke-width="0.8" opacity="0.5"/><line x1="64" y1="26" x2="44" y2="38" stroke="url(#lgAl)" stroke-width="0.8" opacity="0.5"/><line x1="64" y1="54" x2="44" y2="42" stroke="url(#lgAl)" stroke-width="0.8" opacity="0.5"/><line x1="40" y1="68" x2="40" y2="44" stroke="url(#lgAl)" stroke-width="0.8" opacity="0.5"/><line x1="16" y1="54" x2="36" y2="42" stroke="url(#lgAl)" stroke-width="0.8" opacity="0.5"/><line x1="16" y1="26" x2="36" y2="38" stroke="url(#lgAl)" stroke-width="0.8" opacity="0.5"/></svg>`;},
fav: function(){return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#1E3A8A"/><polygon points="24,8 36,16 36,32 24,40 12,32 12,16" fill="none" stroke="#60A5FA" stroke-width="1"/><circle cx="24" cy="24" r="3" fill="#3B82F6"/></svg>`;},
text:'INTELART'
},
b: {
name:'Variante B — Monogramme "IA" Géométrique',
desc:{fr:'Lettres I et A fusionnées en lignes droites. Style blueprint tech, lisible en très petit.',en:'I and A letters fused in straight lines. Tech blueprint style, readable at very small sizes.'},
dark: function(s){return `<svg width="${s}" height="${s}" viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="16" fill="#0F172A"/><defs><linearGradient id="lgB" x1="18" y1="20" x2="62" y2="60"><stop offset="0%" stop-color="#60A5FA"/><stop offset="100%" stop-color="#06B6D4"/></linearGradient></defs><line x1="24" y1="20" x2="24" y2="60" stroke="url(#lgB)" stroke-width="3" stroke-linecap="round"/><line x1="18" y1="20" x2="30" y2="20" stroke="url(#lgB)" stroke-width="2.5" stroke-linecap="round"/><line x1="18" y1="60" x2="30" y2="60" stroke="url(#lgB)" stroke-width="2.5" stroke-linecap="round"/><line x1="40" y1="60" x2="50" y2="20" stroke="url(#lgB)" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="20" x2="60" y2="60" stroke="url(#lgB)" stroke-width="3" stroke-linecap="round"/><line x1="43" y1="46" x2="57" y2="46" stroke="url(#lgB)" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="40" x2="40" y2="40" stroke="rgba(96,165,250,0.3)" stroke-width="1" stroke-dasharray="3 3"/></svg>`;},
light: function(s){return `<svg width="${s}" height="${s}" viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="16" fill="#E0E7FF"/><defs><linearGradient id="lgBl" x1="18" y1="20" x2="62" y2="60"><stop offset="0%" stop-color="#2563EB"/><stop offset="100%" stop-color="#0891B2"/></linearGradient></defs><line x1="24" y1="20" x2="24" y2="60" stroke="url(#lgBl)" stroke-width="3" stroke-linecap="round"/><line x1="18" y1="20" x2="30" y2="20" stroke="url(#lgBl)" stroke-width="2.5" stroke-linecap="round"/><line x1="18" y1="60" x2="30" y2="60" stroke="url(#lgBl)" stroke-width="2.5" stroke-linecap="round"/><line x1="40" y1="60" x2="50" y2="20" stroke="url(#lgBl)" stroke-width="3" stroke-linecap="round"/><line x1="50" y1="20" x2="60" y2="60" stroke="url(#lgBl)" stroke-width="3" stroke-linecap="round"/><line x1="43" y1="46" x2="57" y2="46" stroke="url(#lgBl)" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="40" x2="40" y2="40" stroke="rgba(37,99,235,0.3)" stroke-width="1" stroke-dasharray="3 3"/></svg>`;},
fav: function(){return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#0F172A"/><line x1="13" y1="12" x2="13" y2="36" stroke="#60A5FA" stroke-width="2.5" stroke-linecap="round"/><line x1="9" y1="12" x2="17" y2="12" stroke="#60A5FA" stroke-width="2" stroke-linecap="round"/><line x1="9" y1="36" x2="17" y2="36" stroke="#60A5FA" stroke-width="2" stroke-linecap="round"/><line x1="24" y1="36" x2="30" y2="12" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/><line x1="30" y1="12" x2="36" y2="36" stroke="#06B6D4" stroke-width="2.5" stroke-linecap="round"/><line x1="26" y1="28" x2="34" y2="28" stroke="#06B6D4" stroke-width="1.5" stroke-linecap="round"/></svg>`;},
text:'IA'
},
c: {
name:'Variante C — Circuit Imprimé Lettre I',
desc:{fr:'Lettre I avec traces de circuit imprimé intégrées. Style PCB moderne, très lisible en petit.',en:'Letter I with integrated circuit board traces. Modern PCB style, very readable at small sizes.'},
dark: function(s){return `<svg width="${s}" height="${s}" viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="16" fill="#0A1628"/><rect x="32" y="16" width="16" height="48" rx="2" fill="none" stroke="#3B82F6" stroke-width="1.5"/><line x1="32" y1="28" x2="16" y2="28" stroke="#06B6D4" stroke-width="1.2"/><circle cx="16" cy="28" r="2.5" fill="#06B6D4"/><line x1="48" y1="28" x2="64" y2="28" stroke="#06B6D4" stroke-width="1.2"/><circle cx="64" cy="28" r="2.5" fill="#06B6D4"/><line x1="32" y1="40" x2="20" y2="40" stroke="#60A5FA" stroke-width="1.2"/><line x1="20" y1="40" x2="20" y2="52" stroke="#60A5FA" stroke-width="1.2"/><circle cx="20" cy="52" r="2.5" fill="#60A5FA"/><line x1="48" y1="40" x2="60" y2="40" stroke="#60A5FA" stroke-width="1.2"/><line x1="60" y1="40" x2="60" y2="52" stroke="#60A5FA" stroke-width="1.2"/><circle cx="60" cy="52" r="2.5" fill="#60A5FA"/><line x1="32" y1="52" x2="24" y2="52" stroke="#3B82F6" stroke-width="1.2"/><line x1="24" y1="52" x2="24" y2="64" stroke="#3B82F6" stroke-width="1.2"/><circle cx="24" cy="64" r="2.5" fill="#3B82F6"/><line x1="48" y1="52" x2="56" y2="52" stroke="#3B82F6" stroke-width="1.2"/><line x1="56" y1="52" x2="56" y2="64" stroke="#3B82F6" stroke-width="1.2"/><circle cx="56" cy="64" r="2.5" fill="#3B82F6"/><rect x="36" y="22" width="8" height="4" rx="1" fill="#3B82F6" opacity="0.3"/><rect x="36" y="34" width="8" height="4" rx="1" fill="#3B82F6" opacity="0.3"/><rect x="36" y="46" width="8" height="4" rx="1" fill="#3B82F6" opacity="0.3"/></svg>`;},
light: function(s){return `<svg width="${s}" height="${s}" viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="16" fill="#EFF6FF"/><rect x="32" y="16" width="16" height="48" rx="2" fill="none" stroke="#2563EB" stroke-width="1.5"/><line x1="32" y1="28" x2="16" y2="28" stroke="#0891B2" stroke-width="1.2"/><circle cx="16" cy="28" r="2.5" fill="#0891B2"/><line x1="48" y1="28" x2="64" y2="28" stroke="#0891B2" stroke-width="1.2"/><circle cx="64" cy="28" r="2.5" fill="#0891B2"/><line x1="32" y1="40" x2="20" y2="40" stroke="#2563EB" stroke-width="1.2"/><line x1="20" y1="40" x2="20" y2="52" stroke="#2563EB" stroke-width="1.2"/><circle cx="20" cy="52" r="2.5" fill="#2563EB"/><line x1="48" y1="40" x2="60" y2="40" stroke="#2563EB" stroke-width="1.2"/><line x1="60" y1="40" x2="60" y2="52" stroke="#2563EB" stroke-width="1.2"/><circle cx="60" cy="52" r="2.5" fill="#2563EB"/><line x1="32" y1="52" x2="24" y2="52" stroke="#1D4ED8" stroke-width="1.2"/><line x1="24" y1="52" x2="24" y2="64" stroke="#1D4ED8" stroke-width="1.2"/><circle cx="24" cy="64" r="2.5" fill="#1D4ED8"/><line x1="48" y1="52" x2="56" y2="52" stroke="#1D4ED8" stroke-width="1.2"/><line x1="56" y1="52" x2="56" y2="64" stroke="#1D4ED8" stroke-width="1.2"/><circle cx="56" cy="64" r="2.5" fill="#1D4ED8"/><rect x="36" y="22" width="8" height="4" rx="1" fill="#2563EB" opacity="0.2"/><rect x="36" y="34" width="8" height="4" rx="1" fill="#2563EB" opacity="0.2"/><rect x="36" y="46" width="8" height="4" rx="1" fill="#2563EB" opacity="0.2"/></svg>`;},
fav: function(){return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#0A1628"/><rect x="18" y="8" width="12" height="32" rx="2" fill="none" stroke="#3B82F6" stroke-width="1.2"/><line x1="18" y1="18" x2="8" y2="18" stroke="#06B6D4" stroke-width="1"/><circle cx="8" cy="18" r="2" fill="#06B6D4"/><line x1="30" y1="18" x2="40" y2="18" stroke="#06B6D4" stroke-width="1"/><circle cx="40" cy="18" r="2" fill="#06B6D4"/><line x1="18" y1="30" x2="12" y2="30" stroke="#60A5FA" stroke-width="1"/><circle cx="12" cy="30" r="2" fill="#60A5FA"/><line x1="30" y1="30" x2="36" y2="30" stroke="#60A5FA" stroke-width="1"/><circle cx="36" cy="30" r="2" fill="#60A5FA"/></svg>`;},
text:'INTELART'
},
d: {
name:'Variante D — Orbite de Données',
desc:{fr:'Cercle central avec 2-3 orbites elliptiques et nœuds de données. Style cosmos / data flow.',en:'Central circle with 2-3 elliptical orbits and data nodes. Cosmos / data flow style.'},
dark: function(s){return `<svg width="${s}" height="${s}" viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="16" fill="#0B1120"/><circle cx="40" cy="40" r="6" fill="#3B82F6"/><circle cx="40" cy="40" r="5" fill="#1E3A8A"/><circle cx="40" cy="40" r="2.5" fill="#60A5FA"/><ellipse cx="40" cy="40" rx="24" ry="10" fill="none" stroke="#3B82F6" stroke-width="0.8" opacity="0.5" transform="rotate(-20 40 40)"/><ellipse cx="40" cy="40" rx="28" ry="8" fill="none" stroke="#06B6D4" stroke-width="0.8" opacity="0.4" transform="rotate(25 40 40)"/><ellipse cx="40" cy="40" rx="20" ry="12" fill="none" stroke="#60A5FA" stroke-width="0.8" opacity="0.3" transform="rotate(-50 40 40)"/><circle cx="18" cy="34" r="2.5" fill="#60A5FA"/><circle cx="58" cy="32" r="2" fill="#06B6D4"/><circle cx="52" cy="56" r="2.5" fill="#3B82F6"/><circle cx="24" cy="54" r="2" fill="#06B6D4"/><circle cx="62" cy="46" r="1.5" fill="#60A5FA" opacity="0.7"/><circle cx="30" cy="22" r="1.5" fill="#3B82F6" opacity="0.7"/></svg>`;},
light: function(s){return `<svg width="${s}" height="${s}" viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="16" fill="#EFF6FF"/><circle cx="40" cy="40" r="6" fill="#2563EB"/><circle cx="40" cy="40" r="5" fill="#DBEAFE"/><circle cx="40" cy="40" r="2.5" fill="#2563EB"/><ellipse cx="40" cy="40" rx="24" ry="10" fill="none" stroke="#2563EB" stroke-width="0.8" opacity="0.4" transform="rotate(-20 40 40)"/><ellipse cx="40" cy="40" rx="28" ry="8" fill="none" stroke="#0891B2" stroke-width="0.8" opacity="0.35" transform="rotate(25 40 40)"/><ellipse cx="40" cy="40" rx="20" ry="12" fill="none" stroke="#3B82F6" stroke-width="0.8" opacity="0.3" transform="rotate(-50 40 40)"/><circle cx="18" cy="34" r="2.5" fill="#2563EB"/><circle cx="58" cy="32" r="2" fill="#0891B2"/><circle cx="52" cy="56" r="2.5" fill="#1D4ED8"/><circle cx="24" cy="54" r="2" fill="#0891B2"/></svg>`;},
fav: function(){return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#0B1120"/><circle cx="24" cy="24" r="4" fill="#3B82F6"/><circle cx="24" cy="24" r="2" fill="#60A5FA"/><ellipse cx="24" cy="24" rx="16" ry="6" fill="none" stroke="#3B82F6" stroke-width="0.8" opacity="0.5" transform="rotate(-20 24 24)"/><ellipse cx="24" cy="24" rx="18" ry="5" fill="none" stroke="#06B6D4" stroke-width="0.8" opacity="0.4" transform="rotate(25 24 24)"/><circle cx="10" cy="20" r="2" fill="#60A5FA"/><circle cx="36" cy="18" r="1.5" fill="#06B6D4"/></svg>`;},
text:'INTELART'
},
e: {
name:'Variante E — Losange IA',
desc:{fr:'Forme losange avec grille intérieure type puce IA activée. Moderne, carré, mémorable.',en:'Diamond shape with interior grid like an activated AI chip. Modern, square, memorable.'},
dark: function(s){return `<svg width="${s}" height="${s}" viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="16" fill="#0C1222"/><rect x="40" y="12" width="28" height="28" rx="2" fill="none" stroke="#3B82F6" stroke-width="1.2" transform="rotate(45 40 40)"/><rect x="40" y="24" width="16" height="16" rx="1" fill="none" stroke="#60A5FA" stroke-width="0.8" transform="rotate(45 40 40)" opacity="0.5"/><rect x="37" y="37" width="6" height="6" rx="1" fill="#3B82F6" opacity="0.8"/><rect x="30" y="37" width="4" height="4" rx="0.5" fill="#06B6D4" opacity="0.5"/><rect x="46" y="37" width="4" height="4" rx="0.5" fill="#06B6D4" opacity="0.5"/><rect x="37" y="30" width="4" height="4" rx="0.5" fill="#60A5FA" opacity="0.5"/><rect x="37" y="46" width="4" height="4" rx="0.5" fill="#60A5FA" opacity="0.5"/><rect x="31" y="31" width="3" height="3" rx="0.5" fill="#3B82F6" opacity="0.3"/><rect x="46" y="31" width="3" height="3" rx="0.5" fill="#3B82F6" opacity="0.3"/><rect x="31" y="46" width="3" height="3" rx="0.5" fill="#3B82F6" opacity="0.3"/><rect x="46" y="46" width="3" height="3" rx="0.5" fill="#3B82F6" opacity="0.3"/><line x1="40" y1="14" x2="40" y2="26" stroke="#3B82F6" stroke-width="0.6" opacity="0.3"/><line x1="40" y1="54" x2="40" y2="66" stroke="#3B82F6" stroke-width="0.6" opacity="0.3"/><line x1="14" y1="40" x2="26" y2="40" stroke="#3B82F6" stroke-width="0.6" opacity="0.3"/><line x1="54" y1="40" x2="66" y2="40" stroke="#3B82F6" stroke-width="0.6" opacity="0.3"/></svg>`;},
light: function(s){return `<svg width="${s}" height="${s}" viewBox="0 0 80 80" fill="none"><rect width="80" height="80" rx="16" fill="#F0F4FF"/><rect x="40" y="12" width="28" height="28" rx="2" fill="none" stroke="#2563EB" stroke-width="1.2" transform="rotate(45 40 40)"/><rect x="40" y="24" width="16" height="16" rx="1" fill="none" stroke="#3B82F6" stroke-width="0.8" transform="rotate(45 40 40)" opacity="0.4"/><rect x="37" y="37" width="6" height="6" rx="1" fill="#2563EB" opacity="0.8"/><rect x="30" y="37" width="4" height="4" rx="0.5" fill="#0891B2" opacity="0.4"/><rect x="46" y="37" width="4" height="4" rx="0.5" fill="#0891B2" opacity="0.4"/><rect x="37" y="30" width="4" height="4" rx="0.5" fill="#3B82F6" opacity="0.4"/><rect x="37" y="46" width="4" height="4" rx="0.5" fill="#3B82F6" opacity="0.4"/><rect x="31" y="31" width="3" height="3" rx="0.5" fill="#2563EB" opacity="0.2"/><rect x="46" y="31" width="3" height="3" rx="0.5" fill="#2563EB" opacity="0.2"/><rect x="31" y="46" width="3" height="3" rx="0.5" fill="#2563EB" opacity="0.2"/><rect x="46" y="46" width="3" height="3" rx="0.5" fill="#2563EB" opacity="0.2"/></svg>`;},
fav: function(){return `<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="10" fill="#0C1222"/><rect x="24" y="8" width="16" height="16" rx="1.5" fill="none" stroke="#3B82F6" stroke-width="1" transform="rotate(45 24 24)"/><rect x="22" y="22" width="4" height="4" rx="0.5" fill="#3B82F6"/><rect x="18" y="22" width="2.5" height="2.5" rx="0.5" fill="#06B6D4" opacity="0.5"/><rect x="27" y="22" width="2.5" height="2.5" rx="0.5" fill="#06B6D4" opacity="0.5"/><rect x="22" y="18" width="2.5" height="2.5" rx="0.5" fill="#60A5FA" opacity="0.5"/><rect x="22" y="27" width="2.5" height="2.5" rx="0.5" fill="#60A5FA" opacity="0.5"/></svg>`;},
text:'INTELART'
}
};

function renderLogos(){
const l = lang||'fr';
document.getElementById('lg-back-txt').textContent = l==='fr'?'Retour au site':'Back to site';
document.getElementById('lg-title').textContent = l==='fr'?'Variantes Logo Intelart':'Intelart Logo Variants';
document.getElementById('lg-sub').textContent = l==='fr'?'5 propositions de logos — choisissez votre préférée.':'5 logo proposals — pick your favorite.';

const grid = document.getElementById('lg-grid');
grid.innerHTML = '';
const keys = ['a','b','c','d','e'];
keys.forEach(k=>{
const v = LOGO_VARIANTS[k];
const card = document.createElement('div');
card.className = 'lg-card';
const logoSize = 80;
card.innerHTML=`<h2>${v.name}</h2><p class="lg-desc">${v.desc[l]}</p><div class="lg-variants"><div class="lg-box lg-box-dark">${v.dark(logoSize)}<span class="lg-box-label" style="color:rgba(255,255,255,0.5)">${v.text}</span><span class="lg-box-label">Dark</span></div><div class="lg-box lg-box-light">${v.light(logoSize)}<span class="lg-box-label" style="color:#1E293B">${v.text}</span><span class="lg-box-label">Light</span></div><div class="lg-box lg-box-fav">${v.fav()}<span class="lg-box-label">Favicon 48×48</span></div></div>`;
grid.appendChild(card);
});
}

/* ─── INIT ─── */
/* MPA: read page ID from <html data-page="..."> and detect lang from URL */
curPage = document.documentElement.dataset.page || (typeof PAGE_ID !== 'undefined' ? PAGE_ID : curPage);
/* Set initial lang button state */
document.documentElement.lang = lang==='fr'?'fr-CA':'en-CA';
document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('act',b.textContent===lang.toUpperCase()));
/* Highlight active nav link */
document.querySelectorAll('.nav-links a[data-p]').forEach(a=>{
  a.classList.toggle('act',a.dataset.p===curPage);
});

/* Apply initial language from URL param or localStorage */
if(typeof initLang !== 'undefined' && initLang !== 'fr') setLang(initLang);
try{ render(); }catch(e){ console.error('render:',e); }
initAnims();

/* Init counters, stepper, and enhanced animations after first paint */
setTimeout(()=>{
try{
initCounters();
initStepper();
initDemoCounters();
initStagger();
initCardTilt();
}catch(e){ console.error('init:',e); }
},200);

/* ─── EVENT LISTENERS (replaces inline onclick) ─── */
/* Lang buttons */
document.querySelectorAll('.lang-btn[data-lang]').forEach(btn=>{
  btn.addEventListener('click',()=>setLang(btn.dataset.lang));
});
/* Hamburger */
const hamb = document.getElementById('hamb');
if(hamb) hamb.addEventListener('click',()=>toggleMob());
/* Mobile accordion sections */
document.querySelectorAll('.mob-section-title').forEach(el=>{
  el.addEventListener('click',()=>toggleMobSection(el));
});
/* Mobile accordion keyboard accessibility */
document.querySelectorAll('.mob-section-title').forEach(el => {
  el.setAttribute('role', 'button');
  el.setAttribute('tabindex', '0');
  el.setAttribute('aria-expanded', 'false');
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMobSection(el); }
  });
});
/* Dropdown aria-expanded on hover/focus */
document.querySelectorAll('.nav-dd').forEach(dd => {
  const trigger = dd.querySelector('.nav-dd-trigger');
  if (!trigger) return;
  dd.addEventListener('mouseenter', () => trigger.setAttribute('aria-expanded', 'true'));
  dd.addEventListener('mouseleave', () => trigger.setAttribute('aria-expanded', 'false'));
  dd.addEventListener('focusin', () => trigger.setAttribute('aria-expanded', 'true'));
  dd.addEventListener('focusout', (e) => { if (!dd.contains(e.relatedTarget)) trigger.setAttribute('aria-expanded', 'false'); });
});
/* Keyboard accessibility: show dropdown on focus-within */
document.querySelectorAll('.nav-dd-trigger').forEach(trigger => {
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      const menu = trigger.nextElementSibling;
      if (menu) {
        menu.style.opacity = '1';
        menu.style.visibility = 'visible';
        menu.style.transform = 'translateY(0)';
        const firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    }
  });
});
document.querySelectorAll('.nav-dd-menu').forEach(menu => {
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      menu.style.opacity = '';
      menu.style.visibility = '';
      menu.style.transform = '';
      const trigger = menu.previousElementSibling;
      if (trigger) trigger.focus();
    }
  });
  menu.addEventListener('focusout', (e) => {
    if (!menu.contains(e.relatedTarget) && !menu.previousElementSibling.contains(e.relatedTarget)) {
      menu.style.opacity = '';
      menu.style.visibility = '';
      menu.style.transform = '';
    }
  });
});
/* Cookie banner */
const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept');
if(cookieBanner && cookieAccept){
  if(!localStorage.getItem('intelart-cookies-ok')){
    setTimeout(()=>cookieBanner.classList.add('visible'),1500);
  }
  cookieAccept.addEventListener('click',()=>{
    localStorage.setItem('intelart-cookies-ok','1');
    cookieBanner.classList.remove('visible');
  });
}
