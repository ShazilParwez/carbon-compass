"""
Centralized module for emission factors.
Units are typically in kg CO2e per unit.
"""

TRANSPORT_FACTORS = {
    "Car (Gasoline)": 0.404,  # kg CO2 per mile
    "Car (Electric)": 0.116,  # kg CO2 per mile (grid average)
    "Public Transit": 0.140,  # kg CO2 per mile
    "Bicycle / Walk": 0.0,    # kg CO2 per mile
}

DIET_FACTORS = {
    "Meat in most meals": 3.3,          # kg CO2 per day
    "Meat rarely (Flexitarian)": 1.9,   # kg CO2 per day
    "Vegetarian": 1.5,                  # kg CO2 per day
    "Vegan": 1.0,                       # kg CO2 per day
}

ELECTRICITY_FACTORS = {
    "Standard Grid": 0.385,            # kg CO2 per kWh
    "100% Renewable Plan": 0.0,        # kg CO2 per kWh
    "Solar Panels": 0.0,               # kg CO2 per kWh
    "Not Sure": 0.385,                 # kg CO2 per kWh fallback
}

# Assumed average daily kWh usage per household if not provided
AVERAGE_DAILY_KWH = 29.0

SHOPPING_FACTORS = {
    "Frequently (Monthly)": 5.0,           # kg CO2 per day
    "Occasionally": 2.5,                   # kg CO2 per day
    "Rarely (Only when needed)": 1.0,      # kg CO2 per day
    "I prefer second-hand": 0.5,           # kg CO2 per day
}
