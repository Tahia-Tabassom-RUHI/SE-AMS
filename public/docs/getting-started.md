# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (bundled with Node.js)
- A modern browser (Chrome, Firefox, Edge, or Safari)

---

## Clone and install

```bash
git clone https://github.com/Tahia-Tabassom-RUHI/SE-AMS.git
cd SE-AMS
npm install
```

---

## Start the development server

```bash
npm run dev
```

Vite will start the application at [http://localhost:5173](http://localhost:5173).

---

## Production build

```bash
npm run build
```

Output goes to `dist/`. The Docsify documentation is copied automatically to `dist/docs/`.

---

## Deploy to GitHub Pages

```bash
npm run deploy
```

This runs the build and then publishes `dist/` to the `gh-pages` branch using the `gh-pages` package. The application will be live at:

```
https://tahia-tabassom-ruhi.github.io/SE-AMS/
```

---

## Demo credentials

> These are demo-only credentials. There is no real authentication server or password management.

| Role | Email | Password |
|---|---|---|
| Coordinator | `coordinator@utm.my` | `utm123` |
| Lecturer | `lecturer@utm.my` | `utm123` |

The password `utm123` applies to both accounts. Entering any other password shows an "Invalid credentials" error. Both accounts are hardcoded in `src/app/contexts/AuthContext.tsx`.

---

## Common startup issues

| Symptom | Resolution |
|---|---|
| `npm: command not found` | Install Node.js from https://nodejs.org |
| Port 5173 already in use | Run `npm run dev -- --port 5174` or stop the other process |
| Blank page after `npm run dev` | Check the browser console for errors; clear `localStorage` and reload |
| Build fails with module errors | Delete `node_modules/` and run `npm install` again |
| Changes do not appear | Data is held in React state; reloading the page resets all demo data |

---

## After login

After a successful login, the system redirects to the Dashboard. The sidebar shows different items depending on the logged-in role:

- **Coordinator** — full administration suite (11 items)
- **Lecturer** — personal tools only (4 items)

See the [Coordinator Guide](coordinator-guide.md) and [Lecturer Guide](lecturer-guide.md) for full workflow descriptions.
