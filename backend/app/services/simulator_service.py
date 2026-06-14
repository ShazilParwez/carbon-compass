from app.schemas.simulator import SimulationRequest, SimulationResponse

class SimulatorService:
    @staticmethod
    def simulate(request: SimulationRequest) -> SimulationResponse:
        change = request.proposed_change.lower()
        
        monthly_savings = 0.0
        confidence = "Medium"
        impact_str = "A small but positive step."
        
        # Rule-based matching for < 500ms response time
        if "cycle" in change or "bike" in change or "walk" in change:
            monthly_savings = 15.0
            confidence = "High"
            impact_str = "Equivalent to avoiding 3 gallons of gasoline burned."
        elif "meat" in change or "vegetarian" in change or "vegan" in change:
            monthly_savings = 25.0
            confidence = "High"
            impact_str = "Equivalent to planting 5 tree seedlings grown for 10 years."
        elif "ac " in change or "thermostat" in change or "heater" in change or "ac" == change:
            monthly_savings = 10.0
            confidence = "Medium"
            impact_str = "Equivalent to switching 15 incandescent bulbs to LEDs."
        else:
            monthly_savings = 5.0
            confidence = "Low"
            impact_str = "A general reduction in your carbon footprint."
            
        # Cap savings to not exceed the baseline
        monthly_savings = min(monthly_savings, request.profile.baseline_monthly_kg)
        
        return SimulationResponse(
            monthly_savings_kg=monthly_savings,
            annual_savings_kg=monthly_savings * 12,
            equivalent_impact=impact_str,
            confidence_level=confidence
        )
