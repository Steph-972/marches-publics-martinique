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
    .replace(/Ce que je garantis, c'est la qualité et la rigueur de mon travail[^<]*<strong>maximiser vos chances<\/strong>[^<]*\./gi, 'Ce que je vise, c’est un accompagnement rigoureux : un dossier mieux sécurisé, un mémoire technique mieux adapté aux critères et une réponse plus cohérente.')
    .replace(/Ce que je garantis, c'est la qualité de mon travail[^.]*\. Nos clients remportent significativement plus de marchés après notre accompagnement[^.]*\./gi, 'Ce que je vise, c’est un dossier structuré, valorisé et mieux aligné avec les attentes de l’acheteur. L’accompagnement ne garantit jamais l’obtention du marché.')
    .replace(/maximiser vos chances/gi, 'renforcer la qualité de votre réponse')
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

function hardenMobileAndCompliance(html) {
  let output = html;
  output = insertToolsInDesktopNav(output);
  output = insertToolsInMobileMenu(output);
  output = neutralizeRiskyCommercialClaims(output);
  output = normalizeFreeToolsFunnel(output);
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
