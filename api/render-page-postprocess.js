const baseHandler = require('./render-page');
const { applyComplianceLayer } = require('./compliance-layer');

const PUBLIC_BASE = 'https://marches-publics-martinique.vercel.app';
const NEUTRAL_CASE_RESULT = "Le dossier a gagné en clarté, en preuves et en cohérence. Résultat : une réponse nettement plus professionnelle, mieux structurée et mieux alignée sur les attentes de l’acheteur.";
const NEUTRAL_GUARANTEE = "Ce que je vise : un dossier plus clair, plus cohérent et mieux aligné avec les critères. La décision finale appartient exclusivement à l’acheteur.";

function replaceAllSafe(html) {
  return String(html || '')
    .replace(/https:\/\/procurement-insider-git-main-procurement-insiders-projects\.vercel\.app/g, PUBLIC_BASE)
    .replace(/https:\/\/procurement-insider-[a-z0-9-]+-procurement-insiders-projects\.vercel\.app/g, PUBLIC_BASE)
    .replace(/Augmentez vos chances aux marchés publics/gi, 'Renforcez vos réponses aux marchés publics')
    .replace(/Augmentez vos chances aux marchés publics en Martinique/gi, 'Renforcez vos réponses aux marchés publics en Martinique')
    .replace(/Deux mois plus tard, nous décrochions un marché de 280(?:&nbsp;|\s|\u00a0)*000(?:&nbsp;|\s|\u00a0)*€ avec une collectivité avec laquelle nous n'avions jamais travaillé\./g, NEUTRAL_CASE_RESULT)
    .replace(/Deux mois plus tard, nous decrochions un marche de 280(?:&nbsp;|\s|\u00a0)*000(?:&nbsp;|\s|\u00a0)*€ avec une collectivite avec laquelle nous n'avions jamais travaille\./gi, NEUTRAL_CASE_RESULT)
    .replace(/Prêt à déposer un dossier qui gagne ?/g, 'Prêt à déposer un dossier plus solide ?')
    .replace(/Ce que je garantis\s*:\s*un dossier irréprochable, une offre valorisée, une stratégie adaptée\. Le reste appartient à l['’]acheteur\./gi, NEUTRAL_GUARANTEE)
    .replace(/Ce que je garantis\s*:\s*un dossier irreprochable, une offre valorisee, une strategie adaptee\. Le reste appartient a l['’]acheteur\./gi, NEUTRAL_GUARANTEE)
    .replace(/Connaître les deux côtés de la table est un avantage décisif/gi, 'Connaître les deux côtés de la table est un avantage méthodologique')
    .replace(/maximiser vos chances/gi, 'renforcer la qualité de votre réponse')
    .replace(/augmenter vos chances/gi, 'renforcer votre dossier')
    .replace(/améliorer leurs réponses et augmenter leurs chances aux appels d'offres/gi, 'améliorer leurs réponses aux appels d’offres')
    .replace(/Données sécurisées · RGPD/g, 'Données traitées confidentiellement · RGPD')
    .replace(/Réponse garantie sous 48h ouvrées/g, 'Réponse généralement sous 48h ouvrées')
    .replace(/Je vous réponds personnellement sous 48h ouvrées/g, 'Je reviens vers vous personnellement, en général sous 48h ouvrées')
    .replace(/Je vous répondrai dans les 48h ouvrées/g, 'Je reviendrai vers vous en général sous 48h ouvrées')
    .replace(/Dernière mise à jour : mai 2025/g, 'Dernière mise à jour : mai 2026')
    .replace(/© 2025 Stéphane Loudoux/g, '© 2026 Stéphane Loudoux');
}

function insertToolsInNav(html) {
  let output = html.replace(/(<ul class=\"nav-links\">)([\s\S]*?)(<\/ul>)/g, (match, open, body, close) => {
    if (body.toLowerCase().includes('/outils-gratuits')) return match;
    const item = '        <li><a href="/outils-gratuits">Outils gratuits</a></li>\n';
    if (/\s*<li><a[^>]*class=\"nav-cta\"[\s\S]*?<\/li>/.test(body)) body = body.replace(/(\s*<li><a[^>]*class=\"nav-cta\"[\s\S]*?<\/li>)/, '\n' + item + '$1');
    else body += '\n' + item;
    return open + body + close;
  });
  output = output.replace(/(<div class=\"mobile-menu\"[^>]*>)([\s\S]*?)(<\/div>)/g, (match, open, body, close) => {
    if (body.toLowerCase().includes('/outils-gratuits')) return match;
    return open + body + '\n  <a href="/outils-gratuits" onclick="toggleMenu()">Outils gratuits</a>\n' + close;
  });
  return output;
}

function normalizeFreeTools(html) {
  return html
    .replace(/Accès immédiat après inscription/g, 'Accès gratuit après inscription')
    .replace(/Accès libre immédiat/g, 'Accès après inscription gratuite')
    .replace(/Accès immédiat · Sans engagement · Déontologie respectée/g, 'Inscription gratuite · Sans compte utilisateur · Déontologie respectée')
    .replace(/Recevoir aussi la grille par email/g, 'Recevoir la grille gratuite')
    .replace(/Gratuits, sans engagement\./g, 'Gratuits, sans compte utilisateur et sans engagement.');
}

function normalizeContactForm(html) {
  return html
    .replace(/email:\s*document\.getElementById\('email'\)\.value\.trim\(\),\n\s*organisation:/g, "email:        document.getElementById('email').value.trim(),\n        telephone:    document.getElementById('telephone') ? document.getElementById('telephone').value.trim() : '',\n        organisation:")
    .replace(/Écrivez-moi/g, 'Expliquez-moi votre besoin');
}

function normalizeHomeInsights(html) {
  return html
    .replace(/const published = articles\.filter\(a => a\.published\);/g, 'const published = articles.filter(a => a.published);\n    const visibleArticles = published.slice(0, 6);')
    .replace(/grid\.innerHTML = published\.map\(a => `/g, 'grid.innerHTML = visibleArticles.map(a => `');
}

function normalizeInternalLinks(html) {
  return html
    .replace(/href=\"#insights\">Insights<\/a>/g, 'href="/insights">Insights</a>')
    .replace(/href=\"#insights\" onclick=\"toggleMenu\(\)\">Insights<\/a>/g, 'href="/insights" onclick="toggleMenu()">Insights</a>')
    .replace(/href=\"#contact\"/g, 'href="/#contact"')
    .replace(/href=\"#tarifs\"/g, 'href="#tarifs"');
}

function normalizeCommitmentStats(html) {
  return String(html || '')
    .replace(/<strong style="color:var\(--gold\)">0<\/strong>&nbsp;promesse d’attribution/g, '<strong style="color:var(--gold)">3</strong>&nbsp;engagements clés')
    .replace(/data-val="0" data-suffix="">0<\/div>\s*<div class="stat-lbl">Promesse d’attribution<\/div>/g, 'data-val="3" data-suffix="">3</div><div class="stat-lbl">Engagements clés</div>')
    .replace(/>0<\/div>\s*<div class="stat-lbl">Promesse d’attribution<\/div>/g, '>3</div><div class="stat-lbl">Engagements clés</div>')
    .replace(/0\s+Promesse d’attribution/g, '3 Engagements clés');
}

function insertSeoCrosslinks(html) {
  if (html.includes('seo-crosslinks')) return html;
  const block = `\n<div id="seo-crosslinks" style="max-width:1180px;margin:1.5rem auto 0;padding:1rem clamp(1.25rem,5vw,3rem);border-top:1px solid rgba(201,168,76,.25);display:flex;flex-wrap:wrap;gap:.85rem;justify-content:center;font-size:.82rem;line-height:1.5">\n  <a href="/accompagnement-appel-offres-martinique" style="color:#C9A84C;font-weight:700">Accompagnement appel d’offres Martinique</a>\n  <span style="color:rgba(255,255,255,.35)">·</span>\n  <a href="/conseil-acheteur-public-martinique" style="color:#C9A84C;font-weight:700">Conseil acheteur public Martinique</a>\n  <span style="color:rgba(255,255,255,.35)">·</span>\n  <a href="/insights" style="color:#C9A84C;font-weight:700">Insights commande publique</a>\n</div>\n`;
  const index = html.toLowerCase().lastIndexOf('</footer>');
  return index === -1 ? html + block : html.slice(0, index) + block + html.slice(index);
}

function insertHomepageSlimmingStyle(html) {
  if (String(html || '').includes('pi-home-slimming-style')) return html;
  const style = `<style id="pi-home-slimming-style">
body:has(#hero) #methode,
body:has(#hero) #methode + div,
body:has(#hero) #insights,
body:has(#hero) #diagnostic,
body:has(#hero) #cas-pratiques,
body:has(#hero) #outils,
body:has(#hero) #legal,
body:has(#hero) #faq { display:none !important; }
body:has(#hero) #about { padding-bottom: clamp(3.5rem,5vw,5rem) !important; }
body:has(#hero) #services { padding: clamp(3rem,5vw,4.5rem) 0 !important; }
body:has(#hero) #why { padding: clamp(3.5rem,5vw,5rem) 0 !important; }
body:has(#hero) #deontologie { padding: clamp(2.6rem,4vw,3.7rem) 0 !important; }
body:has(#hero) #contact { padding-top: clamp(4rem,6vw,5.5rem) !important; }
body:has(#hero) .about-hero-img { margin-bottom: clamp(2rem,3vw,3rem) !important; }
</style>`;
  return String(html || '').replace('</head>', style + '</head>');
}

function commercialCtaForFile(file) {
  const configs = {
    'entreprises-privees.html': {
      eyebrow: 'Entreprises candidates',
      title: 'Vous avez un DCE ou un mémoire à relire ?',
      text: 'Je vous aide à clarifier votre réponse, structurer vos preuves et aligner votre dossier sur les critères annoncés, sans promesse d’attribution.',
      primary: 'Présenter mon dossier',
      primaryHref: '/#contact',
      secondary: 'Comparer les accompagnements',
      secondaryHref: '/services'
    },
    'entites-publiques.html': {
      eyebrow: 'Entités publiques',
      title: 'Vous préparez une consultation ou une analyse ?',
      text: 'Je vous aide à consolider vos pièces, clarifier vos critères, sécuriser votre méthode et renforcer la traçabilité de vos procédures.',
      primary: 'Sécuriser ma procédure',
      primaryHref: '/#contact',
      secondary: 'Voir les formations',
      secondaryHref: '/formation-marches-publics-martinique'
    },
    'services.html': {
      eyebrow: 'Choisir le bon accompagnement',
      title: 'Une offre claire, un périmètre cadré, une intervention utile.',
      text: 'Le premier échange sert à qualifier votre besoin, vérifier les délais et retenir le niveau d’accompagnement adapté.',
      primary: 'Demander un diagnostic',
      primaryHref: '/#contact',
      secondary: 'Voir la formation',
      secondaryHref: '/formation-marches-publics-martinique'
    }
  };
  return configs[file] || null;
}

function insertCommercialLandingPolish(html, file) {
  const config = commercialCtaForFile(file);
  if (!config || String(html || '').includes('pi-commercial-final-cta')) return html;
  const style = `<style id="pi-commercial-polish">.pi-commercial-final-cta{background:#0F2342;color:#fff;padding:clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,3rem);border-top:1px solid rgba(201,168,76,.25);border-bottom:1px solid rgba(201,168,76,.25)}.pi-commercial-final-inner{max-width:980px;margin:0 auto;text-align:center}.pi-commercial-final-cta .eyebrow{display:inline-block;font-family:var(--mono,monospace);font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:#C9A84C;margin-bottom:1rem}.pi-commercial-final-cta h2{font-family:var(--serif,Georgia,serif);font-size:clamp(1.65rem,3vw,2.55rem);line-height:1.16;margin:0 0 1rem;color:#fff}.pi-commercial-final-cta p{max-width:720px;margin:0 auto 1.5rem;color:rgba(255,255,255,.75);line-height:1.75}.pi-commercial-actions{display:flex;flex-wrap:wrap;gap:.9rem;justify-content:center}.pi-commercial-actions a{display:inline-flex;align-items:center;justify-content:center;border-radius:4px;padding:.85rem 1.35rem;font-weight:800;text-decoration:none}.pi-commercial-actions a:first-child{background:#C9A84C;color:#0F2342}.pi-commercial-actions a:last-child{border:1px solid rgba(255,255,255,.35);color:#fff}.pi-commercial-actions a:last-child:hover{border-color:#C9A84C;color:#C9A84C}@media(max-width:640px){.pi-commercial-actions a{width:100%}}</style>`;
  const block = `<section class="pi-commercial-final-cta"><div class="pi-commercial-final-inner"><span class="eyebrow">${config.eyebrow}</span><h2>${config.title}</h2><p>${config.text}</p><div class="pi-commercial-actions"><a href="${config.primaryHref}">${config.primary}</a><a href="${config.secondaryHref}">${config.secondary}</a></div></div></section>`;
  let output = String(html || '').includes('pi-commercial-polish') ? html : String(html || '').replace('</head>', style + '</head>');
  const index = output.toLowerCase().lastIndexOf('</footer>');
  if (index === -1) return output + block;
  return output.slice(0, index) + block + output.slice(index);
}

function hardenMobileAndCompliance(html, file) {
  let output = replaceAllSafe(html);
  output = insertToolsInNav(output);
  output = normalizeFreeTools(output);
  output = normalizeContactForm(output);
  output = normalizeHomeInsights(output);
  output = normalizeInternalLinks(output);
  output = insertSeoCrosslinks(output);
  output = normalizeCommitmentStats(applyComplianceLayer(output));
  output = insertCommercialLandingPolish(output, file);
  return insertHomepageSlimmingStyle(output);
}

module.exports = async function handler(req, res) {
  const originalEnd = res.end.bind(res);
  const file = String(req.query?.file || '');
  res.end = function patchedEnd(chunk, encoding, callback) {
    try {
      const contentType = typeof res.getHeader === 'function' ? String(res.getHeader('Content-Type') || '') : '';
      const body = Buffer.isBuffer(chunk) ? chunk.toString(encoding || 'utf8') : String(chunk || '');
      if (res.statusCode === 200 && contentType.includes('text/html') && body.includes('<html')) {
        return originalEnd(hardenMobileAndCompliance(body, file), encoding, callback);
      }
      return originalEnd(chunk, encoding, callback);
    } catch (error) {
      return originalEnd(chunk, encoding, callback);
    }
  };
  return baseHandler(req, res);
};