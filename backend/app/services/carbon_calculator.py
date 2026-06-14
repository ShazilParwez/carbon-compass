from app.schemas.carbon import AssessmentInput, CarbonBreakdown, CarbonScoreResponse
from app.core.emission_factors import (
    TRANSPORT_FACTORS,
    DIET_FACTORS,
    ELECTRICITY_FACTORS,
    AVERAGE_DAILY_KWH,
    SHOPPING_FACTORS
)

class CarbonCalculator:
    @staticmethod
    def calculate(assessment: AssessmentInput) -> CarbonScoreResponse:
        # Transport
        transport_factor = TRANSPORT_FACTORS.get(assessment.transport_mode, 0.404)
        transport_monthly = transport_factor * assessment.weekly_commute_miles * 4.33
        
        # Food
        food_factor = DIET_FACTORS.get(assessment.diet_type, 3.3)
        food_monthly = food_factor * 30.4
        
        # Energy
        energy_factor = ELECTRICITY_FACTORS.get(assessment.electricity_source, 0.385)
        energy_monthly = energy_factor * AVERAGE_DAILY_KWH * 30.4
        
        # Shopping
        shopping_factor = SHOPPING_FACTORS.get(assessment.shopping_frequency, 2.5)
        shopping_monthly = shopping_factor * 30.4
        
        breakdown = CarbonBreakdown(
            transport=round(transport_monthly, 2),
            food=round(food_monthly, 2),
            energy=round(energy_monthly, 2),
            shopping=round(shopping_monthly, 2)
        )
        
        monthly_total = transport_monthly + food_monthly + energy_monthly + shopping_monthly
        annual_total = monthly_total * 12
        
        # Score calculation: 100 is excellent (0 emissions), 0 is poor (high emissions)
        # Average US footprint is ~14,000 kg/year. Let's say > 20,000 is 0 score, 0 is 100 score.
        score = max(0, min(100, int(100 - (annual_total / 20000) * 100)))
        
        return CarbonScoreResponse(
            total_score=score,
            monthly_emissions_kg=round(monthly_total, 2),
            annual_emissions_kg=round(annual_total, 2),
            breakdown=breakdown
        )
