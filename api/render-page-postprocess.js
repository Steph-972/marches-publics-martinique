const baseHandler = require('./render-page');

const PUBLIC_BASE = 'https://marches-publics-martinique.vercel.app';
const NEUTRAL_CASE_RESULT = "Le dossier a gagné en clarté, en preuves et en cohérence. Résultat : une réponse nettement plus professionnelle, mieux structurée et mieux alignée sur les attentes de l’acheteur.";
const NEUTRAL_GUARANTEE = "Ce que je vise : un dossier plus clair, plus cohérent et mieux aligné avec les critères. La décision finale appartient exclusivement à l’acheteur.";

function replaceAllSafe(html) {
  return String(html || '')
    .replace(/https:\/\/procurement-insider-git-main-procurement-insiders-projects\.vercel\.app/g, PUBLIC_BASE)
    .replace(/https:\/\/procurement-insider-[a-z0-9-]+-procurement-insiders-projects\.vercel\.app/g, PUBLIC_BASE)
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
    .replace(/<a href=\"\/grille-mapa\" target=\"_blank\" style=\"display:inline-flex;align-items:center;gap:\.5rem;background:var\(--navy\);color:white;padding:\.65rem 1\.25rem;border-radius:4px;font-weight:600;font-size:\.85rem\">([\s\S]*?)(Voir la grille PDF|Consulter la grille)\s*<\/a>/g, '<a href="#lead-form-fields-1" style="display:inline-flex;align-items:center;gap:.5rem;background:var(--navy);color:white;padding:.65rem 1.25rem;border-radius:4px;font-weight:600;font-size:.85rem">$1S’inscrire pour recevoir la grille</a>')
    .replace(/<a href=\"\/grille-mapa\" target=\"_blank\"([^>]*)>\s*Consulter la grille\s*<\/a>/g, '<a href="#lead-form-fields-1"$1>S’inscrire pour recevoir la grille</a>')
    .replace(/Accès immédiat après inscription/g, 'Accès gratuit après inscription')
    .replace(/Accès libre immédiat/g, 'Accès après inscription gratuite')
    .replace(/Accès immédiat · Sans engagement · Déontologie respectée/g, 'Inscription gratuite · Sans compte utilisateur · Déontologie respectée')
    .replace(/Recevoir aussi la grille par email/g, 'Recevoir la grille gratuite')
    .replace(/Inscription optionnelle : recevez le lien PDF et les futures ressources utiles par email\./g, 'Inscription rapide : recevez la grille par email, puis accédez immédiatement au lien direct.')
    .replace(/Accès immédiat par email \+ lien vers la version PDF imprimable\./g, 'Inscription rapide : la grille est envoyée par email et le lien direct apparaît après validation du formulaire.')
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
    .replace(/grid\.innerHTML = published\.map\(a => `/g, 'grid.innerHTML = visibleArticles.map(a => `')
    .replace(/<p style=\"color:var\(--gray\);margin-bottom:1\.5rem;font-size:\.95rem\">Recevez les prochains insights directement par email<\/p>\s*<a href=\"#contact\"([\s\S]*?)>\s*<svg[\s\S]*?<\/svg>\s*S'inscrire à la veille\s*<\/a>/g, '<p style="color:var(--gray);margin-bottom:1.5rem;font-size:.95rem">Consultez toute la veille Procurement Insider : jurisprudence, seuils, MAPA, mémoire technique et stratégie d’offre.</p><a href="/insights" style="display:inline-flex;align-items:center;gap:.5rem;background:var(--navy);color:#fff;padding:.8rem 2rem;border-radius:var(--radius);font-weight:600;font-size:.9rem;transition:all var(--transition)">Voir plus d’articles →</a>');
}

function normalizeInternalLinks(html) {
  return html
    .replace(/href=\"\/entreprises-privees\" class=\"agency-card agency-path\"/g, 'href="/accompagnement-appel-offres-martinique" class="agency-card agency-path"')
    .replace(/href=\"\/entites-publiques\" class=\"agency-card agency-path\"/g, 'href="/conseil-acheteur-public-martinique" class="agency-card agency-path"')
    .replace(/href=\"\/entreprises-privees\" class=\"target-block\"/g, 'href="/accompagnement-appel-offres-martinique" class="target-block"')
    .replace(/href=\"\/entites-publiques\" class=\"target-block\"/g, 'href="/conseil-acheteur-public-martinique" class="target-block"')
    .replace(/href=\"\/entreprises-privees#tarifs\"/g, 'href="/accompagnement-appel-offres-martinique#packs"')
    .replace(/href=\"\/entites-publiques#tarifs\"/g, 'href="/conseil-acheteur-public-martinique#missions"')
    .replace(/<a href=\"\/entreprises-privees\">Accompagnement réponse AO<\/a>/g, '<a href="/accompagnement-appel-offres-martinique">Accompagnement réponse AO</a>')
    .replace(/<a href=\"\/entites-publiques\">Rédaction DCE \/ CCTP<\/a>/g, '<a href="/conseil-acheteur-public-martinique">Rédaction DCE / CCTP</a>')
    .replace(/<a href=\"\/entites-publiques\">Formation marchés publics<\/a>/g, '<a href="/conseil-acheteur-public-martinique">Formation marchés publics</a>')
    .replace(/href=\"#insights\">Insights<\/a>/g, 'href="/insights">Insights</a>')
    .replace(/href=\"#insights\" onclick=\"toggleMenu\(\)\">Insights<\/a>/g, 'href="/insights" onclick="toggleMenu()">Insights</a>');
}

function insertSeoCrosslinks(html) {
  if (html.includes('seo-crosslinks')) return html;
  const block = `\n<div id="seo-crosslinks" style="max-width:1180px;margin:1.5rem auto 0;padding:1rem clamp(1.25rem,5vw,3rem);border-top:1px solid rgba(201,168,76,.25);display:flex;flex-wrap:wrap;gap:.85rem;justify-content:center;font-size:.82rem;line-height:1.5">\n  <a href="/accompagnement-appel-offres-martinique" style="color:#C9A84C;font-weight:700">Accompagnement appel d’offres Martinique</a>\n  <span style="color:rgba(255,255,255,.35)">·</span>\n  <a href="/conseil-acheteur-public-martinique" style="color:#C9A84C;font-weight:700">Conseil acheteur public Martinique</a>\n  <span style="color:rgba(255,255,255,.35)">·</span>\n  <a href="/insights" style="color:#C9A84C;font-weight:700">Insights commande publique</a>\n</div>\n`;
  const index = html.toLowerCase().lastIndexOf('</footer>');
  return index === -1 ? html + block : html.slice(0, index) + block + html.slice(index);
}

function hardenMobileAndCompliance(html) {
  let output = replaceAllSafe(html);
  output = insertToolsInNav(output);
  output = normalizeFreeTools(output);
  output = normalizeContactForm(output);
  output = normalizeHomeInsights(output);
  output = normalizeInternalLinks(output);
  output = insertSeoCrosslinks(output);
  return output;
}

module.exports = async function handler(req, res) {
  const originalEnd = res.end.bind(res);

  res.end = function patchedEnd(chunk, encoding, callback) {
    try {
      const contentType = typeof res.getHeader === 'function' ? String(res.getHeader('Content-Type') || '') : '';
      const body = Buffer.isBuffer(chunk) ? chunk.toString(encoding || 'utf8') : String(chunk || '');
      if (res.statusCode === 200 && contentType.includes('text/html') && body.includes('<html')) {
        return originalEnd(hardenMobileAndCompliance(body), encoding, callback);
      }
      return originalEnd(chunk, encoding, callback);
    } catch (error) {
      return originalEnd(chunk, encoding, callback);
    }
  };

  return baseHandler(req, res);
};
