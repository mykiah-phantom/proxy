const express = require('express');
const cors = require('cors');
const http = require('http');
const https = require('https');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static('public'));

// Main proxy endpoint - disguised as calculator
app.all('/calc', async (req, res) => {
  try {
    let targetUrl = req.query.url || req.body?.url;

    if (!targetUrl) {
      return res.status(400).send('Missing URL parameter');
    }

    // Verify it's a valid URL
    try {
      new URL(targetUrl);
    } catch (e) {
      return res.status(400).send('Invalid URL format');
    }

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000,
      redirect: 'follow'
    };

    // Use appropriate protocol
    const protocol = targetUrl.startsWith('https') ? https : http;

    protocol.get(targetUrl, options, (proxyRes) => {
      // Forward status code
      res.statusCode = proxyRes.statusCode || 200;

      // Forward important headers
      const headers = {
        'Content-Type': proxyRes.headers['content-type'] || 'text/html',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      };

      // Allow framing
      res.removeHeader('X-Frame-Options');

      Object.keys(headers).forEach(key => {
        res.setHeader(key, headers[key]);
      });

      // Pipe response
      proxyRes.pipe(res);

    }).on('error', (err) => {
      console.error('Proxy error:', err);
      res.status(502).send(`<h2>Error fetching URL</h2><p>${err.message}</p>`);
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send(`<h2>Server Error</h2><p>${error.message}</p>`);
  }
});

// POST support for iframe form submissions
app.post('/calc', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('Missing URL');
  }
  
  // Forward to GET handler
  req.query.url = targetUrl;
  req.method = 'GET';
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  };

  const protocol = targetUrl.startsWith('https') ? https : http;
  protocol.get(targetUrl, options, (proxyRes) => {
    res.status(proxyRes.statusCode || 200);
    res.setHeader('Content-Type', proxyRes.headers['content-type'] || 'text/html');
    proxyRes.pipe(res);
  }).on('error', (err) => {
    res.status(502).send(`Error: ${err.message}`);
  });
});

// Alternative endpoint names for obfuscation
app.get('/math', (req, res) => {
  res.redirect(302, `/calc?url=${req.query.url}`);
});

app.get('/tool', (req, res) => {
  res.redirect(302, `/calc?url=${req.query.url}`);
});

// Search API
app.get('/api/search', (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }
  
  const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
  res.json({ url: `/calc?url=${encodeURIComponent(searchUrl)}` });
});

// Root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'online' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`🧮 Calculator Tool running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}`);
});
