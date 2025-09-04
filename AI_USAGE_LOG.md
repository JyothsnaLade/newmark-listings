# AI Usage Log

**Top 4 prompt snippets (paraphrased):**
1. *"Create a FastAPI app with in-memory store and endpoints: GET /listings, POST /listings, GET /listings/{id}, POST /listings/{id}/summary. Include CORS and pydantic validation."*
2. *"Scaffold a Vite + React + TypeScript app with routes: /, /add, /listings/:id; add a proxy for /listings to localhost:8000."*
3. *"Write minimal unit tests in Vitest for a filter function and in pytest for FastAPI endpoints (one happy path, one edge case)."*
4. *"Add an optional OpenAI integration that returns exactly 3 bullet points; provide a deterministic fallback when no API key is set."*

**Estimated time saved:** ~3–4 hours (scaffolding + boilerplate + tests + docs).

**Example AI suggestion not used & why:**
- Suggestion: Introduce a full ORM (SQLAlchemy) and Docker-compose with Postgres.
- Reason: Out of scope for the **"minimal, timeboxed"** assignment; an in-memory store meets requirements and keeps setup fast.

**Manual edits (post-AI):**
- Corrected backend test import path to `from main import app`.
- Ensured `/summary` enforces exactly **three** bullets.
