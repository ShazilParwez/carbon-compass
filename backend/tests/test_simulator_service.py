import pytest
from app.services.simulator_service import SimulatorService
from app.schemas.simulator import SimulationRequest, SimulatorProfile

def test_simulate_cycle():
    req = SimulationRequest(
        profile=SimulatorProfile(baseline_monthly_kg=100.0),
        proposed_change="Cycle twice per week"
    )
    res = SimulatorService.simulate(req)
    assert res.monthly_savings_kg == 15.0
    assert res.annual_savings_kg == 15.0 * 12
    assert res.confidence_level == "High"

def test_simulate_meat():
    req = SimulationRequest(
        profile=SimulatorProfile(baseline_monthly_kg=100.0),
        proposed_change="Reduce meat consumption"
    )
    res = SimulatorService.simulate(req)
    assert res.monthly_savings_kg == 25.0

def test_simulate_ac():
    req = SimulationRequest(
        profile=SimulatorProfile(baseline_monthly_kg=100.0),
        proposed_change="Reduce AC usage"
    )
    res = SimulatorService.simulate(req)
    assert res.monthly_savings_kg == 10.0

def test_simulate_generic():
    req = SimulationRequest(
        profile=SimulatorProfile(baseline_monthly_kg=100.0),
        proposed_change="Buy less stuff"
    )
    res = SimulatorService.simulate(req)
    assert res.monthly_savings_kg == 5.0
    assert res.confidence_level == "Low"

def test_simulate_cap():
    req = SimulationRequest(
        profile=SimulatorProfile(baseline_monthly_kg=10.0),
        proposed_change="Reduce meat consumption"
    )
    res = SimulatorService.simulate(req)
    assert res.monthly_savings_kg == 10.0  # Capped at baseline
