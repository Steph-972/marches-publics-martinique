const baseHandler = require('./render-page');

const NEUTRAL_CASE_RESULT = "Le dossier a gagné en clarté, en preuves et en cohérence. Résultat : une réponse nettement plus professionnelle, mieux structurée et mieux alignée sur les attentes de l’acheteur.";

function insertToolsInDesktopNav(html) {
  return html.replace(/(<ul class=\"nav-links\">)([\s\S]*?)(<\/ul>)/g, (match, open, body, close) => {
    if (body.includes('/outils-gratuits')) return match;
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
    if (body.includes('/outils-gratuits')) return match;
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
    .replace(/Ce que je garantis : un dossier irréprochable, une offre valorisée, une stratégie adaptée\. Le reste appartient à l'acheteur\./g, "Ce que je vise : un dossier plus clair, plus cohérent et mieux aligné avec les critères. La décision finale appartient exclusivement à l’acheteur.")
    .replace(/Ce que je garantis : un dossier irreprochable, une offre valorisee, une strategie adaptee\. Le reste appartient a l'acheteur\./gi, "Ce que je vise : un dossier plus clair, plus cohérent et mieux aligné avec les critères. La décision finale appartient exclusivement à l’acheteur.");
}

function hardenMobileAndCompliance(html) {
  let output = html;
  output = insertToolsInDesktopNav(output);
  output = insertToolsInMobileMenu(output);
  output = neutralizeRiskyCommercialClaims(output);
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
