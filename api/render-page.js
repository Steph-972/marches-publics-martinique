const path = require('path');

const REPO_OWNER = 'Steph-972';
const REPO_NAME = 'marches-publics-martinique';

const ALLOWED_FILES = new Set([
  'services.html',
  'entreprises-privees.html',
  'entites-publiques.html',
  'faq.html',
  'mentions-legales.html',
  'outils-gratuits.html',
  'grille-mapa.html'
]);

const HOTFIX_CSS = `
<style id="display-hotfix-secondary-pages">
/* Correctif d'affichage transversal pour pages secondaires.
   Objectif : éviter que les règles du header touchent les navigations internes
   et stabiliser les images éditoriales sur desktop/mobile. */
html, body {
  max-width: 100%;
  overflow-x: hidden;
}
body > nav#navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
footer nav,
footer nav[style],
footer .footer-nav,
footer [class*="footer"] nav {
  position: static !important;
  inset: auto !important;
  top: auto !important;
  left: auto !important;
  right: auto !important;
  bottom: auto !important;
  z-index: auto !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
footer nav {
  display: flex !important;
  flex-wrap: wrap !important;
  align-items: flex-start !important;
  justify-content: flex-start !important;
}
img {
  max-width: 100%;
  height: auto;
}
.page-hero + div img,
.page-hero-img img,
.page-hero-img-inner img {
  width: 100%;
  max-height: 340px;
  object-fit: cover;
  display: block;
}
.mobile-menu {
  z-index: 9999 !important;
}
@media (max-width: 768px) {
  .page-hero + div,
  .page-hero-img {
    margin-top: 0 !important;
  }
  .page-hero + div img,
  .page-hero-img img,
  .page-hero-img-inner img {
    max-height: 260px;
  }
  footer nav {
    flex-direction: column !important;
    gap: 1.5rem !important;
  }
}
</style>`;

function safeFile(value) {
  const raw = String(value || '').trim();
  const normalized = path.basename(raw);
  return ALLOWED_FILES.has(normalized) ? normalized : null;
}

function safeRef(value) {
  const raw = String(value || '').trim();
  return /^[A-Za-z0-9._\/-]+$/.test(raw) ? raw : 'main';
}

function normalizeHeaderNav(html) {
  if (html.includes('id="navbar"') || html.includes("id='navbar'")) {
    return html;
  }

  return html.replace(/<nav(?=[\s>])/i, '<nav id="navbar"');
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
    const source = await fetch(rawUrl, {
      headers: { 'User-Agent': 'Procurement-Insider-renderer/1.0' }
    });

    if (!source.ok) {
      throw new Error(`Unable to fetch ${file} from GitHub raw: ${source.status}`);
    }

    let html = await source.text();

    // Normalise la navigation principale : certaines pages utilisaient <nav> sans id,
    // ce qui rendait les correctifs CSS et JS moins fiables.
    html = normalizeHeaderNav(html);

    // Sécurise aussi le JS sur les pages où document.querySelector('nav') existe.
    html = html
      .replace(/const nav = document\.querySelector\('nav'\);/g, "const nav = document.getElementById('navbar');")
      .replace(/window\.addEventListener\('scroll', \(\) => nav\.classList\.toggle\('scrolled', window\.scrollY > 60\), \{passive:true\}\);/g,
        "if (nav) window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), {passive:true});");

    if (!html.includes('display-hotfix-secondary-pages')) {
      html = html.includes('</head>')
        ? html.replace('</head>', `${HOTFIX_CSS}\n</head>`)
        : `${HOTFIX_CSS}\n${html}`;
    }

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
