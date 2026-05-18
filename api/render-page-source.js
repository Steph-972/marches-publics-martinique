const path = require('path');

const REPO_OWNER = 'Steph-972';
const REPO_NAME = 'marches-publics-martinique';
const CANONICAL_BASE = process.env.SITE_BASE || 'https://marches-publics-martinique.vercel.app';

const MAIN_LOGO_SVG = `<svg viewBox="0 0 310 52" xmlns="http://www.w3.org/2000/svg" style="height:36px;width:auto;display:block" aria-hidden="true"><rect x="0" y="4" width="5" height="44" rx="2.5" fill="#C9A84C"/><text x="13" y="32" font-family="Arial Black,Arial,sans-serif" font-size="18" font-weight="900" fill="currentColor" letter-spacing="0.8">PROCUREMENT INSIDER</text><rect x="13" y="37" width="291" height="1" fill="#C9A84C"/><text x="13" y="48" font-family="Arial,sans-serif" font-size="7.5" fill="#C9A84C" letter-spacing="3">L'ŒIL DE L'ACHETEUR</text></svg><span class="sr-only">Procurement Insider — L'Œil de l'Acheteur</span>`;

const ALLOWED_FILES = new Set([
  'mentions-legales.html',
  'conditions-generales-prestations-services.html',
  'politique-confidentialite.html',
  'politique-cookies.html',
  'deontologie.html',
  'a-propos.html',
  'formation-marches-publics-martinique.html'
]);

function safeFile(value) {
  const file = path.basename(String(value || '').trim());
  return ALLOWED_FILES.has(file) ? file : null;
}

function safeRef(value) {
  const ref = String(value || '').trim();
  return /^[A-Za-z0-9._\/-]+$/.test(ref) ? ref : 'main';
}

function normalizeTechnicalDomains(html) {
  return String(html || '')
    .replace(/https:\/\/procurement-insider\.fr/g, CANONICAL_BASE)
    .replace(/https:\/\/marches-publics-martinique\.vercel\.app/g, CANONICAL_BASE)
    .replace(/https:\/\/procurement-insider-git-main-procurement-insiders-projects\.vercel\.app/g, CANONICAL_BASE)
    .replace(/https:\/\/procurement-insider-[a-z0-9-]+-procurement-insiders-projects\.vercel\.app/g, CANONICAL_BASE);
}

function normalizePublicPlaceholders(html) {
  return String(html || '')
    .replace(/\[EMAIL_PRO_À_INSÉRER\]/g, 'loeildelacheteur@gmail.com')
    .replace(/\[DOMAINE_ACTIF_À_INSÉRER\]/g, CANONICAL_BASE)
    .replace(/\[SIRET_À_INSÉRER\]/g, 'en cours d’immatriculation')
    .replace(/\[RNE_OU_REGISTRE_À_INSÉRER\]/g, 'à compléter après immatriculation')
    .replace(/\[RÉGIME_TVA_À_INSÉRER\]/g, 'à confirmer après immatriculation')
    .replace(/\[ASSURANCE_RC_PRO_À_INSÉRER\]/g, 'en cours de souscription')
    .replace(/\[MÉDIATEUR_À_INSÉRER\]/g, 'à désigner si l’activité est ouverte à des consommateurs au sens du Code de la consommation');
}

