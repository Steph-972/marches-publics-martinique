const path = require('path');

const REPO_OWNER = 'Steph-972';
const REPO_NAME = 'marches-publics-martinique';
const SITE_URL = 'https://marches-publics-martinique.vercel.app';

const ALLOWED_FILES = new Set([
  'index.html',
  'services.html',
  'entreprises-privees.html',
  'entites-publiques.html',
  'faq.html',
  'mentions-legales.html',
  'outils-gratuits.html',
  'grille-mapa.html'
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
const NEUTRAL_CASE_RESULT = "Le dossier a gagné en clarté, en preuves et en cohérence. Résultat : une réponse nettement plus professionnelle et mieux alignée sur les attentes de l’acheteur.";

const RENDERER_CSS = `
<style id="pi-consolidated-renderer">
html,body{max-width:100%;overflow-x:hidden}body>nav#navbar{position:fixed;top:0;left:0;right:0;z-index:1000}img{max-width:100%;height:auto}.mobile-menu{z-index:9999!important}
#splash{display:none!important;visibility:hidden!important;pointer-events:none!important}.btn-cookie-refuse{display:none!important}#cookie-banner{justify-content:space-between}#cookie-banner .cookie-btns{flex:0 0 auto}
.nav-links{gap:clamp(1rem,1.55vw,2rem)!important}.nav-links a{font-size:clamp(.78rem,.82vw,.875rem)!important}@media(max-width:1050px){.nav-links{gap:.85rem!important}.nav-links a{font-size:.76rem!important}.nav-cta{padding:.45rem .85rem!important}}
.hero-content{max-width:690px!important}.hero-title-refined{max-width:620px!important;font-size:clamp(2.45rem,5.35vw,4.75rem)!important;line-height:1.045!important;margin-bottom:1.45rem!important;letter-spacing:-.025em!important}.hero-title-refined span,.hero-title-refined em{display:block!important}.hero-title-refined span{color:#fff!important;max-width:560px!important}.hero-title-refined em{color:var(--gold,#C9A84C)!important;font-style:italic!important;font-size:.93em!important;line-height:1.06!important;margin-top:.18rem!important;max-width:610px!important}.hero-subtitle-agency{max-width:560px!important;margin:0 0 1.45rem!important;color:rgba(255,255,255,.72)!important;font-size:clamp(.98rem,1.25vw,1.12rem)!important;font-weight:300!important;line-height:1.82!important}.hero-guarantee-line{max-width:520px!important;margin:1.15rem 0 0!important;font-family:var(--mono,monospace)!important;font-size:.72rem!important;line-height:1.68!important;letter-spacing:.035em!important;color:rgba(255,255,255,.46)!important}.hero-keywords{display:flex!important;flex-wrap:wrap!important;gap:.55rem!important;margin:0 0 1.75rem!important;max-width:620px!important}.hero-keywords span{display:inline-flex!important;align-items:center!important;gap:.35rem!important;background:rgba(255,255,255,.10)!important;border:1px solid rgba(255,255,255,.18)!important;border-radius:20px!important;padding:.3rem .82rem!important;font-family:var(--mono,monospace)!important;font-size:.66rem!important;letter-spacing:.055em!important;color:rgba(255,255,255,.82)!important;white-space:nowrap!important}.hero-keywords strong{color:var(--gold,#C9A84C)!important;font-weight:700!important}
.agency-kicker{font-family:var(--mono,monospace);font-size:.68rem;letter-spacing:.15em;text-transform:uppercase;color:var(--gold,#C9A84C);font-weight:700}.agency-title{font-family:var(--serif,Georgia,serif);font-size:clamp(1.8rem,3.5vw,2.8rem);line-height:1.15;color:var(--navy,#0F2342);letter-spacing:-.02em}.agency-muted{color:var(--gray,#6B7080);line-height:1.75}.agency-card{border:1px solid rgba(201,168,76,.24);border-radius:14px;background:rgba(255,255,255,.9);box-shadow:0 22px 70px rgba(15,35,66,.10)}
.agency-paths{background:#F8F5EF;padding:clamp(3rem,6vw,5.5rem) 0}.agency-paths>.container>.agency-kicker,.agency-ba>.container>.agency-kicker{display:block!important;text-align:center!important;margin-left:auto!important;margin-right:auto!important}.agency-paths>.container>.agency-title,.agency-ba>.container>.agency-title{text-align:center!important;margin-left:auto!important;margin-right:auto!important;max-width:760px!important}.agency-paths>.container>.agency-muted{text-align:center!important;margin-left:auto!important;margin-right:auto!important;max-width:720px!important}.agency-path-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.25rem;margin-top:2rem;text-align:left!important}.agency-path{display:grid;grid-template-columns:auto 1fr;gap:1.1rem;padding:clamp(1.4rem,3vw,2rem);transition:.25s;color:inherit}.agency-path:hover{transform:translateY(-4px);border-color:rgba(201,168,76,.55);box-shadow:0 28px 80px rgba(15,35,66,.14)}.agency-path-i{width:48px;height:48px;border-radius:50%;background:#0F2342;color:#C9A84C;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-weight:700}.agency-path h3{font-family:var(--serif);font-size:1.35rem;color:#0F2342;margin:0 0 .35rem}.agency-path p{color:#6B7080;font-size:.95rem;line-height:1.65;margin:0 0 1rem}.agency-path ul{list-style:none;display:grid;gap:.45rem;margin:0 0 1.2rem;padding:0}.agency-path li{font-size:.86rem}.agency-path li:before{content:'—';color:#C9A84C;margin-right:.55rem}.agency-cta{font-family:var(--mono);font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:#C9A84C;font-weight:700}
.agency-ba{background:#fff;padding:clamp(3.5rem,7vw,6rem) 0}.agency-ba-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:2rem;text-align:left!important}.agency-ba-card{padding:clamp(1.35rem,3vw,2rem);border-radius:12px}.agency-ba-card.before{background:#F8F5EF;border:1px solid #E8EBF0}.agency-ba-card.after{background:#0F2342;color:#fff;border:1px solid rgba(201,168,76,.45)}.agency-ba-card h3{font-family:var(--serif);font-size:1.25rem;margin-bottom:1rem}.agency-ba-card ul{list-style:none;display:grid;gap:.75rem;margin:0;padding:0}.agency-ba-card li{font-size:.92rem;line-height:1.55}.before li:before{content:'×';color:#B24B4B;font-weight:700;margin-right:.5rem}.after li:before{content:'✓';color:#C9A84C;font-weight:700;margin-right:.5rem}
.agency-deonto{background:#0F2342;color:#fff;padding:clamp(3rem,6vw,5.5rem) 0}.agency-deonto-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(2rem,5vw,4rem);align-items:center}.agency-deonto-card{padding:1.15rem 1.25rem;border-radius:10px;background:rgba(255,255,255,.06);border:1px solid rgba(201,168,76,.22);margin-bottom:.9rem}.agency-deonto-card strong{color:#C9A84C;display:block;margin-bottom:.25rem}.agency-deonto-card span{color:rgba(255,255,255,.72);font-size:.9rem;line-height:1.6}
.agency-service-links{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.8rem;margin-top:1.35rem}.agency-service-links a{display:block;padding:1rem;border:1px solid rgba(15,35,66,.12);border-radius:10px;background:#fff;color:#0F2342;font-weight:700;font-size:.86rem}.agency-service-links a span{display:block;color:#6B7080;font-weight:400;font-size:.76rem;margin-top:.25rem;line-height:1.45}.agency-service-links a:hover{transform:translateY(-3px);border-color:rgba(201,168,76,.5);box-shadow:0 14px 40px rgba(15,35,66,.10)}.service-quick-entry{padding-bottom:clamp(1rem,2vw,1.75rem)!important}.services-section{padding-top:clamp(2rem,3.5vw,3rem)!important}.services-grid{align-items:stretch!important}.service-col{display:flex!important;flex-direction:column!important}.service-list{flex:1 1 auto!important}.service-offer{margin-top:auto!important;min-height:205px!important;display:flex!important;flex-direction:column!important}.service-offer .btn-offer{margin-top:auto!important;width:fit-content!important}
.pi-conversion{padding:clamp(4rem,7vw,7rem) 0!important;background:#fff}.pi-conversion.alt{background:#F8F5EF}.pi-conversion.dark{background:#0F2342;color:#fff}.pi-head{text-align:center;max-width:780px;margin:0 auto clamp(2rem,4vw,3rem)}.pi-head .eyebrow{display:block;font-family:var(--mono,monospace);font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:#C9A84C;font-weight:700;margin-bottom:.8rem}.pi-head h2{font-family:var(--serif,Georgia,serif);font-size:clamp(1.8rem,3.7vw,3rem);line-height:1.12;color:#0F2342;margin:0}.pi-conversion.dark .pi-head h2{color:#fff}.pi-head p{color:#6B7080;line-height:1.75;margin:1rem auto 0;max-width:650px}.pi-conversion.dark .pi-head p{color:rgba(255,255,255,.68)}.pi-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}.pi-card{background:#fff;border:1px solid rgba(15,35,66,.10);border-radius:16px;padding:clamp(1.25rem,2.3vw,1.8rem);box-shadow:0 20px 55px rgba(15,35,66,.08)}.pi-card.gold{border-color:rgba(201,168,76,.45);box-shadow:0 22px 60px rgba(201,168,76,.16)}.pi-card h3{font-family:var(--serif,Georgia,serif);font-size:1.18rem;color:#0F2342;line-height:1.25;margin:0 0 .65rem}.pi-card p{color:#6B7080;font-size:.9rem;line-height:1.65;margin:0}.pi-card ul{list-style:none;display:grid;gap:.5rem;margin:.9rem 0 0;padding:0}.pi-card li{font-size:.86rem;color:#1C1C2E;line-height:1.45}.pi-card li:before{content:'✓';color:#C9A84C;font-weight:800;margin-right:.45rem}.pi-strip{display:flex;flex-wrap:wrap;justify-content:center;gap:.55rem;margin-top:1.6rem}.pi-strip span{font-family:var(--mono,monospace);font-size:.68rem;letter-spacing:.07em;border:1px solid rgba(201,168,76,.35);background:rgba(201,168,76,.08);color:#0F2342;border-radius:999px;padding:.38rem .75rem}.pi-mockup-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:1.25rem;align-items:stretch}.pi-mockup{background:#fff;border-radius:18px;border:1px solid rgba(201,168,76,.26);box-shadow:0 28px 80px rgba(15,35,66,.14);overflow:hidden}.pi-mockup .bar{display:flex;gap:.35rem;align-items:center;background:#0F2342;padding:.85rem 1rem}.pi-mockup .dot{width:9px;height:9px;border-radius:50%;background:#C9A84C;opacity:.9}.pi-mockup .title{margin-left:auto;font-family:var(--mono,monospace);font-size:.64rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.62)}.pi-mockup .paper{padding:1.35rem}.pi-kpi{display:grid;grid-template-columns:repeat(3,1fr);gap:.65rem;margin-bottom:1rem}.pi-kpi div{background:#F8F5EF;border-radius:10px;padding:.85rem}.pi-kpi strong{display:block;font-family:var(--serif,Georgia,serif);font-size:1.25rem;color:#0F2342}.pi-kpi span{font-family:var(--mono,monospace);font-size:.58rem;color:#6B7080;letter-spacing:.08em;text-transform:uppercase}.pi-line{height:10px;background:#E8EBF0;border-radius:99px;margin:.55rem 0;overflow:hidden}.pi-line i{display:block;height:100%;background:#C9A84C;border-radius:99px}.pi-table{display:grid;gap:.5rem;margin-top:1rem}.pi-row{display:grid;grid-template-columns:1fr auto;gap:1rem;background:#F8F5EF;border-radius:10px;padding:.75rem .85rem;font-size:.82rem}.pi-row b{color:#0F2342}.pi-row span{font-family:var(--mono,monospace);font-size:.68rem;color:#C9A84C}.pi-note{background:#0F2342;color:#fff;border-radius:18px;padding:clamp(1.4rem,3vw,2rem);display:flex;flex-direction:column;justify-content:center}.pi-note h3{font-family:var(--serif,Georgia,serif);font-size:1.55rem;line-height:1.2;margin:0 0 .8rem;color:#fff}.pi-note p{color:rgba(255,255,255,.72);line-height:1.7}.pi-note .quote{border-left:3px solid #C9A84C;padding-left:1rem;margin-top:1.2rem;font-family:var(--serif,Georgia,serif);font-style:italic;color:rgba(255,255,255,.86)}.pi-before-after{display:grid;grid-template-columns:1fr 1fr;gap:1rem}.pi-ba{border-radius:16px;padding:1.5rem;border:1px solid rgba(15,35,66,.10);background:#fff}.pi-ba.before{background:#F8F5EF}.pi-ba.after{background:#0F2342;color:#fff;border-color:rgba(201,168,76,.35)}.pi-ba h3{font-family:var(--serif,Georgia,serif);font-size:1.3rem;margin-bottom:1rem}.pi-ba ul{display:grid;gap:.7rem;list-style:none;margin:0;padding:0}.pi-ba li{font-size:.9rem;line-height:1.55}.pi-ba.before li:before{content:'×';color:#B24B4B;font-weight:900;margin-right:.5rem}.pi-ba.after li:before{content:'✓';color:#C9A84C;font-weight:900;margin-right:.5rem}.pi-cta-inline{margin-top:2rem;text-align:center}.pi-cta-inline a{display:inline-flex;align-items:center;gap:.5rem;background:#C9A84C;color:#0F2342;border-radius:5px;padding:.85rem 1.8rem;font-weight:800}.agency-footer{background:#07172D!important;color:rgba(255,255,255,.62)!important;padding:clamp(3rem,6vw,4.5rem) 0 2rem!important;font-size:.85rem!important;text-align:left!important}.agency-footer-top{display:grid!important;grid-template-columns:minmax(240px,1.05fr) minmax(0,2fr)!important;gap:clamp(2rem,5vw,4rem)!important;align-items:start!important;padding-bottom:2rem!important;border-bottom:1px solid rgba(255,255,255,.10)!important}.agency-footer-brand{color:#fff!important;font-family:Arial,sans-serif!important;letter-spacing:.14em!important;font-weight:900!important;font-size:.78rem!important;text-transform:uppercase!important;margin-bottom:.75rem!important}.agency-footer-line{width:54px;height:2px;background:#C9A84C;margin-bottom:1rem}.agency-footer p{color:rgba(255,255,255,.56)!important;max-width:330px;line-height:1.7}.agency-footer-matrix{display:grid!important;grid-template-columns:repeat(3,minmax(150px,1fr))!important;gap:2rem!important}.agency-footer h4{font-family:var(--mono,monospace)!important;color:#C9A84C!important;font-size:.65rem!important;letter-spacing:.15em!important;text-transform:uppercase!important;margin-bottom:1rem!important}.agency-footer ul{list-style:none!important;display:grid!important;gap:.6rem!important;margin:0!important;padding:0!important}.agency-footer a{color:rgba(255,255,255,.62)!important;text-decoration:none!important}.agency-footer a:hover{color:#C9A84C!important}.agency-footer-bottom{display:flex!important;flex-wrap:wrap!important;justify-content:space-between!important;gap:1rem!important;padding-top:1.5rem!important;color:rgba(255,255,255,.42)!important;font-size:.75rem!important}footer nav,footer nav[style],footer .footer-nav,footer [class*="footer"] nav{position:static!important;inset:auto!important;z-index:auto!important;padding:0!important;background:transparent!important;box-shadow:none!important;backdrop-filter:none!important}
@media(max-width:900px){.agency-path-grid,.agency-ba-grid,.agency-deonto-grid,.agency-footer-top,.pi-grid,.pi-mockup-grid,.pi-before-after{grid-template-columns:1fr!important}.agency-service-links{grid-template-columns:repeat(2,1fr)}.agency-footer-matrix{grid-template-columns:repeat(2,1fr)!important}.pi-kpi{grid-template-columns:1fr}}@media(max-width:560px){.agency-service-links,.agency-footer-matrix{grid-template-columns:1fr!important}.agency-path{grid-template-columns:1fr}.hero-title-refined{font-size:clamp(2.35rem,12vw,3.15rem)!important}.hero-keywords span{font-size:.62rem!important;padding:.28rem .68rem!important}.service-offer{min-height:0!important}}
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
  return pattern.test(html) ? html.replace(pattern, replacement) : html.replace(before, `${replacement}\n${before}`);
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
  let out = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '');
  out = replaceOrInsert(out, /<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  out = replaceOrInsert(out, /<meta name="description" content="[\s\S]*?">/i, `<meta name="description" content="${description}">`);
  out = replaceOrInsert(out, /<link rel="canonical" href="[\s\S]*?">/i, `<link rel="canonical" href="${canonicalFor(file)}">`);
  out = replaceOrInsert(out, /<meta property="og:url" content="[\s\S]*?">/i, `<meta property="og:url" content="${canonicalFor(file)}">`);
  out = replaceOrInsert(out, /<meta property="og:title" content="[\s\S]*?">/i, `<meta property="og:title" content="${title}">`);
  out = replaceOrInsert(out, /<meta property="og:description" content="[\s\S]*?">/i, `<meta property="og:description" content="${description}">`);
  out = out.replace(/https:\/\/procurement-insider-git-main-procurement-insiders-projects\.vercel\.app/g, SITE_URL);
  return out.replace('</head>', `<script type="application/ld+json">${jsonLd(file)}</script>\n</head>`);
}

function normalizeNavigation(html, file) {
  let out = /id=["']navbar["']/.test(html) ? html : html.replace(/<nav(?=[\s>])/i, '<nav id="navbar"');
  if (file !== 'index.html') {
    out = out
      .replace(/\s*<li>\s*<a\s+href=["']\/["']>Accueil<\/a>\s*<\/li>/gi, '')
      .replace(/\s*<a\s+href=["']\/["']\s+onclick=["']toggleMenu\(\)["']>Accueil<\/a>/gi, '')
      .replace(/\s*<a\s+href=["']\/["']>Accueil<\/a>/gi, '');
  }
  return out
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
    .replace(/Responsable Achat &amp; March(?:é|\\u00e9)s Publics, ODYSSI\s*(?:–|\\u2013)\s*R(?:é|\\u00e9)gie des Eaux de la CACEM/g, 'Fondateur Procurement Insider')
    .replace(/Fort-de-France, Martinique/g, 'Martinique');
}

function footerHtml() {
  return `<!-- FOOTER --><footer class="agency-footer"><div class="container"><div class="agency-footer-top"><div><div class="agency-footer-brand">PROCUREMENT INSIDER</div><div class="agency-footer-line"></div><p>Conseil en marchés publics, commande publique et achat. Martinique & Antilles françaises.</p><p style="margin-top:1rem">Stéphane Loudoux<br>Fondateur Procurement Insider</p></div><div class="agency-footer-matrix"><div><h4>Navigation</h4><ul><li><a href="/#about">À propos</a></li><li><a href="/#cas-pratiques">Cas pratiques</a></li><li><a href="/outils-gratuits">Outils gratuits</a></li><li><a href="/#methode">Méthode</a></li><li><a href="/#deontologie">Déontologie</a></li></ul></div><div><h4>Services</h4><ul><li><a href="/services">Tous les services</a></li><li><a href="/entites-publiques">Rédaction DCE / CCTP</a></li><li><a href="/entreprises-privees">Accompagnement réponse AO</a></li><li><a href="/entites-publiques">Formation marchés publics</a></li><li><a href="/services">Veille & conseil mensuel</a></li><li><a href="/services">Ateliers collectifs</a></li></ul></div><div><h4>Contact</h4><ul><li><a href="/#contact">Diagnostic gratuit</a></li><li><a href="tel:+596696266231">+596 696 266 231</a></li><li><a href="mailto:loeildelacheteur@gmail.com">loeildelacheteur@gmail.com</a></li><li><a href="/faq">FAQ</a></li><li><a href="/mentions-legales">Mentions légales</a></li></ul></div></div></div><div class="agency-footer-bottom"><span>© 2026 Stéphane Loudoux — Procurement Insider — Martinique</span><span>Aucune promesse d’attribution. Conseil, méthode et structuration des dossiers.</span></div></div></footer>`;
}

function normalizeFooter(html) {
  if (/<!-- FOOTER -->\s*<footer[\s\S]*?<\/footer>/i.test(html)) {
    return html.replace(/<!-- FOOTER -->\s*<footer[\s\S]*?<\/footer>/i, footerHtml());
  }
  return html.replace('</body>', `${footerHtml()}\n</body>`);
}

function privateConversionBlocks() {
  return `
<!-- PI PRIVATE CONVERSION -->
<section class="pi-conversion alt pi-private-deliverables">
  <div class="container">
    <div class="pi-head"><span class="eyebrow">Livrables concrets</span><h2>Vous ne repartez pas avec des conseils vagues. Vous repartez avec un dossier exploitable.</h2><p>Chaque accompagnement transforme votre réponse en éléments visibles pour l’acheteur : preuves, méthode, références, engagements, cohérence prix/technique et contrôle final avant dépôt.</p></div>
    <div class="pi-grid">
      <div class="pi-card"><h3>Note Go / No-Go</h3><p>Un arbitrage clair avant de perdre du temps sur une opportunité fragile.</p><ul><li>Lecture RC / CCTP</li><li>Critères et pondération</li><li>Risques et chances réelles</li></ul></div>
      <div class="pi-card gold"><h3>Mémoire technique restructuré</h3><p>Votre savoir-faire est réorganisé selon la grille de lecture de l’acheteur.</p><ul><li>Plan aligné sur les critères</li><li>Preuves et références visibles</li><li>Engagements opérationnels lisibles</li></ul></div>
      <div class="pi-card"><h3>Check final avant dépôt</h3><p>Une dernière passe de conformité pour éviter les erreurs évitables.</p><ul><li>Pièces administratives</li><li>Cohérence des annexes</li><li>Points bloquants et irritants</li></ul></div>
    </div>
    <div class="pi-strip"><span>DC1 / DC2</span><span>Mémoire technique</span><span>BPU / DQE</span><span>Références</span><span>Planning</span><span>Moyens humains</span></div>
  </div>
</section>
<section class="pi-conversion pi-private-mockup">
  <div class="container pi-mockup-grid">
    <div class="pi-mockup"><div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="title">Aperçu livrable candidat</span></div><div class="paper"><div class="pi-kpi"><div><strong>82%</strong><span>alignement critères</span></div><div><strong>3</strong><span>risques majeurs</span></div><div><strong>48h</strong><span>plan action</span></div></div><div class="pi-line"><i style="width:82%"></i></div><div class="pi-line"><i style="width:67%"></i></div><div class="pi-line"><i style="width:91%"></i></div><div class="pi-table"><div class="pi-row"><b>Critère valeur technique</b><span>à renforcer</span></div><div class="pi-row"><b>Références locales</b><span>à valoriser</span></div><div class="pi-row"><b>Méthodologie d’exécution</b><span>priorité 1</span></div></div></div></div>
    <div class="pi-note"><h3>La différence se voit à la lecture.</h3><p>Un acheteur ne note pas une intention. Il note un dossier. Le travail consiste donc à rendre vos preuves immédiatement identifiables, dans l’ordre où elles seront évaluées.</p><div class="quote">Objectif : réduire l’effort de lecture de l’acheteur et augmenter la lisibilité de vos engagements.</div></div>
  </div>
</section>
<section class="pi-conversion alt pi-private-before-after">
  <div class="container">
    <div class="pi-head"><span class="eyebrow">Avant / Après</span><h2>Ce que l’accompagnement change dans votre réponse.</h2></div>
    <div class="pi-before-after"><div class="pi-ba before"><h3>Avant</h3><ul><li>Un mémoire générique qui raconte l’entreprise</li><li>Des références intéressantes mais mal placées</li><li>Des critères traités implicitement</li><li>Un prix peu relié à la méthode proposée</li></ul></div><div class="pi-ba after"><h3>Après</h3><ul><li>Un mémoire qui répond directement au RC</li><li>Des preuves placées sous les bons critères</li><li>Une méthode claire, vérifiable et notée</li><li>Une offre plus cohérente et défendable</li></ul></div></div>
    <div class="pi-cta-inline"><a href="/#contact">Faire analyser mon appel d’offres →</a></div>
  </div>
</section>`;
}

function publicConversionBlocks() {
  return `
<!-- PI PUBLIC CONVERSION -->
<section class="pi-conversion alt pi-public-deliverables">
  <div class="container">
    <div class="pi-head"><span class="eyebrow">Livrables acheteur</span><h2>Des pièces plus claires, plus cohérentes, plus faciles à défendre.</h2><p>L’objectif n’est pas de produire du volume documentaire. L’objectif est de sécuriser la chaîne besoin / pièces / critères / analyse, pour recevoir des offres comparables et limiter les angles de contestation.</p></div>
    <div class="pi-grid">
      <div class="pi-card"><h3>Audit RC / CCAP / CCTP</h3><p>Une lecture critique de vos pièces avant publication ou avant relance.</p><ul><li>Incohérences internes</li><li>Clauses sensibles</li><li>Points de clarification candidats</li></ul></div>
      <div class="pi-card gold"><h3>Matrice critères / preuves</h3><p>Un outil pour vérifier que les critères de jugement sont utiles, lisibles et exploitables.</p><ul><li>Sous-critères</li><li>Éléments attendus</li><li>Traçabilité de la notation</li></ul></div>
      <div class="pi-card"><h3>Restitution opérationnelle</h3><p>Une synthèse utilisable par l’équipe achat, le service prescripteur ou la direction.</p><ul><li>Risques priorisés</li><li>Corrections proposées</li><li>Arbitrages à valider</li></ul></div>
    </div>
    <div class="pi-strip"><span>RC</span><span>CCAP</span><span>CCTP</span><span>BPU / DQE</span><span>Critères</span><span>Analyse des offres</span></div>
  </div>
</section>
<section class="pi-conversion pi-public-mockup">
  <div class="container pi-mockup-grid">
    <div class="pi-mockup"><div class="bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="title">Aperçu livrable acheteur</span></div><div class="paper"><div class="pi-kpi"><div><strong>12</strong><span>risques détectés</span></div><div><strong>4</strong><span>clauses à revoir</span></div><div><strong>3</strong><span>arbitrages</span></div></div><div class="pi-line"><i style="width:74%"></i></div><div class="pi-line"><i style="width:58%"></i></div><div class="pi-line"><i style="width:88%"></i></div><div class="pi-table"><div class="pi-row"><b>Cohérence RC / CCTP</b><span>priorité 1</span></div><div class="pi-row"><b>Pondération valeur technique</b><span>à clarifier</span></div><div class="pi-row"><b>Comparabilité des offres</b><span>risque</span></div></div></div></div>
    <div class="pi-note"><h3>Un DCE solide commence par une grille de lecture solide.</h3><p>Les candidats répondent à ce que vos pièces leur permettent de comprendre. Des critères flous ou un CCTP ambigu produisent des offres difficiles à comparer.</p><div class="quote">Objectif : clarifier le besoin, sécuriser l’analyse et réduire le risque de procédure fragile.</div></div>
  </div>
</section>
<section class="pi-conversion alt pi-public-before-after">
  <div class="container">
    <div class="pi-head"><span class="eyebrow">Avant / Après</span><h2>Ce que l’intervention renforce côté acheteur.</h2></div>
    <div class="pi-before-after"><div class="pi-ba before"><h3>Avant</h3><ul><li>Un besoin technique partiellement formalisé</li><li>Des critères parfois déconnectés du CCTP</li><li>Des offres difficiles à comparer</li><li>Des réserves juridiques détectées trop tard</li></ul></div><div class="pi-ba after"><h3>Après</h3><ul><li>Un DCE plus lisible pour le marché fournisseur</li><li>Des critères alignés avec les attendus réels</li><li>Une analyse plus traçable et justifiable</li><li>Une procédure plus robuste avant publication</li></ul></div></div>
    <div class="pi-cta-inline"><a href="/#contact">Sécuriser ma prochaine procédure →</a></div>
  </div>
</section>`;
}

function normalizeHome(html, file) {
  if (file !== 'index.html') return html;
  const paths = `<!-- PARCOURS DE DECISION --><section class="agency-paths" id="targets"><div class="container"><span class="agency-kicker">Choisissez votre point d'entrée</span><h2 class="agency-title" style="margin-top:.7rem">Deux besoins, deux parcours. Même exigence de méthode.</h2><p class="agency-muted" style="max-width:680px;margin-top:1rem">Sélectionnez votre situation : l’objectif est d’aller vite vers l’offre, le vocabulaire et les livrables qui correspondent à votre enjeu.</p><div class="agency-path-grid"><a href="/entreprises-privees" class="agency-card agency-path"><div class="agency-path-i">E</div><div><h3>Je suis une entreprise</h3><p>Je veux savoir si je dois répondre, améliorer mon mémoire technique ou sécuriser mon dépôt.</p><ul><li>Analyse du DCE et des critères</li><li>Go / No-Go argumenté</li><li>Mémoire technique plus lisible</li></ul><span class="agency-cta">Préparer ma réponse AO →</span></div></a><a href="/entites-publiques" class="agency-card agency-path"><div class="agency-path-i">P</div><div><h3>Je suis une entité publique</h3><p>Je veux sécuriser mon DCE, contrôler mes critères ou renforcer mon équipe achat.</p><ul><li>Audit RC / CCAP / CCTP</li><li>Relecture des critères et pièces financières</li><li>Formation opérationnelle</li></ul><span class="agency-cta">Sécuriser ma procédure →</span></div></a></div></div></section><section class="agency-ba"><div class="container"><span class="agency-kicker">Avant / Après</span><h2 class="agency-title" style="margin-top:.7rem">Ce que je transforme concrètement.</h2><div class="agency-ba-grid"><div class="agency-ba-card before"><h3>Avant</h3><ul><li>Mémoire générique qui ne suit pas les critères</li><li>Références fortes mais mal valorisées</li><li>DCE ou offre avec zones de risque invisibles</li></ul></div><div class="agency-ba-card after"><h3>Après</h3><ul><li>Réponse structurée selon la grille de lecture de l’acheteur</li><li>Preuves, moyens et engagements mieux placés</li><li>Dossier plus lisible, cohérent et défendable</li></ul></div></div></div></section><!-- STATS COMPTEUR -->`;
  const deonto = `<section class="agency-deonto" id="deontologie"><div class="container agency-deonto-grid"><div><span class="agency-kicker">Déontologie</span><h2 class="agency-title" style="color:white;margin-top:.7rem">Un cadre clair avant chaque mission.</h2><p style="color:rgba(255,255,255,.70);line-height:1.75;margin-top:1rem">Aider à mieux structurer, jamais contourner. Chaque mission doit être compatible avec les règles de la commande publique et l’absence de conflit d’intérêts.</p></div><div><div class="agency-deonto-card"><strong>Aucun conflit d’intérêts</strong><span>Pas d’intervention sur une procédure liée directement ou indirectement à mon employeur public actuel ou passé récent.</span></div><div class="agency-deonto-card"><strong>Aucune promesse d’attribution</strong><span>Je m’engage sur la qualité de mes conseils et méthodes. La décision appartient exclusivement à l’acheteur public.</span></div><div class="agency-deonto-card"><strong>Accompagnement transparent</strong><span>Sécuriser, clarifier, structurer et rendre les dossiers plus lisibles au regard des critères.</span></div></div></div></section>`;
  let out = html
    .replace(/<div class="hero-eyebrow label">Consultant Expert — Martinique<\/div>/i, '<div class="hero-eyebrow label">Conseil marchés publics — Martinique</div>')
    .replace(/<h1 class="display hero-title">[\s\S]*?<\/h1>/i, '<h1 class="display hero-title hero-title-refined"><span>Votre offre est solide.</span><em>Rendons-la lisible<br>pour l’acheteur public.</em></h1>')
    .replace(/<p class="lead hero-subtitle">[\s\S]*?<\/p>/i, `<p class="lead hero-subtitle hero-subtitle-agency">${FOUNDER_HERO}</p>`)
    .replace(/\s*<!-- Pills de preuve sociale sous le titre -->\s*<div style="display:flex;flex-wrap:wrap;gap:\.6rem;margin-bottom:1\.75rem">[\s\S]*?<\/div>/i, '\n      <div class="hero-keywords"><span><strong>10 ans</strong> terrain achat public</span><span>Lecture RC</span><span>Critères de notation</span><span>Mémoire technique</span><span>DCE / CCTP</span><span>MAPA</span></div>')
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
  out = out.replace(/\s*<!-- DÉONTOLOGIE & INDÉPENDANCE -->\s*<section id="deontologie"[\s\S]*?<\/section>\s*(?=<!-- CAS PRATIQUES -->)/i, '');
  return out.includes('agency-deonto') ? out : out.replace(/<!-- INSIGHTS & VEILLE -->/i, `${deonto}<!-- INSIGHTS & VEILLE -->`);
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
  let out = html
    .replace(/Vous connaissez votre métier\.<br>Je connais <em style="color:var\(--gold\);font-style:normal">l'acheteur public\.<\/em>/i, 'Votre offre est sérieuse.<br>Je l’aide à devenir <em style="color:var(--gold);font-style:normal">lisible, notée, défendable.</em>')
    .replace(/La plupart des marchés perdus ne le sont pas sur la compétence technique — mais sur la façon de la présenter\. Je vous aide à construire des dossiers qui parlent le langage de l'acheteur\./g, 'Je vous aide à traduire votre savoir-faire en réponse structurée : critères traités, preuves visibles, mémoire technique clair, dossier conforme avant dépôt.')
    .replace(/Diagnostic gratuit 30 min/g, 'Faire analyser mon AO')
    .replace(/Prêt à déposer un dossier qui gagne \?/g, 'Prêt à déposer un dossier plus solide ?')
    .replace(/Deux mois plus tard, nous décrochions un marché de 280(?:&nbsp;|\s)000(?:&nbsp;|\s)€ avec une collectivité avec laquelle nous n'avions jamais travaillé\./g, NEUTRAL_CASE_RESULT)
    .replace(/<strong class="temoignage-name">M\. C\.?<\/strong>/g, '<strong class="temoignage-name">Cas client anonymisé</strong>');
  if (!out.includes('pi-private-deliverables')) out = out.replace(/<!-- TARIFS -->/i, `${privateConversionBlocks()}\n<!-- TARIFS -->`);
  return out;
}

function normalizePublicPage(html, file) {
  if (file !== 'entites-publiques.html') return html;
  let out = html
    .replace(/Sécurisez vos procédures\.<br><em>Optimisez<\/em> chaque achat\./i, 'Des DCE plus clairs.<br>Des procédures <em>mieux sécurisées.</em>')
    .replace(/Votre acheteur public mérite un soutien à la hauteur de ses responsabilités\. J'interviens en renfort de vos équipes pour sécuriser juridiquement vos procédures, rédiger vos DCE et former vos agents\./g, 'J’interviens en renfort opérationnel de vos équipes : relecture critique, cohérence RC/CCTP/BPU, critères de jugement, clauses sensibles, formation et méthode d’analyse.')
    .replace(/Demander un devis/g, 'Sécuriser ma procédure')
    .replace(/Voir les tarifs/g, 'Voir les offres');
  if (!out.includes('pi-public-deliverables')) out = out.replace(/<!-- TARIFS -->/i, `${publicConversionBlocks()}\n<!-- TARIFS -->`);
  return out;
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

function harden(html) {
  return html
    .replace(/<button class="btn-cookie-refuse"[\s\S]*?<\/button>/i, '')
    .replace(/<h4>J'ai décidé des attributions<\/h4>\s*<p>J'ai noté vos offres, comparé vos prix, validé vos références\. Je sais pourquoi un dossier gagne — et pourquoi un autre, techniquement meilleur, perd\. Cette lecture est unique\.<\/p>/g, '<h4>Je connais la mécanique d’analyse</h4><p>Critères, pondération, cohérence prix/technique, preuves attendues : je vous aide à rendre votre dossier plus lisible et plus défendable, sans jamais promettre l’attribution.</p>')
    .replace(/<strong class="about-temoignage-name">M\. C\.<\/strong>/g, '<strong class="about-temoignage-name">Cas client anonymisé</strong>')
    .replace(/required id="message"><\/textarea>/g, 'required></textarea>')
    .replace(/<p><strong>Stéphane Loudoux<\/strong>\s*(?:—|\\u2014)\s*Responsable Achat &amp; March(?:é|\\u00e9)s Publics, ODYSSI\s*(?:–|\\u2013)\s*R(?:é|\\u00e9)gie des Eaux de la CACEM<\/p>/g, '<p><strong>Stéphane Loudoux</strong> — Fondateur Procurement Insider</p>')
    .replace(/<p style="margin-top:\.5rem">Fort-de-France, Martinique[\s\S]*?<\/p>/g, '<p style="margin-top:.5rem">Martinique · loeildelacheteur@gmail.com</p>')
    .replace(/const nav = document\.querySelector\('nav'\);/g, "const nav = document.getElementById('navbar');")
    .replace(/window\.addEventListener\('scroll', \(\) => nav\.classList\.toggle\('scrolled', window\.scrollY > 60\), \{passive:true\}\);/g, "if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), {passive:true});");
}

function injectCss(html) {
  return html.includes('pi-consolidated-renderer') ? html : html.replace('</head>', `${RENDERER_CSS}\n</head>`);
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
    const source = await fetch(rawUrl, { headers: { 'User-Agent': 'Procurement-Insider-renderer/3.0' } });
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
