# 🧮 Calculator Tool

A powerful proxy tool disguised as a calculator. Search and access any website (itch.io, xbox.com, etc.) through a clean, modern interface.

## Features

✨ **Core Features:**
- Search anything across the web
- Proxy access to websites like itch.io, xbox.com, and more
- Multi-tab support for browsing multiple sites simultaneously
- Sleek, modern UI
- Disguised as a calculator app for discretion
- Works on Replit, GitHub Codespaces & any Node.js environment

## Quick Start Options

### 1️⃣ GitHub Codespaces (Recommended - Free)

Click the button below to launch instantly in your browser:

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/mykiah-phantom/proxy)

Or manually:
1. Go to your repository
2. Click **Code** → **Codespaces** → **Create codespace on main**
3. Wait for the environment to load (auto-installs dependencies)
4. Terminal will show: `🧮 Calculator Tool running on port 3000`
5. Click the "Ports" tab and open port 3000

### 2️⃣ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mykiah-phantom/proxy.git
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

### 3️⃣ Replit Deployment

1. Go to [Replit.com](https://replit.com)
2. Click "Create" → "Import from GitHub"
3. Paste: `https://github.com/mykiah-phantom/proxy`
4. Click "Import" and then "Run"

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

| Platform | Setup Time | Cost |
|----------|-----------|------|
| **GitHub Codespaces** | 1 click | Free (120 hours/month) |
| **Replit** | 2 minutes | Free tier available |
| **Heroku** | 5 minutes | Paid (discontinued free tier) |
| **Railway** | 5 minutes | Paid (pay-as-you-go) |
| **Render** | 5 minutes | Free tier available |

## API Endpoints

- `GET /calc?url=<URL>` - Proxy a URL
- `GET /math?url=<URL>` - Alias for /calc
- `GET /tool?url=<URL>` - Alias for /calc
- `GET /api/search?q=<query>` - Search API
- `GET /health` - Health check

## Environment Variables

```bash
PORT=3000              # Server port (default: 3000)
NODE_ENV=production    # Environment mode
```

## Project Structure

```
proxy/
├── .devcontainer/          # GitHub Codespaces config
├── public/
│   └── index.html         # Frontend interface
├── index.js               # Backend server
├── package.json           # Dependencies
├── .replit                # Replit config
├── .gitignore
└── README.md
```

## Troubleshooting

**Issue**: Port already in use
- **Solution**: `PORT=8000 npm start`

**Issue**: Codespaces stuck loading
- **Solution**: Refresh the page or restart the codespace

**Issue**: Website won't load
- **Solution**: Some sites block proxy access; this is expected

**Issue**: CORS errors
- **Solution**: CORS is enabled; check browser console for specific errors

## Customization

### Change Port
Edit `index.js`:
```javascript
const PORT = process.env.PORT || 3000; // Change 3000 to your desired port
```

### Change Endpoints
Modify `/calc` endpoint name in `index.js`

### Customize Frontend
Edit `public/index.html` to change colors, text, or styling

## Security Notes

This tool:
- Passes requests through without modification
- Does not store any data or cookies
- Does not track user activity
- Works entirely through your browser
- Complies with standard proxy practices

## License

ISC

## Support

For issues or questions, create an issue in the repository.

---

**Get started now! 🧮** - Click "Open in GitHub Codespaces" above

