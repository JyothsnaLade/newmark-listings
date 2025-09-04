from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["ok"] == True

def test_happy_path_add_and_get_listing():
    payload = {
        "title": "Test Home",
        "price": 1234.56,
        "location": "Testville",
        "description": "Charming test home with 2 beds and 1 bath."
    }
    r = client.post("/listings", json=payload)
    assert r.status_code == 201
    data = r.json()
    assert data["title"] == payload["title"]
    lid = data["id"]

    r2 = client.get(f"/listings/{lid}")
    assert r2.status_code == 200
    assert r2.json()["id"] == lid

def test_edge_case_not_found_and_summary_length():
    r = client.get("/listings/999999")
    assert r.status_code == 404

    # Ensure summary returns exactly 3 bullets for an existing seeded listing (id 1)
    r2 = client.post("/listings/1/summary")
    assert r2.status_code == 200
    bullets = r2.json()["bullets"]
    assert isinstance(bullets, list)
    assert len(bullets) == 3
