export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const BREVO_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_KEY) return res.status(500).json({ error: 'API key not configured' });

  const { prenom, email, profil } = req.body;
  if (!prenom || !email) {
    return res.status(400).json({ error: 'Prénom et email obligatoires' });
  }

  const BASE_URL = 'https://marches-publics-martinique.vercel.app';
  const GRILLE_URL = `${BASE_URL}/grille-mapa`;

  const headers = {
    'api-key': BREVO_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  try {
    // 1. Ajouter le contact dans Brevo (liste 2 = contacts généraux)
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST', headers,
      body: JSON.stringify({
        email,
        attributes: {
          PRENOM: prenom,
          PROFIL_LEAD: profil || 'non renseigné',
          SOURCE: 'lead-magnet-grille-mapa'
        },
        listIds: [2],
        updateEnabled: true
      })
    });

    // 2. Email au prospect avec lien vers la grille
    const emailProspect = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST', headers,
      body: JSON.stringify({
        sender: {
          name: 'Stéphane Loudoux — Procurement Insider',
          email: 'loeildelacheteur@gmail.com'
        },
        to: [{ email, name: prenom }],
        subject: 'Votre grille de vérification — 12 points qui font perdre une offre en MAPA',
        htmlContent: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Arial,sans-serif;background:#f4f4f4;margin:0;padding:0">
<div style="max-width:600px;margin:2rem auto;background:white;border-radius:4px;overflow:hidden">

  <div style="background:#0F2342;padding:1.5rem 2rem">
    <div style="color:#C9A84C;font-weight:900;font-size:1.1rem;letter-spacing:1px">PROCUREMENT INSIDER</div>
    <div style="color:rgba(255,255,255,0.6);font-size:.7rem;letter-spacing:3px;margin-top:3px">L'ŒIL DE L'ACHETEUR</div>
  </div>

  <div style="padding:2rem">
    <p style="color:#1C1C2E;font-size:1rem;margin-bottom:1rem">Bonjour ${prenom},</p>

    <p style="color:#333;line-height:1.7;margin-bottom:1.25rem">
      Comme promis, voici votre accès à la grille de vérification : <strong>les 12 points qui font perdre une offre en MAPA</strong>.
    </p>

    <p style="color:#333;line-height:1.7;margin-bottom:1.5rem">
      Cette grille est directement issue de ma pratique de terrain — des erreurs que j'ai vues des centaines de fois côté acheteur, et qui éliminent des dossiers techniquement compétents pour des raisons évitables.
    </p>

    <div style="text-align:center;margin:1.75rem 0">
      <a href="${GRILLE_URL}" style="display:inline-block;background:#C9A84C;color:#0F2342;padding:.9rem 2rem;border-radius:4px;font-weight:700;font-size:.95rem;text-decoration:none">
        Accéder à la grille de vérification →
      </a>
      <p style="color:#6B7080;font-size:.78rem;margin-top:.75rem">
        La page s'ouvre dans votre navigateur. Cliquez sur <em>"Enregistrer en PDF"</em> pour sauvegarder localement.
      </p>
    </div>

    <div style="background:#F8F5EF;border-left:3px solid #C9A84C;padding:1rem 1.25rem;margin-bottom:1.5rem">
      <p style="color:#0F2342;font-size:.9rem;line-height:1.7;margin:0">
        <strong>Ce que vous trouverez dans la grille :</strong> 12 points répartis en 4 catégories — recevabilité administrative, cohérence de l'offre, qualité du mémoire technique, et points de vigilance spécifiques à la Martinique. Chaque point précise le niveau de risque (éliminatoire, notation, malus).
      </p>
    </div>

    <p style="color:#333;line-height:1.7;margin-bottom:1.25rem">
      Si vous avez un dossier en cours ou un marché à préparer, n'hésitez pas à me contacter directement. Le <strong>diagnostic gratuit de 30 minutes</strong> permet d'identifier rapidement les points d'attention spécifiques à votre situation.
    </p>

    <div style="margin-top:1.5rem">
      <a href="${BASE_URL}/#contact" style="display:inline-block;background:#0F2342;color:white;padding:.7rem 1.5rem;border-radius:4px;font-weight:600;font-size:.875rem;text-decoration:none">
        Demander un diagnostic gratuit
      </a>
    </div>
  </div>

  <div style="background:#0F2342;padding:1.25rem 2rem">
    <p style="color:rgba(255,255,255,0.7);font-size:.8rem;margin:0;line-height:1.7">
      <strong style="color:#C9A84C">Stéphane Loudoux</strong><br>
      Procurement Insider — L'Œil de l'Acheteur<br>
      Conseil en marchés publics et stratégie achat<br>
      Martinique · +596 696 266 231
    </p>
    <p style="color:rgba(255,255,255,0.3);font-size:.7rem;margin-top:.75rem">
      Vous recevez cet email car vous avez demandé la grille de vérification sur le site Procurement Insider.
      Pour ne plus recevoir d'emails de notre part, répondez à ce message avec "désinscription".
    </p>
  </div>

</div>
</body>
</html>`
      })
    });

    // 3. Notification interne à Stéphane
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST', headers,
      body: JSON.stringify({
        sender: { name: 'Procurement Insider — Lead Magnet', email: 'loeildelacheteur@gmail.com' },
        to: [{ email: 'loeildelacheteur@gmail.com', name: 'Stéphane Loudoux' }],
        subject: `📥 Nouveau lead — Grille MAPA (${prenom} · ${profil || 'profil non renseigné'})`,
        htmlContent: `<div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto">
          <div style="background:#0F2342;padding:1rem 1.5rem">
            <div style="color:#C9A84C;font-weight:900">PROCUREMENT INSIDER · Lead Magnet</div>
          </div>
          <div style="background:white;padding:1.5rem">
            <h3 style="color:#0F2342;margin-bottom:1rem">Nouveau prospect — Grille MAPA</h3>
            <table style="width:100%;border-collapse:collapse">
              <tr style="border-bottom:1px solid #E8EBF0">
                <td style="padding:.5rem 0;color:#6B7080;font-size:.85rem;width:100px">Prénom</td>
                <td style="padding:.5rem 0;font-weight:600;color:#0F2342">${prenom}</td>
              </tr>
              <tr style="border-bottom:1px solid #E8EBF0">
                <td style="padding:.5rem 0;color:#6B7080;font-size:.85rem">Email</td>
                <td style="padding:.5rem 0"><a href="mailto:${email}" style="color:#1A3A6B">${email}</a></td>
              </tr>
              <tr>
                <td style="padding:.5rem 0;color:#6B7080;font-size:.85rem">Profil</td>
                <td style="padding:.5rem 0;color:#C9A84C;font-weight:600">${profil || 'Non renseigné'}</td>
              </tr>
            </table>
            <div style="margin-top:1.25rem">
              <a href="mailto:${email}" style="background:#0F2342;color:white;padding:.6rem 1.25rem;border-radius:4px;text-decoration:none;font-weight:600;font-size:.85rem">
                Répondre à ${prenom}
              </a>
            </div>
          </div>
        </div>`
      })
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Lead magnet Brevo error:', err);
    return res.status(500).json({ error: 'Erreur envoi email' });
  }
}
