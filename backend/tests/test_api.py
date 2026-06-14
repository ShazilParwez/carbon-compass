from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200

def test_calculate_carbon():
    payload = {
        "transport_mode": "Car (Gasoline)",
        "weekly_commute_miles": 100,
        "diet_type": "Meat in most meals",
        "electricity_source": "Standard Grid",
        "shopping_frequency": "Frequently (Monthly)"
    }
    response = client.post("/api/carbon/calculate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "total_score" in data
    assert "breakdown" in data

def test_calculate_validation_error():
    payload = {
        "transport_mode": "Car (Gasoline)",
        "weekly_commute_miles": -100,  # Negative
        "diet_type": "Meat in most meals",
        "electricity_source": "Standard Grid",
        "shopping_frequency": "Frequently (Monthly)"
    }
    response = client.post("/api/carbon/calculate", json=payload)
    assert response.status_code == 422  # Unprocessable Entity

def test_simulate_impact():
    payload = {
        "profile": {"baseline_monthly_kg": 1000},
        "proposed_change": "Cycle to work"
    }
    response = client.post("/api/simulator/project", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["monthly_savings_kg"] == 15.0
    
def test_decision_analyze():
    payload = {"question": "Car or Train?"}
    response = client.post("/api/decision/analyze", json=payload)
    assert response.status_code == 200
    assert "options" in response.json()

def test_coach_chat():
    payload = {"message": "How do I save energy?"}
    response = client.post("/api/coach/chat", json=payload)
    assert response.status_code == 200
    assert "reply" in response.json()

def test_explain_footprint():
    # Pass mock score
    payload = {
        "total_score": 50,
        "monthly_emissions_kg": 1000,
        "annual_emissions_kg": 12000,
        "breakdown": {
            "transport": 200,
            "food": 300,
            "energy": 400,
            "shopping": 100
        }
    }
    response = client.post("/api/carbon/explain", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "explanation" in data

def test_top_actions():
    payload = {
        "total_score": 50,
        "monthly_emissions_kg": 1000,
        "annual_emissions_kg": 12000,
        "breakdown": {
            "transport": 200,
            "food": 300,
            "energy": 400,
            "shopping": 100
        }
    }
    response = client.post("/api/carbon/top-actions", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "actions" in data
