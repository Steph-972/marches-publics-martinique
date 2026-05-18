function addLegalLinks(out) {
  if (out.indexOf('pi-legal-links') !== -1) return out;
  var links = '<div id="pi-legal-links"><span>Ressources :</span> <a href="/a-propos">A propos</a> <a href="/formation-marches-publics-martinique">Formation</a> <a href="/insights">Insights</a> <a href="/outils-gratuits">Outils gratuits</a> <span>Juridique :</span> <a href="/mentions-legales">Mentions legales</a> <a href="/conditions-generales-prestations-services">CGPS</a> <a href="/politique-confidentialite">Confidentialite</a> <a href="/politique-cookies">Cookies</a> <a href="/deontologie">Deontologie</a></div>';
  return out.replace('</body>', links + '</body>');
}

function addStyle(out) {
  if (out.indexOf('pi-compliance-style') !== -1) return out;
  var style = '<style id="pi-compliance-style">#cookie-banner{display:none!important}#pi-legal-links{max-width:1180px;margin:0 auto;padding:18px 24px;display:flex;flex-wrap:wrap;gap:12px;justify-content:center;font-size:13px;background:#07172D;color:rgba(255,255,255,.68)}#pi-legal-links a{color:#C9A84C;text-decoration:none;font-weight:700}#pi-legal-links span{color:#fff;font-weight:800}.pi-form-legal{font-size:12px;line-height:1.55;color:#6B7080;margin-top:12px}.pi-cookie-box{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;background:#0F2342;color:white;border:1px solid #C9A84C;border-radius:14px;padding:14px;display:flex;gap:10px;align-items:center;justify-content:space-between;box-shadow:0 20px 60px rgba(0,0,0,.25)}.pi-cookie-box p{margin:0;font-size:13px;line-height:1.45;color:rgba(255,255,255,.78)}.pi-cookie-box a{border:1px solid rgba(255,255,255,.35);color:white;border-radius:999px;padding:8px 12px;font-weight:700;text-decoration:none;font-size:12px}.pi-cookie-box a:last-child{background:#C9A84C;color:#0F2342;border-color:#C9A84C}@media(max-width:700px){.pi-cookie-box{position:static;margin:12px;flex-direction:column;align-items:flex-start}}</style>';
  return out.replace('</head>', style + '</head>');
}

function addHeaderLinks(out) {
  out = out.replace(/(<ul class="nav-links">)([\s\S]*?)(<\/ul>)/i, function(m, open, body, close) {
    if (body.indexOf('/formation-marches-publics-martinique') === -1) body = body.replace(/(<li><a href="\/services"[^>]*>Services<\/a><\/li>)/, '$1<li><a href="/formation-marches-publics-martinique">Formation</a></li>');
    if (body.indexOf('/a-propos') === -1) body = body.replace(/(<li><a href="\/outils-gratuits"[^>]*>Outils gratuits<\/a><\/li>)/, '$1<li><a href="/a-propos">A propos</a></li>');
    return open + body + close;
  });
  out = out.replace(/(<div class="mobile-menu"[\s\S]*?>)([\s\S]*?)(<\/div>)/i, function(m, open, body, close) {
    if (body.indexOf('/formation-marches-publics-martinique') === -1) body = body.replace(/(<a href="\/services" onclick="toggleMenu\(\)">Services<\/a>)/, '$1<a href="/formation-marches-publics-martinique" onclick="toggleMenu()">Formation</a>');
    if (body.indexOf('/a-propos') === -1) body = body.replace(/(<a href="\/outils-gratuits" onclick="toggleMenu\(\)">Outils gratuits<\/a>)/, '$1<a href="/a-propos" onclick="toggleMenu()">A propos</a>');
    return open + body + close;
  });
  return out;
}

function addFormNotice(out) {
  if (out.indexOf('pi-form-legal') !== -1) return out;
  var notice = '<p class="pi-form-legal">Les informations transmises sont traitees pour repondre a votre demande. Les prestations reposent sur une obligation de moyens. Consultez les <a href="/conditions-generales-prestations-services">CGPS</a>, la <a href="/politique-confidentialite">Confidentialite</a> et la <a href="/deontologie">Deontologie</a>.</p>';
  out = out.replace(/(<button[^>]*type=["']submit["'][\s\S]*?<\/button>)/i, '$1' + notice);
  out = out.replace(/(<button[^>]*class=["'][^"']*btn-submit-tool[^"']*["'][\s\S]*?<\/button>)/i, '$1' + notice);
  return out;
}

function addCookieBox(out) {
  if (out.indexOf('pi-cookie-box') !== -1) return out;
  var box = '<div class="pi-cookie-box"><p>Cookies necessaires au fonctionnement du site. Pour les autres cookies, vous pouvez accepter, refuser ou personnaliser vos choix.</p><div><a href="/politique-cookies#preferences">Tout refuser</a><a href="/politique-cookies#preferences">Personnaliser</a><a href="/politique-cookies#preferences">Tout accepter</a></div></div>';
  return out.replace('</body>', box + '</body>');
}

function applyComplianceLayer(html) {
  var out = String(html || '');
  out = addStyle(out);
  out = addHeaderLinks(out);
  out = addFormNotice(out);
  out = addLegalLinks(out);
  out = addCookieBox(out);
  return out;
}

module.exports = { applyComplianceLayer };
