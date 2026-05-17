const baseHandler = require('./render-page');

const NEUTRAL_CASE_RESULT = "Le dossier a gagné en clarté, en preuves et en cohérence. Résultat : une réponse nettement plus professionnelle, mieux structurée et mieux alignée sur les attentes de l’acheteur.";
const NEUTRAL_GUARANTEE = "Ce que je vise : un dossier plus clair, plus cohérent et mieux aligné avec les critères. La décision finale appartient exclusivement à l’acheteur.";

function insertToolsInDesktopNav(html) {
  return html.replace(/(<ul class=\"nav-links\">)([\s\S]*?)(<\/ul>)/g, (match, open, body, close) => {
    const normalizedBody = body.toLowerCase();
    if (normalizedBody.includes('/outils-gratuits')) return match;
    const item = '        <li><a href="/outils-gratuits">Outils gratuits</a></li>\n';
    if (/\s*<li><a[^>]*class=\"nav-cta\"[\s\S]*?<\/li>/.test(body)) {
      body = body.replace(/(\s*<li><a[^>]*class=\"nav-cta\"[\s\S]*?<\/li>)/, '\n' + item + '$1');
    } else if (/\s*<li><a href=\"(?:#|\/#)?contact\"[\s\S]*?<\/li>/.test(body)) {
      body = body.replace(/(\s*<li><a href=\"(?:#|\/#)?contact\"[\s\S]*?<\/li>)/, '\n' + item + '$1');
    } else {
      body += '\n' + item;
    }
    return open + body + close;
  });
}

function insertToolsInMobileMenu(html) {
  return html.replace(/(<div class=\"mobile-menu\"[^>]*>)([\s\S]*?)(<\/div>)/g, (match, open, body, close) => {
    const normalizedBody = body.toLowerCase();
    if (normalizedBody.includes('/outils-gratuits')) return match;
    const link = '  <a href="/outils-gratuits" onclick="toggleMenu()">Outils gratuits</a>\n';
    if (/\s*<a href=\"(?:#|\/#)?contact\"[^>]*>Contact<\/a>/.test(body)) {
      body = body.replace(/(\s*<a href=\"(?:#|\/#)?contact\"[^>]*>Contact<\/a>)/, '\n' + link + '$1');
    } else if (/\s*<a href=\"(?:#|\/#)?contact\"[^>]*class=\"mobile-cta\"[\s\S]*?<\/a>/.test(body)) {
      body = body.replace(/(\s*<a href=\"(?:#|\/#)?contact\"[^>]*class=\"mobile-cta\"[\s\S]*?<\/a>)/, '\n' + link + '$1');
    } else {
      body += '\n' + link;
    }
    return open + body + close;
  });
}

function neutralizeRiskyCommercialClaims(html) {
  return html
    .replace(/Deux mois plus tard, nous décrochions un marché de 280(?:&nbsp;|\s|\u00a0)*000(?:&nbsp;|\s|\u00a0)*€ avec une collectivité avec laquelle nous n'avions jamais travaillé\./g, NEUTRAL_CASE_RESULT)
    .replace(/Deux mois plus tard, nous decrochions un marche de 280(?:&nbsp;|\s|\u00a0)*000(?:&nbsp;|\s|\u00a0)*€ avec une collectivite avec laquelle nous n'avions jamais travaille\./gi, NEUTRAL_CASE_RESULT)
    .replace(/Prêt à déposer un dossier qui gagne \?/g, 'Prêt à déposer un dossier plus solide ?')
    .replace(/Prêt à déposer un dossier qui gagne\?/g, 'Prêt à déposer un dossier plus solide ?')
    .replace(/Ce que je garantis\s*:\s*un dossier irréprochable, une offre valorisée, une stratégie adaptée\. Le reste appartient à l['’]acheteur\./gi, NEUTRAL_GUARANTEE)
    .replace(/Ce que je garantis\s*:\s*un dossier irreprochable, une offre valorisee, une strategie adaptee\. Le reste appartient a l['’]acheteur\./gi, NEUTRAL_GUARANTEE)
    .replace(/Ce que je garantis\s*:\s*un dossier irréprochable, une offre valorisée, une stratégie adaptée\./gi, 'Ce que je vise : un dossier plus clair, plus cohérent et mieux aligné avec les critères.')
    .replace(/Ce que je garantis\s*:\s*un dossier irreprochable, une offre valorisee, une strategie adaptee\./gi, 'Ce que je vise : un dossier plus clair, plus cohérent et mieux aligné avec les critères.')
    .replace(/Ce que je garantis, c'est la qualité et la rigueur de mon travail[^<]*<strong>renforcer la qualité de votre réponse<\/strong>[^<]*\./gi, 'Ce que je vise, c’est un accompagnement rigoureux : un dossier mieux sécurisé, un mémoire technique mieux adapté aux critères et une réponse plus cohérente.')
    .replace(/Ce que je garantis, c'est la qualité et la rigueur de mon travail[^<]*<strong>maximiser vos chances<\/strong>[^<]*\./gi, 'Ce que je vise, c’est un accompagnement rigoureux : un dossier mieux sécurisé, un mémoire technique mieux adapté aux critères et une réponse plus cohérente.')
    .replace(/Ce que je garantis, c'est la qualité de mon travail[^.]*\. Nos clients remportent significativement plus de marchés après notre accompagnement[^.]*\./gi, 'Ce que je vise, c’est un dossier structuré, valorisé et mieux aligné avec les attentes de l’acheteur. L’accompagnement ne garantit jamais l’obtention du marché.')
    .replace(/Ce que je garantis, c'est un dossier structuré, valorisé, conforme aux attentes de l'acheteur\. Mes clients remportent significativement plus de marchés qu'avant notre travail ensemble\. Mais aucun résultat ne peut être contractuellement garanti\./gi, 'Ce que je vise, c’est un dossier structuré, valorisé et mieux aligné avec les attentes de l’acheteur. L’accompagnement ne garantit jamais l’obtention du marché.')
    .replace(/Les acheteurs publics analysent des dizaines d'offres\. Un dossier qui va à l'essentiel, structuré selon leurs critères précis, est systématiquement mieux noté — même à compétence égale\./gi, 'Les acheteurs publics analysent de nombreuses offres. Un dossier clair, structuré selon les critères, peut être plus facile à lire, à comparer et à évaluer.')
    .replace(/Connaître les deux côtés de la table est un avantage décisif/gi, 'Connaître les deux côtés de la table est un avantage méthodologique')
    .replace(/Les MAPA sous seuils sont accessibles — et très rentables\./gi, 'Les MAPA sous seuils peuvent être accessibles et pertinents selon votre stratégie commerciale.')
    .replace(/Amélioration de la notation potentielle/gi, 'Amélioration de la lisibilité de l’offre')
    .replace(/Mes clients remportent significativement plus de marchés qu'avant notre travail ensemble\./gi, 'L’accompagnement améliore la structure, la lisibilité et la cohérence du dossier.')
    .replace(/Nos clients remportent significativement plus de marchés après notre accompagnement[^.]*\./gi, 'L’accompagnement améliore la structure, la lisibilité et la cohérence du dossier, sans garantir l’obtention du marché.')
    .replace(/maximiser vos chances/gi, 'renforcer la qualité de votre réponse')
    .replace(/augmenter vos chances/gi, 'renforcer votre dossier')
    .replace(/améliorer leurs réponses et augmenter leurs chances aux appels d'offres/gi, 'améliorer leurs réponses aux appels d’offres')
    .replace(/Seuils applicables au 1er janvier 2026/gi, 'Seuils de procédure à vérifier avant chaque consultation')
    .replace(/Mis à jour en mai 2025 · Seuils 2026-2027 en vigueur\./gi, 'Information indicative : les seuils doivent être vérifiés dans les sources officielles au moment du lancement de la consultation.');
}

function normalizeFreeToolsFunnel(html) {
  return html
    .replace(/https:\/\/procurement-insider-git-main-procurement-insiders-projects\.vercel\.app/g, 'https://marches-publics-martinique.vercel.app')
    .replace(/<a href=\"\/grille-mapa\" target=\"_blank\" style=\"display:inline-flex;align-items:center;gap:\.5rem;background:var\(--navy\);color:white;padding:\.65rem 1\.25rem;border-radius:4px;font-weight:600;font-size:\.85rem\">([\s\S]*?)(Voir la grille PDF|Consulter la grille)\s*<\/a>/g, '<a href="#lead-form-fields-1" style="display:inline-flex;align-items:center;gap:.5rem;background:var(--navy);color:white;padding:.65rem 1.25rem;border-radius:4px;font-weight:600;font-size:.85rem">$1S’inscrire pour recevoir la grille</a>')
    .replace(/<a href=\"\/grille-mapa\" target=\"_blank\"([^>]*)>\s*Consulter la grille\s*<\/a>/g, '<a href="#lead-form-fields-1"$1>S’inscrire pour recevoir la grille</a>')
    .replace(/Accès immédiat après inscription/g, 'Accès gratuit après inscription')
    .replace(/Accès libre immédiat/g, 'Accès après inscription gratuite')
    .replace(/Accès immédiat · Sans engagement · Déontologie respectée/g, 'Inscription gratuite · Sans compte utilisateur · Déontologie respectée')
    .replace(/Accès immédiat · Sans compte utilisateur · Déontologie respectée/g, 'Inscription gratuite · Sans compte utilisateur · Déontologie respectée')
    .replace(/Recevoir aussi la grille par email/g, 'Recevoir la grille gratuite')
    .replace(/Inscription optionnelle : recevez le lien PDF et les futures ressources utiles par email\./g, 'Inscription rapide : recevez la grille par email, puis accédez immédiatement au lien direct.')
    .replace(/Accès immédiat par email \+ lien vers la version PDF imprimable\./g, 'Inscription rapide : la grille est envoyée par email et le lien direct apparaît après validation du formulaire.')
    .replace(/Gratuits, sans engagement\./g, 'Gratuits, sans compte utilisateur et sans engagement.');
}

function normalizeLegalMentions(html) {
  return html
    .replace(/<span class=\"placeholder\">Entrepreneur individuel \/ statut juridique à compléter<\/span>/g, 'Micro-entrepreneur en cours de finalisation administrative')
    .replace(/<span class=\"placeholder\">SIRET : en cours d'immatriculation — information mise à jour dès finalisation de l'immatriculation<\/span>/g, 'SIRET en cours d’immatriculation')
    .replace(/<span class=\"placeholder\">À compléter — Martinique \(97200\)<\/span>/g, 'Quartier Lowinsky, 97211 Rivière-Pilote, Martinique')
    .replace(/<span class=\"placeholder\">Coordonnées du médiateur : à compléter si activité BtoC soumise à obligation de médiation<\/span>/g, 'Les coordonnées du médiateur compétent seront précisées avant toute prestation conclue avec un consommateur lorsque cette obligation sera applicable.')
    .replace(/Dernière mise à jour : mai 2025/g, 'Dernière mise à jour : mai 2026')
    .replace(/© 2025 Stéphane Loudoux/g, '© 2026 Stéphane Loudoux');
}

function normalizeContactForm(html) {
  return html
    .replace(/Réponse garantie sous 48h ouvrées/g, 'Réponse généralement sous 48h ouvrées')
    .replace(/Réponse garantie sous 48h ouvrées · Données sécurisées · RGPD/g, 'Réponse généralement sous 48h ouvrées · Données traitées confidentiellement · RGPD')
    .replace(/email:\s*document\.getElementById\('email'\)\.value\.trim\(\),\n\s*organisation:/g, "email:        document.getElementById('email').value.trim(),\n        telephone:    document.getElementById('telephone') ? document.getElementById('telephone').value.trim() : '',\n        organisation:")
    .replace(/Écrivez-moi/g, 'Expliquez-moi votre besoin')
    .replace(/Je réponds personnellement à chaque message sous 48h ouvrées\./g, 'Je reviens vers vous personnellement, en général sous 48h ouvrées.');
}

function normalizeHomeInsights(html) {
  return html
    .replace(/const published = articles\.filter\(a => a\.published\);/g, 'const published = articles.filter(a => a.published);\n    const visibleArticles = published.slice(0, 6);')
    .replace(/grid\.innerHTML = published\.map\(a => `/g, 'grid.innerHTML = visibleArticles.map(a => `')
    .replace(/<p style=\"color:var\(--gray\);margin-bottom:1\.5rem;font-size:\.95rem\">Recevez les prochains insights directement par email<\/p>\s*<a href=\"#contact\"([\s\S]*?)>\s*<svg[\s\S]*?<\/svg>\s*S'inscrire à la veille\s*<\/a>/g, '<p style="color:var(--gray);margin-bottom:1.5rem;font-size:.95rem">Consultez toute la veille Procurement Insider : jurisprudence, seuils, MAPA, mémoire technique et stratégie d’offre.</p><a href="/insights" style="display:inline-flex;align-items:center;gap:.5rem;background:var(--navy);color:#fff;padding:.8rem 2rem;border-radius:var(--radius);font-weight:600;font-size:.9rem;transition:all var(--transition)">Voir plus d’articles →</a>');
}

function hardenMobileAndCompliance(html) {
  let output = html;
  output = insertToolsInDesktopNav(output);
  output = insertToolsInMobileMenu(output);
  output = neutralizeRiskyCommercialClaims(output);
  output = normalizeFreeToolsFunnel(output);
  output = normalizeLegalMentions(output);
  output = normalizeContactForm(output);
  output = normalizeHomeInsights(output);
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
