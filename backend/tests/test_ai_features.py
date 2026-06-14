import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.services.gemini_service import GeminiService
from app.schemas.decision import DecisionRequest
from app.schemas.carbon import CarbonScoreResponse, CarbonBreakdown

client = TestClient(app)

def test_decision_assistant_validation():
    response = client.post("/api/decision/analyze", json={
        "question": "Should I drive or take the train?",
        "context": "Going to NYC"
    })
    assert response.status_code == 200
    data = response.json()
    assert "recommendation_title" in data
    assert "recommendation_explanation" in data
    assert "options" in data
    assert len(data["options"]) > 0
    option = data["options"][0]
    assert "score" in option
    assert "isRecommended" in option

def test_explain_footprint_validation():
    response = client.post("/api/carbon/explain", json={
        "total_score": 50,
        "monthly_emissions_kg": 500.0,
        "annual_emissions_kg": 6000.0,
        "breakdown": {"transport": 200.0, "food": 100.0, "energy": 100.0, "shopping": 100.0}
    })
    assert response.status_code == 200
    data = response.json()
    assert "biggest_contributor" in data
    assert "smallest_contributor" in data
    assert "personalized_summary" in data

def test_top_actions_validation():
    response = client.post("/api/carbon/top-actions", json={
        "total_score": 50,
        "monthly_emissions_kg": 500.0,
        "annual_emissions_kg": 6000.0,
        "breakdown": {"transport": 200.0, "food": 100.0, "energy": 100.0, "shopping": 100.0}
    })
    assert response.status_code == 200
    data = response.json()
    assert "actions" in data
    assert len(data["actions"]) > 0
    action = data["actions"][0]
    assert "title" in action
    assert "annualSavings" in action
    assert "reason" in action

def test_ai_coach_validation():
    response = client.post("/api/coach/chat", json={
        "message": "How do I save energy?"
    })
    assert response.status_code == 200
    data = response.json()
    assert "reply" in data

def test_simulator_validation():
    response = client.post("/api/simulator/project", json={
        "profile": {"baseline_monthly_kg": 1000},
        "proposed_change": "Go Meatless"
    })
    assert response.status_code == 200
    data = response.json()
    assert "annual_savings_kg" in data
    assert data["monthly_savings_kg"] > 0

def test_gemini_fallback_behavior():
    from unittest.mock import patch
    import app.services.gemini_service
    
    with patch('app.services.gemini_service.USE_MOCK', False):
        with patch('app.services.gemini_service.model') as mock_model:
            mock_model.generate_content.side_effect = Exception("API Timeout")
            
            # Coach
            coach_res = app.services.gemini_service.GeminiService.sustainability_coach("test")
            assert "trouble thinking" in coach_res["reply"]
            
            # Decision
            req = DecisionRequest(question="Test", context="")
            decision_res = app.services.gemini_service.GeminiService.decision_assistant(req)
            assert decision_res.recommendation_title == "Error"
            
            # Top Actions
            score = CarbonScoreResponse(
                total_score=50, monthly_emissions_kg=100.0, annual_emissions_kg=1200.0, 
                breakdown=CarbonBreakdown(transport=25.0, food=25.0, energy=25.0, shopping=25.0)
            )
            actions_res = app.services.gemini_service.GeminiService.analyze_assessment(score)
            assert actions_res.actions == []
            
            # Explain
            explain_res = app.services.gemini_service.GeminiService.explain_my_footprint(score)
            assert explain_res.biggest_contributor == "Unknown"
