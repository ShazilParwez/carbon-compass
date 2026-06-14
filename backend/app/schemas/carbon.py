from pydantic import BaseModel, Field
from typing import List

class AssessmentInput(BaseModel):
    transport_mode: str = Field(..., description="e.g., Car (Gasoline), Car (Electric), Public Transit, Bicycle / Walk")
    weekly_commute_miles: float = Field(..., ge=0)
    diet_type: str = Field(..., description="e.g., Meat in most meals, Meat rarely (Flexitarian), Vegetarian, Vegan")
    electricity_source: str = Field(..., description="e.g., Standard Grid, 100% Renewable Plan, Solar Panels, Not Sure")
    shopping_frequency: str = Field(..., description="e.g., Frequently (Monthly), Occasionally, Rarely (Only when needed), I prefer second-hand")

class CarbonBreakdown(BaseModel):
    transport: float
    food: float
    energy: float
    shopping: float

class CarbonScoreResponse(BaseModel):
    total_score: int = Field(..., ge=0, le=100)
    monthly_emissions_kg: float
    annual_emissions_kg: float
    breakdown: CarbonBreakdown

class TopAction(BaseModel):
    id: int
    title: str
    monthlySavings: float
    annualSavings: float
    difficulty: str
    reason: str

class TopActionsResponse(BaseModel):
    actions: List[TopAction]

class FootprintExplanation(BaseModel):
    explanation: str
    biggest_contributor: str
    smallest_contributor: str
    key_habits: List[str]
    personalized_summary: str
