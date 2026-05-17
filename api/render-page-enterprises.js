const baseHandler = require('./render-page-postprocess');

function fixEnterprisePackCtas(html) {
  return String(html || '')
    .replace(/onclick=\"if\(window\.setFormMode\)setFormMode\('diagnostic'\);return false;\"/g, 'onclick="if(window.setFormMode){setFormMode(\'diagnostic\');}"')
    .replace(/href=\"#contact\"/g, 'href="/#contact"')
    .replace(/href=\"\/\#contact\" onclick=\"if\(window\.setFormMode\)setFormMode\('diagnostic'\);return false;\"/g, 'href="/#contact" onclick="if(window.setFormMode){setFormMode(\'diagnostic\');}"');
}

module.exports = async function handler(req, res) {
  const originalEnd = res.end.bind(res);

  res.end = function patchedEnd(chunk, encoding, callback) {
    try {
      const contentType = typeof res.getHeader === 'function' ? String(res.getHeader('Content-Type') || '') : '';
      const body = Buffer.isBuffer(chunk) ? chunk.toString(encoding || 'utf8') : String(chunk || '');
      if (res.statusCode === 200 && contentType.includes('text/html') && body.includes('<html')) {
        return originalEnd(fixEnterprisePackCtas(body), encoding, callback);
      }
      return originalEnd(chunk, encoding, callback);
    } catch (error) {
      return originalEnd(chunk, encoding, callback);
    }
  };

  return baseHandler(req, res);
};
