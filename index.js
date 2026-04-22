const express = require('express');
const https = require('https');
const http = require('http');
const url = require('url');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Serve static files from public folder
app.use(express.static('public'));

// Main proxy endpoint - disguised as calculator
app.get('/calc', (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  // Verify it's a valid URL
  try {
    const parsedUrl = new url.URL(targetUrl);
  } catch (e) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  // Set headers to disguise as calculator/generic tool
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'ALLOW',
    'Access-Control-Allow-Origin': '*',
  });

  const protocol = targetUrl.startsWith('https') ? https : http;
  
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  };

  protocol.get(targetUrl, options, (proxyRes) => {
    // Forward response headers
    const headersToForward = {
      'content-type': proxyRes.headers['content-type'],
      'content-length': proxyRes.headers['content-length'],
      'cache-control': proxyRes.headers['cache-control'],
      'expires': proxyRes.headers['expires']
    };

    res.writeHead(proxyRes.statusCode, headersToForward);
    proxyRes.pipe(res);
  }).on('error', (e) => {
    res.status(500).json({ error: 'Proxy request failed', details: e.message });
  });
});

// Alternative endpoint names for obfuscation
app.get('/math', (req, res) => {
  res.redirect(`/calc?url=${req.query.url}`);
});

app.get('/tool', (req, res) => {
  res.redirect(`/calc?url=${req.query.url}`);
});

// API endpoint for searches
app.get('/api/search', (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: 'Missing search query' });
  }
  
  const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
  res.json({ url: `/calc?url=${encodeURIComponent(searchUrl)}` });
});

// Serve main calculator app
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Calculator Tool Online' });
});

app.listen(PORT, () => {
  console.log(`🧮 Calculator Tool running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to access`);
});
