import { Car, Utensils, Zap, ShoppingBag } from 'lucide-react';

/**
 * Core lifestyle categories evaluated during the user onboarding assessment.
 */
export const assessmentSteps = [
  { id: 'transport', title: 'Transportation', icon: Car },
  { id: 'food', title: 'Food Habits', icon: Utensils },
  { id: 'energy', title: 'Home Energy', icon: Zap },
  { id: 'shopping', title: 'Shopping', icon: ShoppingBag },
];

/**
 * Deterministic recommendation engine dataset mapping user profiles to specific carbon reduction actions.
 */
export const emissionReductionActions = [
  {
    id: 1,
    title: "Replace two car trips per week with cycling",
    monthlySavings: 12,
    annualSavings: 144,
    difficulty: "Medium",
    reason: "Your assessment shows high car dependency for short distances. Cycling short distances cuts emissions significantly while improving health."
  },
  {
    id: 2,
    title: "Reduce AC usage by one hour daily",
    monthlySavings: 9,
    annualSavings: 108,
    difficulty: "Easy",
    reason: "Your grid relies heavily on fossil fuels. Small reductions in HVAC usage provide outsized carbon benefits."
  },
  {
    id: 3,
    title: "Meat-free one day per week",
    monthlySavings: 6,
    annualSavings: 72,
    difficulty: "Easy",
    reason: "You indicated a high-meat diet. Replacing beef or lamb with plant-based alternatives just one day a week dramatically lowers your footprint."
  }
];
