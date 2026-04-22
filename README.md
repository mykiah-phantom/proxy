# 🧮 Calculator Tool

A powerful proxy tool disguised as a calculator. Search and access any website (itch.io, xbox.com, etc.) through a clean, modern interface.

## Features

✨ **Core Features:**
- Search anything across the web
- Proxy access to websites like itch.io, xbox.com, and more
- Multi-tab support for browsing multiple sites simultaneously
- Sleek, modern UI
- Disguised as a calculator app for discretion
- Works on Replit & any Node.js environment

## Installation & Setup

### Local Development

1. **Clone or navigate to the project:**
   ```bash
   cd proxy
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Replit Deployment

1. **Import to Replit:**
   - Go to [Replit.com](https://replit.com)
   - Click "Create" → "Import from GitHub"
   - Paste your repository URL
   - Click "Import"

2. **Run:**
   - Click the "Run" button
   - Replit will automatically install dependencies and start the server

3. **Access:**
   - Your app will be available at the Replit URL (e.g., `https://calculator-tool.username.repl.co`)

## Usage

### Searching
1. Type any search query in the search bar
2. Press **Enter**
3. Results will load via Bing search

### Visiting Websites
1. Paste a full URL (e.g., `https://itch.io`)
2. Press **Enter**
3. The website will be proxied and displayed

### Multi-Tab Browsing
- Click on any tab to switch between open sites
- Click the **×** button on a tab to close it
- Click **Home** to return to the home screen

## How It Works

The proxy consists of:
- **Backend (`index.js`)**: Node.js/Express server that handles proxy requests
- **Frontend (`public/index.html`)**: Modern web interface
- **Proxy Endpoint (`/calc`)**: Main proxy handler disguised as a calculator

When you request a URL:
1. Frontend sends the URL to `/calc?url=...`
2. Backend fetches that URL server-side
3. Response is returned to your browser
4. Interface displays the proxied content

## Deployment Options

- **Replit** (recommended for simplicity)
- **Heroku**
- **Railway**
- **Render**
- **Any Node.js hosting**

## Advanced Features

### API Endpoints

- `GET /calc?url=<URL>` - Proxy a URL
- `GET /math?url=<URL>` - Alias for /calc
- `GET /tool?url=<URL>` - Alias for /calc
- `GET /api/search?q=<query>` - Search API
- `GET /health` - Health check

## Security Notes

This tool:
- Passes through requests without modification (aside from User-Agent)
- Does not store any data or cookies
- Does not track user activity
- Works entirely through your browser
- Complies with standard proxy practices

## Customization

### Change Port
Edit `index.js`:
```javascript
const PORT = process.env.PORT || 3000; // Change 3000 to your desired port
```

### Change Endpoints
Edit the endpoint names in `index.js`:
```javascript
app.get('/calc', (req, res) => { ... }); // Change '/calc' to any name
```

### Customize Frontend
Edit `public/index.html` to change colors, text, or styling.

## Troubleshooting

**Issue**: Port already in use
- **Solution**: Change PORT in index.js or set `PORT=8000 npm start`

**Issue**: CORS errors
- **Solution**: CORS is already enabled, check browser console for specific errors

**Issue**: Website won't load
- **Solution**: Some sites block proxy access; this is expected and not a bug

## License

ISC

## Support

For issues or feature requests, check the repository or create an issue.

---

**Enjoy browsing! 🧮**
