const path = require('path');

const REPO_OWNER = 'Steph-972';
const REPO_NAME = 'marches-publics-martinique';
const SITE_URL = 'https://marches-publics-martinique.vercel.app';

const ALLOWED_FILES = new Set([
  'index.html', 'services.html', 'entreprises-privees.html', 'entites-publiques.html',
  'faq.html', 'mentions-legales.html', 'outils-gratuits.html', 'grille-mapa.html'
]);

const ROUTES = {
  'index.html': '/',
  'services.html': '/services',
  'entreprises-privees.html': '/entreprises-privees',
  'entites-publiques.html': '/entites-publiques',
  'faq.html': '/faq',
  'mentions-legales.html': '/mentions-legales',
  'outils-gratuits.html': '/outils-gratuits',
  'grille-mapa.html': '/grille-mapa'
};

const META = {
  'index.html': ['Procurement Insider | Consultant marchés publics en Martinique', 'Conseil en marchés publics en Martinique : réponse aux appels d’offres, mémoire technique, DCE/CCTP, formation et audit achat public.'],
  'services.html': ['Services | Conseil marchés publics Martinique — Procurement Insider', 'Audit achat public, rédaction DCE/CCTP, accompagnement réponse appel d’offres, mémoire technique, formation et veille mensuelle.'],
  'entreprises-privees.html': ['Aide réponse appel d’offres Martinique | Procurement Insider', 'Accompagnement TPE/PME : diagnostic AO, mémoire technique, réponse complète, stratégie de prix et relecture avant dépôt.'],
  'entites-publiques.html': ['Audit achat public et rédaction DCE/CCTP Martinique | Procurement Insider', 'Renfort opérationnel pour entités publiques : audit, rédaction DCE/CCTP, critères, clauses et formation marchés publics.'],
  'faq.html': ['FAQ | Procurement Insider — Marchés publics Martinique', 'Questions fréquentes sur l’accompagnement marchés publics, la déontologie, les offres et la commande publique.'],
  'mentions-legales.html': ['Mentions légales | Procurement Insider', 'Mentions légales, données personnelles et informations éditeur du site Procurement Insider.'],
  'outils-gratuits.html': ['Outils gratuits marchés publics | Procurement Insider', 'Outils gratuits pour lire un DCE, préparer une réponse AO, éviter les erreurs en MAPA et améliorer son mémoire technique.'],
  'grille-mapa.html': ['Grille MAPA gratuite | 12 erreurs à éviter — Procurement Insider', 'Grille gratuite : les 12 points qui font perdre une offre en MAPA. Vérifiez votre dossier avant dépôt.']
};

const GUARANTEE = "Je m'engage sur la qualité de mes conseils et de mes méthodes. Jamais sur l'attribution d'un marché — c'est une décision qui appartient exclusivement à l'acheteur public.";
const FOUNDER_HERO = "Dix années au cœur de la commande publique m'ont donné une lecture que peu de prestataires possèdent : comprendre ce qu'un acheteur attend réellement au moment d'analyser une offre. Aujourd'hui, je transforme cette expérience terrain en méthode claire pour aider les entreprises à mieux répondre et les entités publiques à acheter plus juste.";
const ABOUT_PERSPECTIVE = "Dix années de pratique opérationnelle en Martinique, au contact direct des besoins, des DCE, des CCTP, des MAPA et des procédures formalisées, m'ont donné une lecture concrète des attentes d'un acheteur public : ce qui sécurise un dossier, ce qui le fragilise, et ce qui fait réellement la différence à l'analyse.";

