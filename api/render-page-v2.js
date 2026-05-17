const baseRenderer = require('./render-page.js');

const SITE_URL = 'https://marches-publics-martinique.vercel.app';

const ROUTE_BY_FILE = {
  'index.html': '/',
  'services.html': '/services',
  'entreprises-privees.html': '/entreprises-privees',
  'entites-publiques.html': '/entites-publiques',
  'faq.html': '/faq',
  'mentions-legales.html': '/mentions-legales',
  'outils-gratuits.html': '/outils-gratuits',
  'grille-mapa.html': '/grille-mapa'
};

function canonicalFor(file) {
  const route = ROUTE_BY_FILE[file] || '/';
  return route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
}

function jsonLdFor(file) {
  const canonical = canonicalFor(file);
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
      url: canonical,
      isPartOf: { '@type': 'WebSite', name: 'Procurement Insider', url: SITE_URL },
      inLanguage: 'fr-FR'
    }
  ]);
}

function hardenHtml(html, file) {
  if (typeof html !== 'string' || !html.includes('<html')) return html;

  const hardeningCss = `
<style id="agency-hardening">
#splash{display:none!important;visibility:hidden!important;pointer-events:none!important}
body.splash-active #nav,
body.splash-active #navbar,
body.splash-active #hero,
body.splash-active #cookie-banner,
body.splash-active section{visibility:visible!important}
.btn-cookie-refuse{display:none!important}
#cookie-banner{justify-content:space-between}
#cookie-banner .cookie-btns{flex:0 0 auto}
</style>`;

  html = html
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '')
    .replace(/<button class="btn-cookie-refuse"[\s\S]*?<\/button>/i, '')
    .replace(/\s*<!-- DÉONTOLOGIE & INDÉPENDANCE -->\s*<section id="deontologie"[\s\S]*?<\/section>\s*(?=<!-- CAS PRATIQUES -->)/i, '')
    .replace(/93%<\/strong>&nbsp;satisfaction/g, '93%</strong>&nbsp;retours')
    .replace(/\s*<span style="display:inline-flex;align-items:center;gap:\.4rem;background:rgba\(255,255,255,\.1\);border:1px solid rgba\(255,255,255,\.18\);border-radius:20px;padding:\.3rem \.85rem;font-family:var\(--mono\);font-size:\.68rem;letter-spacing:\.05em;color:rgba\(255,255,255,\.82\)"><strong style="color:var\(--gold\)">2<\/strong>&nbsp;cibles<\/span>/g, '')
    .replace(/\s*<span style="display:inline-flex;align-items:center;gap:\.4rem;background:rgba\(255,255,255,\.1\);border:1px solid rgba\(255,255,255,\.18\);border-radius:20px;padding:\.3rem \.85rem;font-family:var\(--mono\);font-size:\.68rem;letter-spacing:\.05em;color:rgba\(255,255,255,\.82\)"><strong style="color:var\(--gold\)">3<\/strong>&nbsp;territoires<\/span>/g, '')
    .replace(/<h4>J'ai décidé des attributions<\/h4>\s*<p>J'ai noté vos offres, comparé vos prix, validé vos références\. Je sais pourquoi un dossier gagne — et pourquoi un autre, techniquement meilleur, perd\. Cette lecture est unique\.<\/p>/g,
      '<h4>Je connais la mécanique d’analyse</h4><p>Critères, pondération, cohérence prix/technique, preuves attendues : je vous aide à rendre votre dossier plus lisible et plus défendable, sans jamais promettre l’attribution.</p>')
    .replace(/Deux mois plus tard, nous décrochions un marché de 280&nbsp;000&nbsp;€ avec une collectivité avec laquelle nous n'avions jamais travaillé\./g,
      'Le dossier a gagné en clarté, en preuves et en cohérence. Résultat : une réponse nettement plus professionnelle et mieux alignée sur les attentes de l’acheteur.')
    .replace(/<strong class="about-temoignage-name">M\. C\.<\/strong>/g, '<strong class="about-temoignage-name">Cas client anonymisé</strong>')
    .replace(/required id="message"><\/textarea>/g, 'required></textarea>')
    .replace(/Stéphane Loudoux<\/strong>\s*—\s*Responsable Achat &amp; March(?:é|\\u00e9)s Publics, ODYSSI(?:\s*–|\s*\\u2013)\s*R(?:é|\\u00e9)gie des Eaux de la CACEM/gi,
      'Stéphane Loudoux</strong> — Fondateur Procurement Insider')
    .replace(/Stéphane Loudoux<\/strong>\s*—\s*Fondateur Procurement Insider<\/p>'/g,
      "Stéphane Loudoux</strong> — Fondateur Procurement Insider</p>'")
    .replace(/<p style="margin-top:\.5rem">Fort-de-France, Martinique[\s\S]*?<\/p>/g,
      '<p style="margin-top:.5rem">Martinique · loeildelacheteur@gmail.com</p>')
    .replace(/Fort-de-France, Martinique/g, 'Martinique');

  html = html.replace('</head>', `<script type="application/ld+json">${jsonLdFor(file)}</script>\n${hardeningCss}\n</head>`);
  return html;
}

module.exports = async function handler(req, res) {
  const chunks = [];
  const originalWrite = res.write ? res.write.bind(res) : null;
  const originalEnd = res.end.bind(res);

  if (originalWrite) {
    res.write = function patchedWrite(chunk, encoding, callback) {
      if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk), encoding || 'utf8'));
      if (typeof callback === 'function') callback();
      return true;
    };
  }

  res.end = function patchedEnd(chunk, encoding, callback) {
    if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk), encoding || 'utf8'));
    const body = Buffer.concat(chunks).toString('utf8');
    const file = req.query && req.query.file;
    const contentType = String(res.getHeader('Content-Type') || res.getHeader('content-type') || '');
    const output = contentType.includes('text/html') || body.trim().startsWith('<!DOCTYPE html') || body.trim().startsWith('<html')
      ? hardenHtml(body, file)
      : body;
    return originalEnd(output, 'utf8', callback);
  };

  return baseRenderer(req, res);
};
