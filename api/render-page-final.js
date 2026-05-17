const baseHandler = require('./render-page-postprocess');

const PUBLIC_BASE = 'https://marches-publics-martinique.vercel.app';

function normalizeFinalSeo(html) {
  let output = String(html || '');

  // Domaine public canonique : élimine les anciennes URLs techniques Vercel encore présentes dans certains fichiers sources.
  output = output
    .replace(/https:\/\/procurement-insider-git-main-procurement-insiders-projects\.vercel\.app/g, PUBLIC_BASE)
    .replace(/https:\/\/procurement-insider-[a-z0-9-]+-procurement-insiders-projects\.vercel\.app/g, PUBLIC_BASE);

  // Maillage d’accueil : les deux grands parcours doivent pousser les pages SEO transactionnelles.
  output = output
    .replace(/href="\/entreprises-privees" class="agency-card agency-path"/g, 'href="/accompagnement-appel-offres-martinique" class="agency-card agency-path"')
    .replace(/href="\/entites-publiques" class="agency-card agency-path"/g, 'href="/conseil-acheteur-public-martinique" class="agency-card agency-path"')
    .replace(/href="\/entreprises-privees" class="target-block"/g, 'href="/accompagnement-appel-offres-martinique" class="target-block"')
    .replace(/href="\/entites-publiques" class="target-block"/g, 'href="/conseil-acheteur-public-martinique" class="target-block"');

  // Liens services / footer : les libellés commerciaux pointent vers les landing pages SEO.
  output = output
    .replace(/href="\/entreprises-privees#tarifs"/g, 'href="/accompagnement-appel-offres-martinique#packs"')
    .replace(/href="\/entites-publiques#tarifs"/g, 'href="/conseil-acheteur-public-martinique#missions"')
    .replace(/<a href="\/entreprises-privees">Accompagnement réponse AO<\/a>/g, '<a href="/accompagnement-appel-offres-martinique">Accompagnement réponse AO</a>')
    .replace(/<a href="\/entites-publiques">Rédaction DCE \/ CCTP<\/a>/g, '<a href="/conseil-acheteur-public-martinique">Rédaction DCE / CCTP</a>')
    .replace(/<a href="\/entites-publiques">Formation marchés publics<\/a>/g, '<a href="/conseil-acheteur-public-martinique">Formation marchés publics</a>');

  // Navigation Insights sur l’accueil : éviter un ancrage local quand la page Insights existe.
  output = output
    .replace(/href="#insights">Insights<\/a>/g, 'href="/insights">Insights</a>')
    .replace(/href="#insights" onclick="toggleMenu\(\)">Insights<\/a>/g, 'href="/insights" onclick="toggleMenu()">Insights</a>');

  // Mentions légales : harmonise le statut transitoire et l’adresse sur les anciennes sections inline.
  output = output
    .replace(/<strong>Statut :<\/strong> Micro-entrepreneur/g, '<strong>Statut :</strong> Micro-entrepreneur en cours de finalisation administrative')
    .replace(/<strong>SIRET :<\/strong> En cours d'immatriculation/g, '<strong>SIRET :</strong> En cours d’immatriculation')
    .replace(/<strong>Adresse :<\/strong> Martinique \(972\), Martinique \(972\)/g, '<strong>Adresse :</strong> Quartier Lowinsky, 97211 Rivière-Pilote, Martinique');

  // Message de formulaire : cohérence avec l’email automatique et les corrections juridiques.
  output = output
    .replace(/Données sécurisées · RGPD/g, 'Données traitées confidentiellement · RGPD')
    .replace(/Je vous réponds personnellement sous 48h ouvrées/g, 'Je reviens vers vous personnellement, en général sous 48h ouvrées')
    .replace(/Je vous répondrai dans les 48h ouvrées/g, 'Je reviendrai vers vous en général sous 48h ouvrées');

  return output;
}

module.exports = async function handler(req, res) {
  const originalEnd = res.end.bind(res);

  res.end = function patchedEnd(chunk, encoding, callback) {
    try {
      const contentType = typeof res.getHeader === 'function' ? String(res.getHeader('Content-Type') || '') : '';
      const body = Buffer.isBuffer(chunk) ? chunk.toString(encoding || 'utf8') : String(chunk || '');
      if (res.statusCode === 200 && contentType.includes('text/html') && body.includes('<html')) {
        return originalEnd(normalizeFinalSeo(body), encoding, callback);
      }
      return originalEnd(chunk, encoding, callback);
    } catch (error) {
      return originalEnd(chunk, encoding, callback);
    }
  };

  return baseHandler(req, res);
};