const CONSOLIDATED_CSS = `
<style id="pi-consolidated-renderer">
html,body{max-width:100%;overflow-x:hidden}body>nav#navbar{position:fixed;top:0;left:0;right:0;z-index:1000}img{max-width:100%;height:auto}.mobile-menu{z-index:9999!important}
#splash{display:none!important;visibility:hidden!important;pointer-events:none!important}body.splash-active #nav,body.splash-active #navbar,body.splash-active #hero,body.splash-active #cookie-banner,body.splash-active section{visibility:visible!important}.btn-cookie-refuse{display:none!important}#cookie-banner{justify-content:space-between}#cookie-banner .cookie-btns{flex:0 0 auto}
.nav-links{gap:clamp(1rem,1.55vw,2rem)!important}.nav-links a{font-size:clamp(.78rem,.82vw,.875rem)!important}@media(max-width:1050px){.nav-links{gap:.85rem!important}.nav-links a{font-size:.76rem!important}.nav-cta{padding:.45rem .85rem!important}}
.hero-content{max-width:690px!important}.hero-title-refined{max-width:620px!important;font-size:clamp(2.45rem,5.35vw,4.75rem)!important;line-height:1.045!important;margin-bottom:1.45rem!important;letter-spacing:-.025em!important}.hero-title-refined span,.hero-title-refined em{display:block!important}.hero-title-refined span{color:#fff!important;max-width:560px!important}.hero-title-refined em{color:var(--gold,#C9A84C)!important;font-style:italic!important;font-size:.93em!important;line-height:1.06!important;margin-top:.18rem!important;max-width:610px!important}.hero-subtitle-agency{max-width:560px!important;margin:0 0 1.45rem!important;color:rgba(255,255,255,.72)!important;font-size:clamp(.98rem,1.25vw,1.12rem)!important;font-weight:300!important;line-height:1.82!important}.hero-guarantee-line{max-width:520px!important;margin:1.15rem 0 0!important;font-family:var(--mono,monospace)!important;font-size:.72rem!important;line-height:1.68!important;letter-spacing:.035em!important;color:rgba(255,255,255,.46)!important}.hero-keywords{display:flex!important;flex-wrap:wrap!important;gap:.55rem!important;margin:0 0 1.75rem!important;max-width:620px!important}.hero-keywords span{display:inline-flex!important;align-items:center!important;gap:.35rem!important;background:rgba(255,255,255,.10)!important;border:1px solid rgba(255,255,255,.18)!important;border-radius:20px!important;padding:.3rem .82rem!important;font-family:var(--mono,monospace)!important;font-size:.66rem!important;letter-spacing:.055em!important;color:rgba(255,255,255,.82)!important;white-space:nowrap!important}.hero-keywords strong{color:var(--gold,#C9A84C)!important;font-weight:700!important}
.agency-kicker{font-family:var(--mono,monospace);font-size:.68rem;letter-spacing:.15em;text-transform:uppercase;color:var(--gold,#C9A84C);font-weight:700}.agency-title{font-family:var(--serif,Georgia,serif);font-size:clamp(1.8rem,3.5vw,2.8rem);line-height:1.15;color:var(--navy,#0F2342);letter-spacing:-.02em}.agency-muted{color:var(--gray,#6B7080);line-height:1.75}.agency-card{border:1px solid rgba(201,168,76,.24);border-radius:14px;background:rgba(255,255,255,.9);box-shadow:0 22px 70px rgba(15,35,66,.10)}
.agency-paths{background:#F8F5EF;padding:clamp(3rem,6vw,5.5rem) 0}.agency-paths>.container>.agency-kicker,.agency-ba>.container>.agency-kicker{display:block!important;text-align:center!important;margin-left:auto!important;margin-right:auto!important}.agency-paths>.container>.agency-title,.agency-ba>.container>.agency-title{text-align:center!important;margin-left:auto!important;margin-right:auto!important;max-width:760px!important}.agency-paths>.container>.agency-muted{text-align:center!important;margin-left:auto!important;margin-right:auto!important;max-width:720px!important}.agency-path-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.25rem;margin-top:2rem;text-align:left!important}.agency-path{display:grid;grid-template-columns:auto 1fr;gap:1.1rem;padding:clamp(1.4rem,3vw,2rem);transition:.25s;color:inherit}.agency-path:hover{transform:translateY(-4px);border-color:rgba(201,168,76,.55);box-shadow:0 28px 80px rgba(15,35,66,.14)}.agency-path-i{width:48px;height:48px;border-radius:50%;background:#0F2342;color:#C9A84C;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-weight:700}.agency-path h3{font-family:var(--serif);font-size:1.35rem;color:#0F2342;margin:0 0 .35rem}.agency-path p{color:#6B7080;font-size:.95rem;line-height:1.65;margin:0 0 1rem}.agency-path ul{list-style:none;display:grid;gap:.45rem;margin:0 0 1.2rem;padding:0}.agency-path li{font-size:.86rem}.agency-path li:before{content:'—';color:#C9A84C;margin-right:.55rem}.agency-cta{font-family:var(--mono);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:#C9A84C;font-weight:700}
.agency-ba{background:#fff;padding:clamp(3.5rem,7vw,6rem) 0}.agency-ba-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:2rem;text-align:left!important}.agency-ba-card{padding:clamp(1.35rem,3vw,2rem);border-radius:12px}.agency-ba-card.before{background:#F8F5EF;border:1px solid #E8EBF0}.agency-ba-card.after{background:#0F2342;color:#fff;border:1px solid rgba(201,168,76,.45)}.agency-ba-card h3{font-family:var(--serif);font-size:1.25rem;margin-bottom:1rem}.agency-ba-card ul{list-style:none;display:grid;gap:.75rem;margin:0;padding:0}.agency-ba-card li{font-size:.92rem;line-height:1.55}.before li:before{content:'×';color:#B24B4B;font-weight:700;margin-right:.5rem}.after li:before{content:'✓';color:#C9A84C;font-weight:700;margin-right:.5rem}
.agency-deonto{background:#0F2342;color:#fff;padding:clamp(3rem,6vw,5.5rem) 0}.agency-deonto-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(2rem,5vw,4rem);align-items:center}.agency-deonto-card{padding:1.15rem 1.25rem;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(201,168,76,.22);margin-bottom:.9rem}.agency-deonto-card strong{color:#C9A84C;display:block;margin-bottom:.25rem}.agency-deonto-card span{color:rgba(255,255,255,.72);font-size:.9rem;line-height:1.6}
.agency-service-links{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.8rem;margin-top:1.35rem}.agency-service-links a{display:block;padding:1rem;border:1px solid rgba(15,35,66,.12);border-radius:10px;background:#fff;color:#0F2342;font-weight:700;font-size:.86rem}.agency-service-links a span{display:block;color:#6B7080;font-weight:400;font-size:.76rem;margin-top:.25rem;line-height:1.45}.agency-service-links a:hover{transform:translateY(-3px);border-color:rgba(201,168,76,.5);box-shadow:0 14px 40px rgba(15,35,66,.10)}.page-hero>.container+div{margin-top:clamp(1.75rem,3vw,2.6rem)!important}.service-quick-entry{padding-bottom:clamp(1rem,2vw,1.75rem)!important}.services-section{padding-top:clamp(2rem,3.5vw,3rem)!important}.services-grid{align-items:stretch!important}.service-col{display:flex!important;flex-direction:column!important}.service-list{flex:1 1 auto!important}.service-offer{margin-top:auto!important;min-height:205px!important;display:flex!important;flex-direction:column!important}.service-offer .btn-offer{margin-top:auto!important;width:fit-content!important}
.agency-footer{background:#07172D;color:rgba(255,255,255,.62);padding:clamp(3rem,6vw,4.5rem) 0 2rem;font-size:.85rem;text-align:left}.agency-footer-top{display:grid;grid-template-columns:minmax(240px,1.05fr) minmax(0,2fr);gap:clamp(2rem,5vw,4rem);align-items:start;padding-bottom:2rem;border-bottom:1px solid rgba(255,255,255,.10)}.agency-footer-brand{color:#fff;font-family:Arial,sans-serif;letter-spacing:.14em;font-weight:900;font-size:.78rem;text-transform:uppercase;margin-bottom:.75rem}.agency-footer-line{width:54px;height:2px;background:#C9A84C;margin-bottom:1rem}.agency-footer p{color:rgba(255,255,255,.56);max-width:330px;line-height:1.7}.agency-footer-matrix{display:grid;grid-template-columns:repeat(3,minmax(150px,1fr));gap:2rem}.agency-footer h4{font-family:var(--mono);color:#C9A84C;font-size:.65rem;letter-spacing:.15em;text-transform:uppercase;margin-bottom:1rem}.agency-footer ul{list-style:none;display:grid;gap:.6rem;margin:0;padding:0}.agency-footer a{color:rgba(255,255,255,.62);text-decoration:none}.agency-footer a:hover{color:#C9A84C}.agency-footer-bottom{display:flex;flex-wrap:wrap;justify-content:space-between;gap:1rem;padding-top:1.5rem;color:rgba(255,255,255,.42);font-size:.75rem}footer nav,footer nav[style],footer .footer-nav,footer [class*="footer"] nav{position:static!important;inset:auto!important;z-index:auto!important;padding:0!important;background:transparent!important;box-shadow:none!important;backdrop-filter:none!important}
@media(max-width:900px){.agency-path-grid,.agency-ba-grid,.agency-deonto-grid,.agency-footer-top{grid-template-columns:1fr}.agency-service-links{grid-template-columns:repeat(2,1fr)}.agency-footer-matrix{grid-template-columns:repeat(2,1fr)}}@media(max-width:560px){.agency-service-links,.agency-footer-matrix{grid-template-columns:1fr}.agency-path{grid-template-columns:1fr}.hero-title-refined{font-size:clamp(2.35rem,12vw,3.15rem)!important;max-width:100%!important}.hero-title-refined em{max-width:100%!important}.hero-keywords span{font-size:.62rem!important;padding:.28rem .68rem!important}.service-offer{min-height:0!important}}
</style>`;

