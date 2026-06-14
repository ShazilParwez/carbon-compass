import pytest
from fastapi.testclient import TestClient
from app.main import app
from unittest.mock import patch
import sys
import importlib

client = TestClient(app)

def test_calculate_exception():
    with patch('app.services.carbon_calculator.CarbonCalculator.calculate', side_effect=Exception("Mocked error")):
        response = client.post("/api/carbon/calculate", json={
            "transport_mode": "Car (Gasoline)",
            "weekly_commute_miles": 10,
            "diet_type": "Vegetarian",
            "electricity_source": "Standard Grid",
            "shopping_frequency": "Occasionally"
        })
        assert response.status_code == 400

def test_top_actions_exception():
    with patch('app.services.gemini_service.GeminiService.analyze_assessment', side_effect=Exception("Mocked error")):
        response = client.post("/api/carbon/top-actions", json={
            "total_score": 100, 
            "monthly_emissions_kg": 10.0,
            "annual_emissions_kg": 120.0,
            "breakdown": {"transport": 10.0, "food": 0, "energy": 0, "shopping": 0}
        })
        assert response.status_code == 500

def test_explain_footprint_exception():
    with patch('app.services.gemini_service.GeminiService.explain_my_footprint', side_effect=Exception("Mocked error")):
        response = client.post("/api/carbon/explain", json={
            "total_score": 100, 
            "monthly_emissions_kg": 10.0,
            "annual_emissions_kg": 120.0,
            "breakdown": {"transport": 10.0, "food": 0, "energy": 0, "shopping": 0}
        })
        assert response.status_code == 500

def test_simulator_exception():
    with patch('app.services.simulator_service.SimulatorService.simulate', side_effect=Exception("Mocked error")):
        response = client.post("/api/simulator/project", json={
            "profile": {"baseline_monthly_kg": 100}, 
            "proposed_change": "Cycle to work"
        })
        assert response.status_code == 400

def test_decision_exception():
    with patch('app.services.gemini_service.GeminiService.decision_assistant', side_effect=Exception("Mocked error")):
        response = client.post("/api/decision/analyze", json={"question": "Test", "context": ""})
        assert response.status_code == 500

def test_coach_exception():
    with patch('app.services.gemini_service.GeminiService.sustainability_coach', side_effect=Exception("Mocked error")):
        response = client.post("/api/coach/chat", json={"message": "Test"})
        assert response.status_code == 500

def test_gemini_init_fallback(monkeypatch):
    from app.core.config import settings
    monkeypatch.setattr(settings, "GEMINI_API_KEY", "fake_key")
    
    class BrokenModule:
        def configure(self, *args, **kwargs):
            raise Exception("Mocked initialization error")
    
    sys.modules['google.generativeai'] = BrokenModule()
    
    import app.services.gemini_service
    importlib.reload(app.services.gemini_service)
    
    assert app.services.gemini_service.USE_MOCK == True
    
    del sys.modules['google.generativeai']
    monkeypatch.setattr(settings, "GEMINI_API_KEY", "")
    importlib.reload(app.services.gemini_service)
