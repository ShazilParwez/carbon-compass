from pydantic import BaseModel, Field

class SimulatorProfile(BaseModel):
    baseline_monthly_kg: float = Field(..., gt=0)

class SimulationRequest(BaseModel):
    profile: SimulatorProfile
    proposed_change: str = Field(..., description="e.g., Cycle twice per week")

class SimulationResponse(BaseModel):
    monthly_savings_kg: float
    annual_savings_kg: float
    equivalent_impact: str
    confidence_level: str
