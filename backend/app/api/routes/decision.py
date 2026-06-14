from fastapi import APIRouter, HTTPException
from app.schemas.decision import DecisionRequest, DecisionResponse
from app.services.gemini_service import GeminiService

router = APIRouter()

@router.post("/analyze", response_model=DecisionResponse)
def analyze_decision(request: DecisionRequest):
    try:
        return GeminiService.decision_assistant(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