function safeFile(value) {
  const file = path.basename(String(value || '').trim());
  return ALLOWED_FILES.has(file) ? file : null;
}

function safeRef(value) {
  const ref = String(value || '').trim();
  return /^[A-Za-z0-9._\/-]+$/.test(ref) ? ref : 'main';
}

function canonicalFor(file) {
  const route = ROUTES[file] || '/';
  return route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
}

function replaceOrInsert(html, pattern, replacement, before = '</head>') {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace(before, `${replacement}\n${before}`);
}

function jsonLd(file) {
  return JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Procurement Insider',
      alternateName: "L’Œil de l’Acheteur",
      url: SITE_URL,
      description: 'Conseil en marchés publics, commande publique et achat en Martinique et aux Antilles françaises.',
      founder: { '@type': 'Person', name: 'Stéphane Loudoux' },
      email: 'loeildelacheteur@gmail.com',
      telephone: '+596696266231',
      areaServed: ['Martinique', 'Guadeloupe', 'Guyane', 'Antilles françaises'],
      serviceType: ['Conseil marchés publics', 'Rédaction DCE CCTP', 'Accompagnement réponse appel d offres', 'Formation marchés publics']
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: canonicalFor(file),
      isPartOf: { '@type': 'WebSite', name: 'Procurement Insider', url: SITE_URL },
      inLanguage: 'fr-FR'
    }
  ]);
}

