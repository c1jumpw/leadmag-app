# Lead Magnet Generator

An internal tool for generating lead magnet ideas and full outlines based on the **Hormozi Value Equation** and **Brunson Value Ladder** frameworks.

Powered by Google Gemini API (free tier — 1,500 requests/day, no credit card).

## Live app

Once deployed, your app will be at:
`https://YOUR_GITHUB_USERNAME.github.io/leadmag-app/`

---

## Setup (first time)

### 1. Get a free Gemini API key

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with your Google account
3. Click **Get API Key** → **Create API key**
4. Copy the key (starts with `AIza...`)

No credit card required. Free tier: 1,500 requests/day.

### 2. Clone and run locally

```bash
git clone https://github.com/YOUR_USERNAME/leadmag-app.git
cd leadmag-app
npm install
npm run dev
```

Open `http://localhost:5173/leadmag-app/` — paste your Gemini key on first launch.

### 3. Deploy to GitHub Pages

```bash
npm run deploy
```

That's it. The app will be live at `https://YOUR_USERNAME.github.io/leadmag-app/`

---

## How the API key is stored

The Gemini API key is stored in your **browser's localStorage** — it never leaves your device or touches any server. Each person using the tool on their own machine enters their own key.

If you want a shared team version where the key is centralized, see the "Team deployment" section below.

---

## Team deployment (optional)

To share one API key across the team without each person entering it:

1. Create a `.env` file in the project root:
   ```
   VITE_GEMINI_KEY=AIzaSy...your_key_here
   ```
2. In `src/App.jsx`, change the initial state to:
   ```js
   const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_KEY || localStorage.getItem('gemini_api_key') || '')
   ```
3. In GitHub repository settings → **Secrets and variables → Actions**, add:
   - Name: `VITE_GEMINI_KEY`
   - Value: your Gemini API key
4. Add this GitHub Actions workflow at `.github/workflows/deploy.yml` — it will auto-deploy on every push to main.

---

## Updating the prompt

The lead magnet prompt lives entirely in `src/App.jsx` in the `buildPrompt()` function at the top of the file. Edit it freely to adjust the framework, add client-specific instructions, or change the output format.

---

## Tech stack

- React 18 + Vite
- Google Gemini 2.0 Flash API (free)
- GitHub Pages for hosting
- No backend, no database
