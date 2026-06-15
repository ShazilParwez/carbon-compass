import { deterministicDecisionAnalysis } from '../constants/decisionData';

/**
 * Executes a deterministic offline evaluation model for a user's decision query.
 * Evaluates the comparative carbon impact of transportation or lifestyle alternatives.
 * 
 * @param {string} query - The user's decision query.
 * @returns {Promise<Object>} A promise that resolves to the sustainability insights analysis.
 */
export const evaluateDecisionImpact = async (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(deterministicDecisionAnalysis);
    }, 1500);
  });
};
