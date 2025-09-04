import os
from typing import List, Optional, Dict
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ---------- Models ----------
class ListingBase(BaseModel):
    title: str = Field(..., min_length=1)
    price: float = Field(..., ge=0)
    location: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)

class ListingCreate(ListingBase):
    pass

class Listing(ListingBase):
    id: int

# ---------- App ----------
app = FastAPI(title="Newmark Listings API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- In-memory store ----------
listings: Dict[int, Listing] = {}
next_id = 1

def _seed():
    global next_id
    demo = [
        {"title":"Sunny 2BR near park","price":2450,"location":"Jersey City, NJ",
         "description":"Light-filled 2-bedroom apartment, hardwood floors, updated kitchen, 5 min to PATH."},
        {"title":"Loft in SoMa","price":3599,"location":"San Francisco, CA",
         "description":"Open-plan loft with exposed brick, parking available, pet friendly."},
    ]
    for d in demo:
        listings[next_id] = Listing(id=next_id, **d)
        next_id += 1

_seed()

# ---------- Helpers ----------
def naive_bullets(title: str, price: float, location: str, description: str):
    # Fallback 'AI' summary if OPENAI_API_KEY not configured
    bits = [b.strip() for b in description.strip().split(".") if b.strip()]
    key = (bits[0] + ".") if bits else (description[:120] + ("..." if len(description) > 120 else ""))
    return [
        f"{title} in {location}",
        f"Asking price ${price:,.0f}",
        key
    ]

def ai_summarize(text: str, title: str, price: float, location: str):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return naive_bullets(title, price, location, text)
    try:
        from openai import OpenAI
        client = OpenAI(api_key=api_key)
        prompt = f"""Summarize this property into exactly 3 crisp bullet points for a listing card.
        Title: {title}
        Location: {location}
        Price: ${price:,.0f}
        Description: {text}
        Bullets only, no numbering.
        """
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role":"user","content":prompt}],
            temperature=0.2,
        )
        content = resp.choices[0].message.content.strip()
        # Normalize to 3 bullets
        lines = [line.strip().lstrip("-• ").strip() for line in content.splitlines() if line.strip()]
        if len(lines) < 3:
            lines += naive_bullets(title, price, location, text)
        return lines[:3]
    except Exception:
        return naive_bullets(title, price, location, text)

# ---------- Endpoints ----------
@app.get("/health")
def health():
    return {"ok": True}

@app.get("/listings", response_model=List[Listing])
def get_listings(q: Optional[str] = None):
    items = list(listings.values())
    if q:
        ql = q.lower()
        items = [l for l in items if ql in l.title.lower() or ql in l.location.lower() or ql in l.description.lower() or ql in str(l.price)]
    return items

@app.post("/listings", response_model=Listing, status_code=201)
def add_listing(payload: ListingCreate):
    global next_id
    listing = Listing(id=next_id, **payload.dict())
    listings[next_id] = listing
    next_id += 1
    return listing

@app.get("/listings/{listing_id}", response_model=Listing)
def get_listing(listing_id: int):
    if listing_id not in listings:
        raise HTTPException(status_code=404, detail="Listing not found")
    return listings[listing_id]

@app.post("/listings/{listing_id}/summary")
def get_summary(listing_id: int):
    if listing_id not in listings:
        raise HTTPException(status_code=404, detail="Listing not found")
    l = listings[listing_id]
    bullets = ai_summarize(l.description, l.title, l.price, l.location)
    return {"bullets": bullets[:3] if bullets else naive_bullets(l.title, l.price, l.location, l.description)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
