const express = require('express');
const https = require('https');
const http = require('http');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Proxy endpoint
app.get('/calc', (req, res) => {
  try {
    const targetUrl = req.query.url;

    if (!targetUrl) {
      return res.status(400).send('Missing URL parameter');
    }

    // Validate URL
    let parsedUrl;
    try {
      parsedUrl = new URL(targetUrl);
    } catch (e) {
      return res.status(400).send('Invalid URL format');
    }

    const protocol = parsedUrl.protocol === 'https:' ? https : http;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
      },
      timeout: 15000
    };

    protocol.get(parsedUrl, options, (proxyRes) => {
      // Set response headers
      res.status(proxyRes.statusCode || 200);
      
      // Copy headers from target response
      const contentType = proxyRes.headers['content-type'] || 'text/html; charset=utf-8';
      res.setHeader('Content-Type', contentType);
      
      if (proxyRes.headers['content-length']) {
        res.setHeader('Content-Length', proxyRes.headers['content-length']);
      }

      // Always allow framing
      res.removeHeader('X-Frame-Options');
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Pipe the response
      proxyRes.pipe(res);

    }).on('error', (err) => {
      console.error('[PROXY ERROR]', err.message);
      res.status(502).send(`
        <html>
          <head>
            <style>
              body { font-family: Arial; text-align: center; padding: 50px; background: #f5f5f5; }
              .error-box { background: white; padding: 40px; border-radius: 8px; }
              h2 { color: #d32f2f; }
              p { color: #666; }
            </style>
          </head>
          <body>
            <div class="error-box">
              <h2>⚠️ Error Loading Page</h2>
              <p>${err.message}</p>
              <p>This might mean the site is blocking proxy requests or is temporarily unavailable.</p>
            </div>
          </body>
        </html>
      `);
    });

  } catch (error) {
    console.error('[SERVER ERROR]', error);
    res.status(500).send(`<h2>Server Error</h2><p>${error.message}</p>`);
  }
});

// Aliases for proxy
app.get('/math', (req, res) => {
  res.redirect(`/calc?url=${encodeURIComponent(req.query.url)}`);
});

app.get('/tool', (req, res) => {
  res.redirect(`/calc?url=${encodeURIComponent(req.query.url)}`);
});

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`🧮 Calculator Tool running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