function applySeo(html, file) {
  const [title, description] = META[file] || META['index.html'];
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');
  html = replaceOrInsert(html, /<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = replaceOrInsert(html, /<meta name="description" content="[\s\S]*?">/i, `<meta name="description" content="${description}">`);
  html = replaceOrInsert(html, /<link rel="canonical" href="[\s\S]*?">/i, `<link rel="canonical" href="${canonicalFor(file)}">`);
  html = replaceOrInsert(html, /<meta property="og:url" content="[\s\S]*?">/i, `<meta property="og:url" content="${canonicalFor(file)}">`);
  html = replaceOrInsert(html, /<meta property="og:title" content="[\s\S]*?">/i, `<meta property="og:title" content="${title}">`);
  html = replaceOrInsert(html, /<meta property="og:description" content="[\s\S]*?">/i, `<meta property="og:description" content="${description}">`);
  html = html.replace(/https:\/\/procurement-insider-git-main-procurement-insiders-projects\.vercel\.app/g, SITE_URL);
  return html.replace('</head>', `<script type="application/ld+json">${jsonLd(file)}</script>\n</head>`);
}

function normalizeNavigation(html, file) {
  if (!/id=["']navbar["']/.test(html)) html = html.replace(/<nav(?=[\s>])/i, '<nav id="navbar"');
  if (file !== 'index.html') {
    html = html
      .replace(/\s*<li>\s*<a\s+href=["']\/["']>Accueil<\/a>\s*<\/li>/gi, '')
      .replace(/\s*<a\s+href=["']\/["']\s+onclick=["']toggleMenu\(\)["']>Accueil<\/a>/gi, '')
      .replace(/\s*<a\s+href=["']\/["']>Accueil<\/a>/gi, '');
  }
  return html
    .replace(/(<li><a href="#insights">Insights<\/a><\/li>\s*)(<li><a href="#contact">Contact<\/a><\/li>)/g, '$1<li><a href="/outils-gratuits">Outils gratuits</a></li>\n        $2')
    .replace(/(<li><a href="\/#insights">Insights<\/a><\/li>\s*)(<li><a href="\/#contact">Contact<\/a><\/li>)/g, '$1<li><a href="/outils-gratuits">Outils gratuits</a></li>\n        $2')
    .replace(/(<a href="#insights" onclick="toggleMenu\(\)">Insights<\/a>\s*)(<a href="#contact" onclick="toggleMenu\(\)">Contact<\/a>)/g, '$1<a href="/outils-gratuits" onclick="toggleMenu()">Outils gratuits</a>\n  $2')
    .replace(/(<a href="\/#insights" onclick="toggleMenu\(\)">Insights<\/a>\s*)(<a href="\/#contact" onclick="toggleMenu\(\)">Contact<\/a>)/g, '$1<a href="/outils-gratuits" onclick="toggleMenu()">Outils gratuits</a>\n  $2')
    .replace(/(<li><a href="\/outils-gratuits">Outils gratuits<\/a><\/li>\s*){2,}/g, '<li><a href="/outils-gratuits">Outils gratuits</a></li>\n        ')
    .replace(/(<a href="\/outils-gratuits" onclick="toggleMenu\(\)">Outils gratuits<\/a>\s*){2,}/g, '<a href="/outils-gratuits" onclick="toggleMenu()">Outils gratuits</a>\n  ');
}

function normalizeFounderSignature(html, file) {
  if (file === 'faq.html') return html;
  return html
    .replace(/Stéphane Loudoux<br>\s*Responsable Achat &amp;? MP, ODYSSI<br>\s*Fondateur Procurement Insider/gi, 'Stéphane Loudoux<br>Fondateur Procurement Insider')
    .replace(/<div class="brand-footer">Stéphane Loudoux — Procurement Insider \| L'Œil de l'Acheteur<\/div>\s*Responsable Achat &amp;? Marchés Publics, ODYSSI – Régie des Eaux de la CACEM · Fondateur Procurement Insider<br>/gi, '<div class="brand-footer">Stéphane Loudoux<br>Fondateur Procurement Insider</div>')
    .replace(/Stéphane Loudoux<\/strong>\s*—\s*Responsable Achat &amp; March(?:é|\\u00e9)s Publics, ODYSSI(?:\s*–|\s*\\u2013)\s*R(?:é|\\u00e9)gie des Eaux de la CACEM/gi, 'Stéphane Loudoux</strong> — Fondateur Procurement Insider')
    .replace(/Fort-de-France, Martinique/g, 'Martinique');
}

function normalizeHome(html, file) {
  if (file !== 'index.html') return html;

  const paths = `<!-- PARCOURS DE DECISION --><section class="agency-paths" id="targets"><div class="container"><span class="agency-kicker">Choisissez votre point d'entrée</span><h2 class="agency-title" style="margin-top:.7rem">Deux besoins, deux parcours. Même exigence de méthode.</h2><p class="agency-muted" style="max-width:680px;margin-top:1rem">Sélectionnez votre situation : l’objectif est d’aller vite vers l’offre, le vocabulaire et les livrables qui correspondent à votre enjeu.</p><div class="agency-path-grid"><a href="/entreprises-privees" class="agency-card agency-path"><div class="agency-path-i">E</div><div><h3>Je suis une entreprise</h3><p>Je veux savoir si je dois répondre, améliorer mon mémoire technique ou sécuriser mon dépôt.</p><ul><li>Analyse du DCE et des critères</li><li>Go / No-Go argumenté</li><li>Mémoire technique plus lisible</li></ul><span class="agency-cta">Préparer ma réponse AO →</span></div></a><a href="/entites-publiques" class="agency-card agency-path"><div class="agency-path-i">P</div><div><h3>Je suis une entité publique</h3><p>Je veux sécuriser mon DCE, contrôler mes critères ou renforcer mon équipe achat.</p><ul><li>Audit RC / CCAP / CCTP</li><li>Relecture des critères et pièces financières</li><li>Formation opérationnelle</li></ul><span class="agency-cta">Sécuriser ma procédure →</span></div></a></div></div></section><section class="agency-ba"><div class="container"><span class="agency-kicker">Avant / Après</span><h2 class="agency-title" style="margin-top:.7rem">Ce que je transforme concrètement.</h2><div class="agency-ba-grid"><div class="agency-ba-card before"><h3>Avant</h3><ul><li>Mémoire générique qui ne suit pas les critères</li><li>Références fortes mais mal valorisées</li><li>DCE ou offre avec zones de risque invisibles</li></ul></div><div class="agency-ba-card after"><h3>Après</h3><ul><li>Réponse structurée selon la grille de lecture de l’acheteur</li><li>Preuves, moyens et engagements mieux placés</li><li>Dossier plus lisible, cohérent et défendable</li></ul></div></div></div></section><!-- STATS COMPTEUR -->`;
  const deonto = `<section class="agency-deonto" id="deontologie"><div class="container agency-deonto-grid"><div><span class="agency-kicker">Déontologie</span><h2 class="agency-title" style="color:white;margin-top:.7rem">Un cadre clair avant chaque mission.</h2><p style="color:rgba(255,255,255,.70);line-height:1.75;margin-top:1rem">Aider à mieux structurer, jamais contourner. Chaque mission doit être compatible avec les règles de la commande publique et l’absence de conflit d’intérêts.</p></div><div><div class="agency-deonto-card"><strong>Aucun conflit d’intérêts</strong><span>Pas d’intervention sur une procédure liée directement ou indirectement à mon employeur public actuel ou passé récent.</span></div><div class="agency-deonto-card"><strong>Aucune promesse d’attribution</strong><span>Je m’engage sur la qualité de mes conseils et méthodes. La décision appartient exclusivement à l’acheteur public.</span></div><div class="agency-deonto-card"><strong>Accompagnement transparent</strong><span>Sécuriser, clarifier, structurer et rendre les dossiers plus lisibles au regard des critères.</span></div></div></div></section>`;

  html = html
    .replace(/<div class="hero-eyebrow label">Consultant Expert — Martinique<\/div>/i, '<div class="hero-eyebrow label">Conseil marchés publics — Martinique</div>')
    .replace(/<h1 class="display hero-title">[\s\S]*?<\/h1>/i, '<h1 class="display hero-title hero-title-refined"><span>Votre offre est solide.</span><em>Rendons-la lisible<br>pour l’acheteur public.</em></h1>')
    .replace(/<p class="lead hero-subtitle">[\s\S]*?<\/p>/i, `<p class="lead hero-subtitle hero-subtitle-agency">${FOUNDER_HERO}</p>`)
    .replace(/\s*<!-- Pills de preuve sociale sous le titre -->\s*<div style="display:flex;flex-wrap:wrap;gap:\.6rem;margin-bottom:1\.75rem">[\s\S]*?<\/div>/i, '\n      <!-- Mots-clés de preuve contextuelle -->\n      <div class="hero-keywords"><span><strong>10 ans</strong> terrain achat public</span><span>Lecture RC</span><span>Critères de notation</span><span>Mémoire technique</span><span>DCE / CCTP</span><span>MAPA</span></div>')
    .replace(/<p style="font-size:\.78rem;color:rgba\(255,255,255,\.45\);[\s\S]*?<\/p>/i, `<p class="hero-guarantee-line">${GUARANTEE}</p>`)
    .replace(/<!-- BANDEAU CIBLES -->[\s\S]*?<!-- STATS COMPTEUR -->/i, paths)
    .replace(/Satisfaction clients/g, 'Retours satisfaits')
    .replace(/Collectivités accompagnées/g, 'Missions publiques')
    .replace(/Formations dispensées/g, 'Sessions terrain')
    .replace(/Pendant 10 ans, j'ai piloté[\s\S]*?attributions décidées\./g, ABOUT_PERSPECTIVE)
    .replace(/Un jour, j'ai changé de côté[\s\S]*?<strong>Procurement Insider<\/strong> pour ça\./g, "J'ai créé <strong>Procurement Insider</strong> pour rendre cette lecture terrain plus accessible. Trop d'entreprises locales perdent des opportunités non pas par manque de compétence, mais parce que leur dossier ne valorise pas suffisamment leurs moyens, leurs références et leur méthodologie face aux attentes de l'acheteur public.")
    .replace(/<div class="about-guarantee reveal reveal-delay-4">[\s\S]*?<\/div>/i, `<div class="about-guarantee reveal reveal-delay-4"><blockquote class="founder-statement founder-statement-light founder-statement-compact"><p>« ${GUARANTEE} »</p></blockquote></div>`)
    .replace(/J'ai rédigé les CCTP<br>que vous deviez<br>décrypter\./g, 'Je lis les dossiers<br>comme un acheteur.<br>Je les rends compréhensibles côté candidat.')
    .replace(/Pendant 10 ans, j'ai tenu le stylo côté acheteur[\s\S]*?votre côté\./g, 'Mon avantage n’est pas un discours théorique : c’est une pratique quotidienne de la commande publique. Je sais comment se lit un RC, ce qui rend un CCTP ambigu, pourquoi un mémoire technique paraît solide ou fragile, et comment transformer cette lecture en méthode exploitable.')
    .replace(/Prêt à déposer un dossier qui gagne \?/g, 'Prêt à déposer un dossier plus solide ?')
    .replace(/Diagnostic gratuit 30 min/g, 'Analyser mon dossier')
    .replace(/Découvrir les services/g, 'Voir les accompagnements');

  html = html.replace(/\s*<!-- DÉONTOLOGIE & INDÉPENDANCE -->\s*<section id="deontologie"[\s\S]*?<\/section>\s*(?=<!-- CAS PRATIQUES -->)/i, '');
  if (!html.includes('agency-deonto')) html = html.replace(/<!-- INSIGHTS & VEILLE -->/i, `${deonto}<!-- INSIGHTS & VEILLE -->`);
  return html;
}

function normalizeServices(html, file) {
  if (file !== 'services.html') return html;
  const links = `<div class="container service-quick-entry" style="padding-bottom:clamp(1rem,2vw,1.75rem)"><span class="agency-kicker">Accès rapide</span><h2 class="agency-title" style="margin-top:.7rem">Votre besoin en une phrase.</h2><div class="agency-service-links"><a href="/entreprises-privees#tarifs">Je veux savoir si je dois répondre<span>Diagnostic AO / Go-No Go</span></a><a href="/entreprises-privees#tarifs">Je veux améliorer mon mémoire<span>Structuration et relecture critique</span></a><a href="/entites-publiques#tarifs">Je veux sécuriser mon DCE<span>RC, CCTP, BPU, critères</span></a><a href="/entites-publiques#tarifs">Je veux former mon équipe<span>MAPA, analyse, méthode terrain</span></a></div></div>`;
  return html
    .replace(/Deux expertises,<br><em>un seul terrain\.<\/em>/i, 'Le bon accompagnement,<br><em>au bon moment.</em>')
    .replace(/Une offre pensée pour les deux acteurs de la commande publique : ceux qui achètent, et ceux qui soumissionnent\./g, 'Des offres structurées selon votre rôle : sécuriser une procédure, améliorer une réponse, former une équipe ou arbitrer un Go / No-Go.')
    .replace(/Pilotage complet d'une procédure d'appel d'offres de A à Z, de la publication à l'attribution\./g, 'Appui opérationnel sur les étapes critiques : pièces, critères, cohérence du DCE, analyse et sécurisation du calendrier.')
    .replace(/Voir les offres et tarifs/g, 'Choisir mon accompagnement')
    .replace(/<!-- SERVICES -->/i, `${links}<!-- SERVICES -->`)
    .replace(/<section class="services-section">/g, '<section class="services-section services-section-tight">');
}

function normalizePrivatePage(html, file) {
  if (file !== 'entreprises-privees.html') return html;
  return html
    .replace(/Vous connaissez votre métier\.<br>Je connais <em style="color:var\(--gold\);font-style:normal">l'acheteur public\.<\/em>/i, 'Votre offre est sérieuse.<br>Je l’aide à devenir <em style="color:var(--gold);font-style:normal">lisible, notée, défendable.</em>')
    .replace(/La plupart des marchés perdus ne le sont pas sur la compétence technique — mais sur la façon de la présenter\. Je vous aide à construire des dossiers qui parlent le langage de l'acheteur\./g, 'Je vous aide à traduire votre savoir-faire en réponse structurée : critères traités, preuves visibles, mémoire technique clair, dossier conforme avant dépôt.')
    .replace(/Diagnostic gratuit 30 min/g, 'Faire analyser mon AO')
    .replace(/Prêt à déposer un dossier qui gagne \?/g, 'Prêt à déposer un dossier plus solide ?')
    .replace(/Deux mois plus tard, nous décrochions un marché de 280&nbsp;000&nbsp;€ avec une collectivité avec laquelle nous n'avions jamais travaillé\./g, 'Le dossier a gagné en clarté, en preuves et en cohérence. Résultat : une réponse nettement plus professionnelle et mieux alignée sur les attentes de l’acheteur.')
    .replace(/<strong class="temoignage-name">M\. C<\/strong>/g, '<strong class="temoignage-name">Cas client anonymisé</strong>')
    .replace(/<strong class="temoignage-name">M\. C\.<\/strong>/g, '<strong class="temoignage-name">Cas client anonymisé</strong>');
}

function normalizePublicPage(html, file) {
  if (file !== 'entites-publiques.html') return html;
  return html
    .replace(/Sécurisez vos procédures\.<br><em>Optimisez<\/em> chaque achat\./i, 'Des DCE plus clairs.<br>Des procédures <em>mieux sécurisées.</em>')
    .replace(/Votre acheteur public mérite un soutien à la hauteur de ses responsabilités\. J'interviens en renfort de vos équipes pour sécuriser juridiquement vos procédures, rédiger vos DCE et former vos agents\./g, 'J’interviens en renfort opérationnel de vos équipes : relecture critique, cohérence RC/CCTP/BPU, critères de jugement, clauses sensibles, formation et méthode d’analyse.')
    .replace(/Demander un devis/g, 'Sécuriser ma procédure')
    .replace(/Voir les tarifs/g, 'Voir les offres');
}

function normalizeFreeTools(html, file) {
  if (file !== 'outils-gratuits.html') return html;
  return html
    .replace(/Voir la grille PDF/g, 'Consulter la grille')
    .replace(/Accès immédiat après inscription/g, 'Accès libre immédiat')
    .replace(/Recevoir la grille par email/g, 'Recevoir aussi la grille par email')
    .replace(/Accès immédiat par email \+ lien vers la version PDF imprimable\./g, 'Inscription optionnelle : recevez le lien PDF et les futures ressources utiles par email.')
    .replace(/Recevoir la grille gratuite/g, 'Recevoir la grille par email')
    .replace(/La grille vient de vous être envoyée par email\./g, 'La grille vient de vous être envoyée par email. Vous pouvez aussi y accéder librement depuis cette page.');
}

function normalizeFooter(html) {
  const footer = `<!-- FOOTER --><footer class="agency-footer"><div class="container"><div class="agency-footer-top"><div><div class="agency-footer-brand">PROCUREMENT INSIDER</div><div class="agency-footer-line"></div><p>Conseil en marchés publics, commande publique et achat. Martinique & Antilles françaises.</p><p style="margin-top:1rem">Stéphane Loudoux<br>Fondateur Procurement Insider</p></div><div class="agency-footer-matrix"><div><h4>Navigation</h4><ul><li><a href="/#about">À propos</a></li><li><a href="/#cas-pratiques">Cas pratiques</a></li><li><a href="/outils-gratuits">Outils gratuits</a></li><li><a href="/#methode">Méthode</a></li><li><a href="/#deontologie">Déontologie</a></li></ul></div><div><h4>Services</h4><ul><li><a href="/services">Tous les services</a></li><li><a href="/entites-publiques">Rédaction DCE / CCTP</a></li><li><a href="/entreprises-privees">Accompagnement réponse AO</a></li><li><a href="/entites-publiques">Formation marchés publics</a></li><li><a href="/services">Veille & conseil mensuel</a></li><li><a href="/services">Ateliers collectifs</a></li></ul></div><div><h4>Contact</h4><ul><li><a href="/#contact">Diagnostic gratuit</a></li><li><a href="tel:+596696266231">+596 696 266 231</a></li><li><a href="mailto:loeildelacheteur@gmail.com">loeildelacheteur@gmail.com</a></li><li><a href="/faq">FAQ</a></li><li><a href="/mentions-legales">Mentions légales</a></li></ul></div></div></div><div class="agency-footer-bottom"><span>© 2026 Stéphane Loudoux — Procurement Insider — Martinique</span><span>Aucune promesse d’attribution. Conseil, méthode et structuration des dossiers.</span></div></div></footer>`;
  return html.replace(/<!-- FOOTER -->\s*<footer[\s\S]*?<\/footer>/i, footer);
}

function harden(html) {
  return html
    .replace(/<button class="btn-cookie-refuse"[\s\S]*?<\/button>/i, '')
    .replace(/<strong class="about-temoignage-name">M\. C\.<\/strong>/g, '<strong class="about-temoignage-name">Cas client anonymisé</strong>')
    .replace(/required id="message"><\/textarea>/g, 'required></textarea>')
    .replace(/<p><strong>Stéphane Loudoux<\/strong> — Responsable Achat &amp; Marchés Publics, ODYSSI – Régie des Eaux de la CACEM<\/p>/g, '<p><strong>Stéphane Loudoux</strong> — Fondateur Procurement Insider</p>')
    .replace(/<p><strong>Stéphane Loudoux<\/strong> — Responsable Achat &amp; March\\u00e9s Publics, ODYSSI \\u2013 R\\u00e9gie des Eaux de la CACEM<\/p>/g, '<p><strong>Stéphane Loudoux</strong> — Fondateur Procurement Insider</p>')
    .replace(/<p style="margin-top:\.5rem">Fort-de-France, Martinique[\s\S]*?<\/p>/g, '<p style="margin-top:.5rem">Martinique · loeildelacheteur@gmail.com</p>')
    .replace(/const nav = document\.querySelector\('nav'\);/g, "const nav = document.getElementById('navbar');")
    .replace(/window\.addEventListener\('scroll', \(\) => nav\.classList\.toggle\('scrolled', window\.scrollY > 60\), \{passive:true\}\);/g, "if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), {passive:true});");
}

function injectCss(html) {
  return html.includes('pi-consolidated-renderer') ? html : html.replace('</head>', `${CONSOLIDATED_CSS}\n</head>`);
}

function transform(html, file) {
  let output = html;
  output = applySeo(output, file);
  output = normalizeNavigation(output, file);
  output = normalizeFounderSignature(output, file);
  output = normalizeHome(output, file);
  output = normalizeServices(output, file);
  output = normalizePrivatePage(output, file);
  output = normalizePublicPage(output, file);
  output = normalizeFreeTools(output, file);
  output = normalizeFooter(output);
  output = harden(output);
  output = injectCss(output);
  return output;
}

module.exports = async function handler(req, res) {
  const file = safeFile(req.query.file);
  if (!file) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Page introuvable');
    return;
  }

  try {
    const ref = safeRef(process.env.VERCEL_GIT_COMMIT_REF || 'main');
    const rawUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${encodeURIComponent(ref)}/${file}`;
    const source = await fetch(rawUrl, { headers: { 'User-Agent': 'Procurement-Insider-renderer/2.0' } });
    if (!source.ok) throw new Error(`Unable to fetch ${file} from GitHub raw: ${source.status}`);
    const html = transform(await source.text(), file);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.end(html);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(`Erreur de rendu de la page: ${error.message}`);
  }
};
