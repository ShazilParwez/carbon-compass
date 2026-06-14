from pydantic import BaseModel, Field
from typing import List

class DecisionRequest(BaseModel):
    question: str = Field(..., description="The user's decision question, e.g., 'Car vs Train to NY?'")
    context: str = Field("", description="Optional contextual info")

class DecisionOption(BaseModel):
    title: str
    isRecommended: bool
    score: int = Field(..., ge=0, le=100)
    co2_impact_kg: float
    key_factor: str
    pros: List[str]
    cons: List[str]

class DecisionResponse(BaseModel):
    recommendation_title: str
    recommendation_explanation: str
    confidence_level: str
    options: List[DecisionOption]
