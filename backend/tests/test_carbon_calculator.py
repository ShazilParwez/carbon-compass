import pytest
from app.services.carbon_calculator import CarbonCalculator
from app.schemas.carbon import AssessmentInput

def test_carbon_calculator_high_emissions():
    assessment = AssessmentInput(
        transport_mode="Car (Gasoline)",
        weekly_commute_miles=200,
        diet_type="Meat in most meals",
        electricity_source="Standard Grid",
        shopping_frequency="Frequently (Monthly)"
    )
    result = CarbonCalculator.calculate(assessment)
    
    assert result.monthly_emissions_kg > 0
    assert result.annual_emissions_kg > 0
    assert result.breakdown.transport > 0
    assert result.breakdown.food > 0
    assert result.breakdown.energy > 0
    assert result.breakdown.shopping > 0
    assert 0 <= result.total_score <= 100

def test_carbon_calculator_zero_emissions():
    assessment = AssessmentInput(
        transport_mode="Bicycle / Walk",
        weekly_commute_miles=100,
        diet_type="Vegan",
        electricity_source="100% Renewable Plan",
        shopping_frequency="I prefer second-hand"
    )
    result = CarbonCalculator.calculate(assessment)
    
    assert result.breakdown.transport == 0.0
    assert result.breakdown.energy == 0.0
    assert result.breakdown.food > 0
    assert result.breakdown.shopping > 0
    assert result.total_score > 50

def test_carbon_calculator_fallbacks():
    # Test with invalid modes to see fallback behavior
    assessment = AssessmentInput(
        transport_mode="Hoverboard",
        weekly_commute_miles=100,
        diet_type="Photosynthesis",
        electricity_source="Hamster Wheel",
        shopping_frequency="Never"
    )
    result = CarbonCalculator.calculate(assessment)
    assert result.monthly_emissions_kg > 0
