# 📒 AI Usage Log

This document explains where and how AI tools were used while building the **Newmark Listings App**.

---

## 🔹 Top 3–5 Prompt Snippets / Screenshots

### 1. Backend Scaffolding (FastAPI Endpoints)  
Prompt:  
*“Generate FastAPI endpoints for GET/POST listings and summary route with in-memory store.”*  
- AI created a working FastAPI scaffold (`/listings`, `/listings/{id}`, `/listings/{id}/summary`).  
- I customized it to ensure summaries always return exactly **3 bullet points**.  
- **Time saved:** ~1.5 hours.  

📎 Screenshot:  
![Backend Scaffold](docs/ai_log/Screenshot-2025-09-04-11.15.11.png)

---

### 2. Frontend Homepage + Search (React + Vite)  
Prompt:  
*“Scaffold React component for homepage with search bar and list of properties using Vite + TypeScript.”*  
- AI generated a base React component with state + props.  
- I added debounce logic and styling.  
- **Time saved:** ~1 hour.  

📎 Screenshot:  
![Frontend Homepage](docs/ai_log/Screenshot-2025-09-04-11.15.24.png)

---

### 3. Add Listing Form + Validation  
Prompt:  
*“Generate React form with validation for title, price, location, description.”*  
- AI gave me the full form with validation logic.  
- I modified the `price` validation to enforce numeric input.  
- **Time saved:** ~30 minutes.  

📎 Screenshot:  
![Add Listing Form](docs/ai_log/Screenshot-2025-09-04-11.15.39.png)

---

### 4. API Integration & Testing  
Prompt:  
*“Write one pytest happy-path test for create+fetch listing, and one edge case for 404.”*  
- AI generated a skeleton test suite.  
- I adjusted the test to confirm summaries always contain exactly **3 bullets**.  
- **Time saved:** ~45 minutes.  

📎 Screenshot:  
![Testing](docs/ai_log/Screenshot-2025-09-04-11.16.10.png)  
![Edge Case Test](docs/ai_log/Screenshot-2025-09-04-11.16.18.png)

---

### 5. Documentation (README Setup)  
Prompt:  
*“Generate step-by-step setup instructions for backend (FastAPI) and frontend (React Vite).”*  
- AI produced installation and run instructions.  
- I kept most as-is, added my own clarifications about virtualenv and ports.  
- **Time saved:** ~45 minutes.  

📎 Screenshot:  
![Docs](docs/ai_log/Screenshot-2025-09-04-11.16.27.png)

---

## 🔹 Example of AI Suggestion I Did NOT Use
- AI suggested setting up **SQLite migrations** with Alembic.  
- I decided to **skip database setup** to stay within the 1–2 day timebox.  
- Instead, I used a lightweight **in-memory store**, which is sufficient for demo purposes.

---

## 🔹 Estimated Time Saved
- Backend scaffolding → ~1.5 hours  
- Frontend scaffolding → ~1 hour  
- Form validation → ~30 minutes  
- Testing → ~45 minutes  
- Docs → ~45 minutes  

**➡️ Total saved: ~3.5–4.0 hours**

---

✅ Screenshots have been placed in `/docs/ai_log/` for reference.  
✅ Log explains **where AI was used, how much time it saved, and what I chose not to use**.  