function harmonizeLogo(html) {
  const override = `.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.brand,.nav-logo{display:flex!important;align-items:center;color:#fff!important}.site-header,.top{background:#0F2342!important;border-bottom:1px solid rgba(201,168,76,.22)!important}.main-nav a,.links a{color:rgba(255,255,255,.86)!important}.main-nav a:hover,.links a:hover{color:#C9A84C!important}.nav-cta{background:#C9A84C!important;color:#0F2342!important}.site-footer,.pi-legal-footer{background:#0F2342!important}`;
  return String(html || '')
    .replace(/<a([^>]*class=["'][^"']*\bbrand\b[^"']*["'][^>]*)>[\s\S]*?<\/a>/i, `<a$1>${MAIN_LOGO_SVG}</a>`)
    .replace(/<a([^>]*class=["'][^"']*\bnav-logo\b[^"']*["'][^>]*)>[\s\S]*?<\/a>/i, `<a$1>${MAIN_LOGO_SVG}</a>`)
    .replace(/<\/style>/i, override + '</style>');
}

function legalFooter() {
  return `<footer class="pi-legal-footer"><div><strong>Procurement Insider</strong><p>Conseil opérationnel en commande publique. Obligation de moyens. Aucune promesse d’attribution.</p></div><nav><strong>Ressources</strong><a href="/a-propos">À propos</a><a href="/formation-marches-publics-martinique">Formation</a><a href="/insights">Insights</a><a href="/outils-gratuits">Outils gratuits</a></nav><nav><strong>Juridique</strong><a href="/mentions-legales">Mentions légales</a><a href="/conditions-generales-prestations-services">CGPS</a><a href="/politique-confidentialite">Politique de confidentialité</a><a href="/politique-cookies">Politique cookies</a><a href="/deontologie">Charte de déontologie</a></nav></footer>`;
}

function shellMinimalLegalPage(html, file) {
  const input = String(html || '');
  if (input.includes('legal-card') || input.includes('class="doc"')) return input;
  if (!['politique-confidentialite.html', 'politique-cookies.html', 'deontologie.html'].includes(file)) return input;

  const title = (input.match(/<title>([\s\S]*?)<\/title>/i) || [null, 'Procurement Insider'])[1];
  const body = (input.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [null, input])[1];
  const route = file.replace('.html', '');
  const cleanTitle = title.replace(/\s*\|\s*Procurement Insider\s*$/i, '');

  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description" content="${cleanTitle} de Procurement Insider."><link rel="canonical" href="${CANONICAL_BASE}/${route}"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet"><style>:root{--navy:#0F2342;--navy-mid:#1A3A6B;--gold:#C9A84C;--cream:#F8F5EF;--white:#fff;--gray:#6B7080;--text:#1C1C2E;--border:#EDE8DC;--serif:'Playfair Display',Georgia,serif;--sans:'DM Sans',system-ui,sans-serif;--mono:'DM Mono',monospace}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:var(--sans);background:var(--cream);color:var(--text);line-height:1.72}a{color:var(--navy);text-decoration:none}a:hover{color:var(--gold)}.top{background:var(--navy);border-bottom:1px solid rgba(201,168,76,.22);position:sticky;top:0;z-index:10}.nav{max-width:1180px;margin:auto;padding:18px clamp(1.5rem,5vw,3rem);display:flex;justify-content:space-between;gap:20px;align-items:center}.brand{color:var(--white)}.links{display:flex;gap:18px;flex-wrap:wrap;font-size:.86rem;font-weight:500}.links a{color:rgba(255,255,255,.84)}.links a:hover{color:var(--gold)}.hero{background:linear-gradient(135deg,#0F2342,#1A3A6B);color:#fff;padding:76px clamp(1.5rem,5vw,3rem);position:relative;overflow:hidden}.hero:after{content:'';position:absolute;right:-8rem;top:-8rem;width:22rem;height:22rem;border:1px solid rgba(201,168,76,.18);border-radius:50%}.hero-inner{max-width:960px;margin:auto;position:relative;z-index:1}.eyebrow{color:var(--gold);font-family:var(--mono);font-weight:500;text-transform:uppercase;letter-spacing:.18em;font-size:.7rem}h1{font-family:var(--serif);font-size:clamp(2.1rem,4vw,3.8rem);line-height:1.08;margin:12px 0 14px;letter-spacing:-.02em}.wrap{max-width:980px;margin:auto;padding:52px clamp(1.5rem,5vw,3rem) 84px}.doc{background:#fff;border:1px solid var(--border);border-radius:18px;padding:clamp(26px,4vw,46px);box-shadow:0 24px 80px rgba(15,35,66,.10)}.doc h1{display:none}.doc h2{font-family:var(--serif);color:var(--navy);font-size:1.45rem;margin:38px 0 12px}.doc p,.doc li{font-size:.98rem}.doc ul{padding-left:1.2rem}.doc button{background:var(--navy);color:#fff;border:0;border-radius:4px;padding:.85rem 1.15rem;font-weight:600;cursor:pointer;margin:.25rem}.pi-legal-footer{background:var(--navy);color:rgba(255,255,255,.75);padding:38px clamp(1.5rem,5vw,3rem);display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:26px}.pi-legal-footer strong{color:#fff}.pi-legal-footer a{display:block;color:rgba(255,255,255,.75);margin:.35rem 0}.pi-legal-footer a:hover{color:var(--gold)}@media(max-width:820px){.nav{align-items:flex-start;flex-direction:column}.pi-legal-footer{grid-template-columns:1fr}}</style></head><body><header class="top"><div class="nav"><a class="brand" href="/">${MAIN_LOGO_SVG}</a><nav class="links"><a href="/services">Services</a><a href="/formation-marches-publics-martinique">Formation</a><a href="/outils-gratuits">Outils gratuits</a><a href="/insights">Insights</a><a href="/a-propos">À propos</a><a href="/#contact">Contact</a></nav></div></header><section class="hero"><div class="hero-inner"><div class="eyebrow">Juridique</div><h1>${cleanTitle}</h1></div></section><main class="wrap"><article class="doc">${body}<p><a href="#" onclick="window.scrollTo({top:0,behavior:'smooth'});return false;" style="display:inline-block;margin-top:28px;font-weight:750;color:#c9a45c">Retour en haut ↑</a></p></article></main>${legalFooter()}</body></html>`;
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
    const source = await fetch(rawUrl, { headers: { 'User-Agent': 'Procurement-Insider-source-renderer/1.0' } });
    if (!source.ok) throw new Error(`Unable to fetch ${file} from GitHub raw: ${source.status}`);

    const html = harmonizeLogo(shellMinimalLegalPage(normalizePublicPlaceholders(normalizeTechnicalDomains(await source.text())), file));
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    res.end(html);
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end(`Erreur de rendu de la page source: ${error.message}`);
  }
};