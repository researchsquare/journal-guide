// Add aditional trusted hosts as required to avoid XHR checks
const whitelist = [
  'localhost',
  '127.0.0.1',
  '::1'
];

function xhrRequired(req, res, next) {
  const hostname = req.hostname;
  const isWhitelisted = whitelist.includes(hostname);

  if (!isWhitelisted) {
    const isXHR = req.get('X-Requested-With') === 'XMLHttpRequest';

    if (!isXHR) {
      return res.status(403).json({ error: 'Forbidden: AJAX requests only' });
    }
  }

  next();
}

module.exports = xhrRequired;
