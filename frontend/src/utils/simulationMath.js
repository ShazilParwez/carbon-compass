/**
 * Calculates the total monthly CO2 emission savings based on selected behavioral shifts.
 * 
 * @param {string[]} selectedHabits - Array of IDs representing selected behaviors.
 * @param {Object[]} behavioralShiftImpacts - The dataset of behavior impacts.
 * @returns {number} The total monthly savings in kg CO2.
 */
export const calculateMonthlyEmissionSavings = (selectedHabits, behavioralShiftImpacts) => {
  return selectedHabits.reduce((acc, id) => {
    const habit = behavioralShiftImpacts.find(h => h.id === id);
    return acc + (habit ? habit.savingMonthly : 0);
  }, 0);
};

/**
 * Calculates the total annual CO2 emission savings based on monthly savings.
 * 
 * @param {number} monthlySavings - Total monthly savings in kg CO2.
 * @returns {number} The total annual savings in kg CO2.
 */
export const calculateAnnualEmissionSavings = (monthlySavings) => {
  return monthlySavings * 12;
};

/**
 * Generates an emissions trajectory dataset comparing a baseline against projected savings over 12 months.
 * 
 * @param {number} baselineMonthly - The baseline monthly CO2 emissions in kg.
 * @param {number} totalMonthlySavings - The total monthly CO2 savings.
 * @returns {Object[]} The 12-month trajectory dataset for chart visualization.
 */
export const generateEmissionsTrajectory = (baselineMonthly, totalMonthlySavings) => {
  return Array.from({ length: 12 }).map((_, i) => {
    return {
      month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
      Baseline: baselineMonthly,
      Projected: baselineMonthly - totalMonthlySavings
    };
  });
};
