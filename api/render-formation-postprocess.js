const baseHandler = require('./render-page-source');

function injectFormationConversion(html) {
  const input = String(html || '');
  const alreadyFinal = input.includes('pi-formation-final');

  const style = `<style id="pi-formation-polish">.pi-formation-hero .hero-inner{max-width:1040px!important}.pi-formation-hero .eyebrow{display:inline-flex!important;align-items:center;gap:.7rem;color:#C9A84C!important}.pi-formation-hero h1{max-width:860px!important;font-size:clamp(2.2rem,5vw,4.15rem)!important;line-height:1.06!important}.pi-formation-hero h1 em{color:#C9A84C!important;font-style:italic!important}.pi-formation-hero p{max-width:780px!important;margin:1.2rem 0 0;color:rgba(255,255,255,.76);font-size:clamp(1rem,1.35vw,1.16rem);line-height:1.8}.pi-formation-hero-actions{display:flex;flex-wrap:wrap;gap:.9rem;margin-top:1.7rem}.pi-formation-hero-actions a{display:inline-flex;align-items:center;justify-content:center;border-radius:4px;padding:.88rem 1.35rem;font-weight:800;text-decoration:none}.pi-formation-hero-actions a:first-child{background:#C9A84C;color:#0F2342}.pi-formation-hero-actions a:last-child{border:1px solid rgba(255,255,255,.35);color:#fff}.pi-formation-hero-actions a:last-child:hover{border-color:#C9A84C;color:#C9A84C}.pi-formation-final{background:#0F2342;color:#fff;padding:clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,3rem);margin-top:clamp(2.5rem,5vw,4rem);border-radius:18px;border:1px solid rgba(201,168,76,.28)}.pi-formation-final-inner{text-align:center;max-width:820px;margin:auto}.pi-formation-final span{display:inline-block;font-family:var(--mono,monospace);font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;color:#C9A84C;margin-bottom:1rem}.pi-formation-final h2{font-family:var(--serif,Georgia,serif);font-size:clamp(1.55rem,3vw,2.35rem);line-height:1.18;margin:0 0 1rem;color:#fff}.pi-formation-final p{color:rgba(255,255,255,.76);margin:0 auto 1.4rem;max-width:680px;line-height:1.75}.pi-formation-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:.9rem}.pi-formation-actions a{display:inline-flex;align-items:center;justify-content:center;border-radius:4px;padding:.85rem 1.25rem;font-weight:800;text-decoration:none}.pi-formation-actions a:first-child{background:#C9A84C;color:#0F2342}.pi-formation-actions a:last-child{border:1px solid rgba(255,255,255,.35);color:#fff}@media(max-width:640px){.pi-formation-hero-actions a,.pi-formation-actions a{width:100%}}</style>`;

  const hero = `<section class="hero pi-formation-hero"><div class="hero-inner"><div class="eyebrow">Formation marchés publics — entreprises & entités publiques</div><h1>Former ceux qui répondent.<br><em>Renforcer ceux qui achètent.</em></h1><p>Des formations opérationnelles pour aider les entreprises à mieux lire un DCE, structurer une offre et défendre leurs preuves ; et pour accompagner les entités publiques dans des procédures plus claires, plus traçables et mieux maîtrisées.</p><div class="pi-formation-hero-actions"><a href="/#contact">Former mon équipe</a><a href="/services">Voir les accompagnements</a></div></div></section>`;

  const block = `<section class="pi-formation-final"><div class="pi-formation-final-inner"><span>Formation commande publique</span><h2>Vous souhaitez former une équipe ou structurer une montée en compétence ?</h2><p>Le premier échange permet d’identifier le public, le niveau de départ, les objectifs opérationnels et les cas pratiques utiles à intégrer au programme.</p><div class="pi-formation-actions"><a href="/#contact">Présenter mon besoin formation</a><a href="/services">Voir les accompagnements</a></div></div></section>`;

  let output = input.includes('pi-formation-polish') ? input : input.replace('</head>', style + '</head>');
  output = output.replace(/<section class="hero"><div class="hero-inner">[\s\S]*?<\/div><\/section>/i, hero);
  if (!alreadyFinal) {
    output = output.replace(/(<p><a href="#" onclick="window\.scrollTo\([\s\S]*?Retour en haut ↑<\/a><\/p>)/i, block + '$1');
  }
  return output;
}

module.exports = async function handler(req, res) {
  const originalEnd = res.end.bind(res);
  res.end = function patchedEnd(chunk, encoding, callback) {
    try {
      const contentType = typeof res.getHeader === 'function' ? String(res.getHeader('Content-Type') || '') : '';
      const body = Buffer.isBuffer(chunk) ? chunk.toString(encoding || 'utf8') : String(chunk || '');
      if (res.statusCode === 200 && contentType.includes('text/html') && body.includes('<html')) {
        return originalEnd(injectFormationConversion(body), encoding, callback);
      }
      return originalEnd(chunk, encoding, callback);
    } catch (error) {
      return originalEnd(chunk, encoding, callback);
    }
  };
  return baseHandler(req, res);
};
