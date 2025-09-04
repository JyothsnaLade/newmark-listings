# Newmark Minimal Property Listings

A minimal full-stack app that lets users **view listings**, **add listings**, **search by keyword**, and generate a **3-bullet AI summary** for a listing.

- **Frontend:** React + Vite + TypeScript
- **Backend:** FastAPI (Python)
- **Data:** In-memory store (with small seed). You can swap to SQLite/JSON later if needed.

---
## Quick Start

### 0) Prereqs
- Python 3.10+
- Node.js 18+

### 1) Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
- API runs at http://localhost:8000
- Smoke test: `curl http://localhost:8000/listings`
- (Optional) To use **real AI summaries**, set your OpenAI key before starting:
  - macOS/Linux: `export OPENAI_API_KEY=sk-...`
  - Windows PowerShell: `$Env:OPENAI_API_KEY="sk-..."`
  - Without a key, the API returns a **deterministic 3-bullet fallback**.

#### Endpoints
- `GET /health` → `{ ok: true }`
- `GET /listings?q=keyword` → list all (with optional keyword search on title/location/description/price)
- `POST /listings` → create listing `{ title, price, location, description }`
- `GET /listings/{id}` → fetch one
- `POST /listings/{id}/summary` → returns `{"bullets": [ "...", "...", "..." ]}` (AI or fallback)

### 2) Frontend
```bash
cd frontend
npm i
npm run dev
```
- App at http://localhost:5173
- Vite dev server **proxies** `/listings` to `http://localhost:8000` (see `vite.config.ts`).

### 3) Run Tests
- **Backend**: `cd backend && pytest -q`
- **Frontend (unit)**: `cd frontend && npm test`

---
## Design Choices & Tradeoffs
- **FastAPI + in-memory store** for speed-of-implementation. In production, swap to SQLite/Postgres with a small DAO layer.
- **Simple routing & proxy**: keep FE→BE calls on the same origin path (`/listings`) to avoid CORS issues in dev and keep code obvious.
- **AI integration as an optional enhancement**: endpoint works offline; enables real AI when the key is provided.
- **Tests cover one happy-path and one edge case** per the requirement (see below).
- **Minimal UI**: clean, accessible, and easy to scan; only the required features.

---
## Where & How AI Tools Were Used
- Used AI to scaffold: FastAPI endpoints, Vite + React + TS pages, proxy config, and test skeletons.
- AI assisted with: Pydantic validation hints, simple debounce pattern for search, and a JSDOM Vitest setup.
- Manually reviewed and tweaked:
  - Fixed pathing in backend tests (`from main import app`).
  - Ensured the `/summary` endpoint **always** returns exactly 3 bullets.
  - Added deterministic fallback summary when `OPENAI_API_KEY` is absent.

See **AI_USAGE_LOG.md** for prompt snippets, time-saved estimate, and an example suggestion we did not use.

---
## Tests (as required)
- **Backend happy-path**: create → fetch (`tests/test_app.py::test_happy_path_add_and_get_listing`)
- **Backend edge-case**: 404 on unknown id and **summary returns exactly 3 bullets** (`tests/test_app.py::test_edge_case_not_found_and_summary_length`)
- **Frontend happy-path**: empty-search returns all (unit) (`src/__tests__/filter.test.ts`)
- **Frontend edge-case**: numeric query matches by price (`src/__tests__/filter.test.ts`)

---
## Recording a Short Demo (for GitHub)
1. Start backend and frontend as above.
2. Use any screen recorder (QuickTime on macOS, Xbox Game Bar on Windows: `Win+Alt+R`) to capture:
   - Load homepage → search
   - Add a listing
   - Open detail → click **Generate AI Summary**
3. Save the video in the repo (e.g., `demo/demo.mp4`) or attach it to the PR/README.

---
## Repo Layout
newmark-listings/
├─ backend/
│  ├─ main.py
│  ├─ requirements.txt
│  └─ tests/
│     └─ test_app.py
└─ frontend/
   ├─ index.html
   ├─ vite.config.ts
   ├─ package.json
   ├─ src/
   │  ├─ App.tsx, main.tsx, types.ts, api.ts
   │  ├─ components/ListingCard.tsx
   │  ├─ pages/{HomePage,AddListingPage,DetailPage}.tsx
   │  ├─ utils/filter.ts
   │  └─ __tests__/filter.test.ts
   └─ vitest.setup.ts

