const express = require('express');
const https = require('https');
const router = express.Router();

/**
 * GET /api/tts?text=...
 * Proxies native Kannada TTS audio from Google Translate with clean headers,
 * bypassing browser Referer blocking and CORS restrictions.
 */
router.get('/', (req, res) => {
  const text = req.query.text || req.query.q || '';
  if (!text) {
    return res.status(400).send('Text is required');
  }

  const encoded = encodeURIComponent(String(text).slice(0, 200));
  const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=kn&client=tw-ob&q=${encoded}`;

  https.get(
    googleUrl,
    {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    },
    (gRes) => {
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Access-Control-Allow-Origin', '*');
      gRes.pipe(res);
    }
  ).on('error', (err) => {
    console.error('TTS Proxy Error:', err.message);
    res.status(500).send('TTS Proxy Error');
  });
});

module.exports = router;
