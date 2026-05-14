export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const BREVO_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_KEY) return res.status(500).json({ error: 'API key not configured' });

  const { prenom, nom, email, organisation, profil, sujet, message } = req.body;
  if (!prenom || !nom || !email || !sujet || !message) {
    return res.status(400).json({ error: 'Champs obligatoires manquants' });
  }

  const headers = {
    'api-key': BREVO_KEY,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  try {
    // 1. Ajouter le contact dans Brevo
    await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST', headers,
      body: JSON.stringify({
        email,
        attributes: { PRENOM: prenom, NOM: nom, COMPANY: organisation || '' },
        listIds: [2],
        updateEnabled: true
      })
    });

    // 2. Email de notification à Stéphane
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST', headers,
      body: JSON.stringify({
        sender: { name: 'Procurement Insider — Site Web', email: 'loeildelacheteur@gmail.com' },
        to: [{ email: 'loeildelacheteur@gmail.com', name: 'Stéphane Loudoux' }],
        replyTo: { email, name: `${prenom} ${nom}` },
        subject: `📬 Nouveau message — ${sujet} (${prenom} ${nom})`,
        htmlContent: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#0F2342;padding:1.5rem 2rem">
            <div style="color:#C9A84C;font-size:1.2rem;font-weight:900;letter-spacing:1px">PROCUREMENT INSIDER</div>
            <div style="color:rgba(255,255,255,0.7);font-size:0.75rem;letter-spacing:3px;margin-top:2px">NOUVEAU MESSAGE SITE WEB</div>
          </div>
          <div style="background:white;padding:2rem">
            <h2 style="color:#0F2342;margin-bottom:1.5rem">Nouveau message reçu</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr style="border-bottom:1px solid #E8EBF0"><td style="padding:.6rem 0;color:#6B7080;font-size:.85rem;width:140px">De</td><td style="padding:.6rem 0;font-weight:600;color:#0F2342">${prenom} ${nom}</td></tr>
              <tr style="border-bottom:1px solid #E8EBF0"><td style="padding:.6rem 0;color:#6B7080;font-size:.85rem">Email</td><td style="padding:.6rem 0"><a href="mailto:${email}" style="color:#1A3A6B">${email}</a></td></tr>
              ${organisation ? `<tr style="border-bottom:1px solid #E8EBF0"><td style="padding:.6rem 0;color:#6B7080;font-size:.85rem">Organisation</td><td style="padding:.6rem 0">${organisation}</td></tr>` : ''}
              <tr style="border-bottom:1px solid #E8EBF0"><td style="padding:.6rem 0;color:#6B7080;font-size:.85rem">Profil</td><td style="padding:.6rem 0">${profil || '-'}</td></tr>
              <tr style="border-bottom:1px solid #E8EBF0"><td style="padding:.6rem 0;color:#6B7080;font-size:.85rem">Objet</td><td style="padding:.6rem 0;font-weight:600;color:#C9A84C">${sujet}</td></tr>
            </table>
            <div style="margin-top:1.5rem;background:#F8F5EF;border-left:3px solid #C9A84C;padding:1rem 1.25rem">
              <p style="color:#0F2342;line-height:1.7;margin:0">${message.replace(/\n/g,'<br>')}</p>
            </div>
            <div style="margin-top:1.5rem">
              <a href="mailto:${email}?subject=RE: ${sujet}" style="background:#0F2342;color:white;padding:.75rem 1.5rem;border-radius:4px;text-decoration:none;font-weight:600;display:inline-block">Répondre à ${prenom}</a>
            </div>
          </div>
          <div style="background:#0F2342;padding:1rem 2rem;text-align:center">
            <p style="color:rgba(255,255,255,0.5);font-size:.75rem;margin:0">Procurement Insider · loeildelacheteur@gmail.com · +596 696 266 231</p>
          </div>
        </div>`
      })
    });

    // 3. Email de confirmation au prospect
    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST', headers,
      body: JSON.stringify({
        sender: { name: 'Stéphane Loudoux — Procurement Insider', email: 'loeildelacheteur@gmail.com' },
        to: [{ email, name: `${prenom} ${nom}` }],
        subject: 'Votre message a bien été reçu — Procurement Insider',
        htmlContent: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#0F2342;padding:1.5rem 2rem">
            <div style="color:#C9A84C;font-size:1.2rem;font-weight:900">PROCUREMENT INSIDER</div>
            <div style="color:rgba(255,255,255,0.7);font-size:0.75rem;letter-spacing:3px;margin-top:2px">L'ŒIL DE L'ACHETEUR</div>
          </div>
          <div style="background:white;padding:2rem">
            <h2 style="color:#0F2342;margin-bottom:1rem">Bonjour ${prenom},</h2>
            <p style="color:#333;line-height:1.7;margin-bottom:1.25rem">Merci pour votre message. Je l'ai bien reçu et vous répondrai personnellement <strong>sous 48h ouvrées</strong>.</p>
            <div style="background:#F8F5EF;border-left:3px solid #C9A84C;padding:1rem 1.25rem;margin-bottom:1.5rem">
              <p style="color:#0F2342;font-style:italic;margin:0">« Je reviens vers vous rapidement avec une première analyse de votre situation. »</p>
              <p style="color:#6B7080;font-size:.8rem;margin-top:.5rem">— Stéphane Loudoux</p>
            </div>
            <p style="color:#6B7080;font-size:.875rem">Cordialement,<br><strong style="color:#0F2342">Stéphane Loudoux</strong><br>Procurement Insider — L'Œil de l'Acheteur<br>+596 696 266 231</p>
          </div>
          <div style="background:#0F2342;padding:1rem 2rem;text-align:center">
            <p style="color:rgba(255,255,255,0.5);font-size:.75rem;margin:0">Procurement Insider · Martinique · loeildelacheteur@gmail.com</p>
          </div>
        </div>`
      })
    });

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Brevo error:', err);
    return res.status(500).json({ error: 'Erreur envoi email' });
  }
}
