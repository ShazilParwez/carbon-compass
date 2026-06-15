/**
 * Pre-populated suggestions to assist users in querying the decision engine.
 */
export const decisionPrompts = [
  "Should I travel by car, bus, train, or bicycle?",
  "Should I repair my current phone or buy a new one?",
  "Should I order food delivery or cook at home?"
];

/**
 * Deterministic offline analysis matrix used to evaluate the comparative carbon impact of transportation alternatives.
 */
export const deterministicDecisionAnalysis = {
  recommendation: {
    title: "Take the Train (Amtrak)",
    explanation: "Based on the distance from NY to DC, traveling by train is the most environmentally sound decision. Electrified rail networks produce a fraction of the emissions per passenger compared to driving a personal vehicle or flying. Additionally, the train takes you city-center to city-center, eliminating the need for airport transit."
  },
  options: [
    {
      title: "Train",
      impact: "Low Impact",
      score: 92,
      co2: 15.2,
      factor: "Shared Electric",
      isRecommended: true
    },
    {
      title: "Car (Gas)",
      impact: "High Impact",
      score: 35,
      co2: 85.5,
      factor: "Fossil Fuel",
      isRecommended: false
    },
    {
      title: "Flight",
      impact: "Very High Impact",
      score: 12,
      co2: 125.0,
      factor: "Aviation Fuel",
      isRecommended: false
    }
  ]
};
