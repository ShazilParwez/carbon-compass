from locust import HttpUser, task, between

class CarbonCompassUser(HttpUser):
    wait_time = between(1, 2)

    @task(3)
    def calculate_carbon(self):
        self.client.post("/api/carbon/calculate", json={
            "transport_mode": "Car (Gasoline)",
            "weekly_commute_miles": 50,
            "diet_type": "Vegetarian",
            "electricity_source": "100% Renewable Plan",
            "shopping_frequency": "Occasionally"
        })

    @task(1)
    def decision_analyze(self):
        self.client.post("/api/decision/analyze", json={
            "question": "Should I fly or drive?",
            "context": ""
        })

    @task(2)
    def simulate_impact(self):
        self.client.post("/api/simulator/project", json={
            "profile": {"baseline_monthly_kg": 500},
            "proposed_change": "Reduce meat consumption"
        })
