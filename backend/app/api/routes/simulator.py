from fastapi import APIRouter, HTTPException
from app.schemas.simulator import SimulationRequest, SimulationResponse
from app.services.simulator_service import SimulatorService

router = APIRouter()

@router.post("/project", response_model=SimulationResponse)
def project_impact(request: SimulationRequest):
    try:
        return SimulatorService.simulate(request)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
