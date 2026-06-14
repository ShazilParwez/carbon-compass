from fastapi import APIRouter, HTTPException
from app.schemas.carbon import AssessmentInput, CarbonScoreResponse, TopActionsResponse, FootprintExplanation
from app.services.carbon_calculator import CarbonCalculator
from app.services.gemini_service import GeminiService

router = APIRouter()

@router.post("/calculate", response_model=CarbonScoreResponse)
def calculate_carbon_score(assessment: AssessmentInput):
    try:
        return CarbonCalculator.calculate(assessment)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/top-actions", response_model=TopActionsResponse)
def get_top_actions(score: CarbonScoreResponse):
    try:
        return GeminiService.analyze_assessment(score)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate actions: {e}")

@router.post("/explain", response_model=FootprintExplanation)
def explain_footprint(score: CarbonScoreResponse):
    try:
        return GeminiService.explain_my_footprint(score)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to explain footprint: {e}")
