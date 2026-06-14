import pytest
from unittest.mock import patch, MagicMock
from app.services.gemini_service import GeminiService
import app.services.gemini_service as gemini_module
from app.schemas.carbon import CarbonScoreResponse, CarbonBreakdown
from app.schemas.decision import DecisionRequest
import json

@pytest.fixture
def mock_score():
    return CarbonScoreResponse(
        total_score=50,
        monthly_emissions_kg=1000,
        annual_emissions_kg=12000,
        breakdown=CarbonBreakdown(transport=200, food=300, energy=400, shopping=100)
    )

def test_explain_my_footprint_live(mock_score):
    gemini_module.USE_MOCK = False
    with patch.object(gemini_module, 'model') as mock_model:
        mock_response = MagicMock()
        mock_response.text = json.dumps({
            "explanation": "Test",
            "biggest_contributor": "Energy",
            "smallest_contributor": "Shopping",
            "key_habits": ["Test"],
            "personalized_summary": "Test"
        })
        mock_model.generate_content.return_value = mock_response
        res = GeminiService.explain_my_footprint(mock_score)
        assert res.explanation == "Test"

def test_explain_my_footprint_error(mock_score):
    gemini_module.USE_MOCK = False
    with patch.object(gemini_module, 'model') as mock_model:
        mock_model.generate_content.side_effect = Exception("API Error")
        res = GeminiService.explain_my_footprint(mock_score)
        assert res.explanation == "Error generating explanation."

def test_analyze_assessment_live(mock_score):
    gemini_module.USE_MOCK = False
    with patch.object(gemini_module, 'model') as mock_model:
        mock_response = MagicMock()
        mock_response.text = json.dumps({
            "actions": [{"id": 1, "title": "Test", "monthlySavings": 10.0, "annualSavings": 120.0, "difficulty": "Easy", "reason": "Test"}]
        })
        mock_model.generate_content.return_value = mock_response
        res = GeminiService.analyze_assessment(mock_score)
        assert len(res.actions) == 1

def test_analyze_assessment_error(mock_score):
    gemini_module.USE_MOCK = False
    with patch.object(gemini_module, 'model') as mock_model:
        mock_model.generate_content.side_effect = Exception("API Error")
        res = GeminiService.analyze_assessment(mock_score)
        assert len(res.actions) == 0

def test_decision_assistant_live():
    gemini_module.USE_MOCK = False
    req = DecisionRequest(question="Test?", context="")
    with patch.object(gemini_module, 'model') as mock_model:
        mock_response = MagicMock()
        mock_response.text = json.dumps({
            "recommendation_title": "Test Rec",
            "recommendation_explanation": "Exp",
            "confidence_level": "High",
            "options": [{"title": "Opt", "isRecommended": True, "score": 100, "co2_impact_kg": 0.0, "key_factor": "Key", "pros": [], "cons": []}]
        })
        mock_model.generate_content.return_value = mock_response
        res = GeminiService.decision_assistant(req)
        assert res.recommendation_title == "Test Rec"

def test_decision_assistant_error():
    gemini_module.USE_MOCK = False
    req = DecisionRequest(question="Test?", context="")
    with patch.object(gemini_module, 'model') as mock_model:
        mock_model.generate_content.side_effect = Exception("API Error")
        res = GeminiService.decision_assistant(req)
        assert res.recommendation_title == "Error"

def test_sustainability_coach_live():
    gemini_module.USE_MOCK = False
    with patch.object(gemini_module, 'model') as mock_model:
        mock_response = MagicMock()
        mock_response.text = json.dumps({"reply": "Test Reply"})
        mock_model.generate_content.return_value = mock_response
        res = GeminiService.sustainability_coach("Test")
        assert res["reply"] == "Test Reply"

def test_sustainability_coach_error():
    gemini_module.USE_MOCK = False
    with patch.object(gemini_module, 'model') as mock_model:
        mock_model.generate_content.side_effect = Exception("API Error")
        res = GeminiService.sustainability_coach("Test")
        assert "trouble thinking" in res["reply"]

# Restore state at end
def teardown_module(module):
    gemini_module.USE_MOCK = True
