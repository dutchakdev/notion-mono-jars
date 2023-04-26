/**
 * Calculates the progress percentage of achieving a target amount from a current amount.
 * @param {number} currentAmount - The current amount achieved.
 * @param {number} targetAmount - The total target amount to be achieved.
 * @returns {number} The rounded progress percentage.
 * @throws Will throw an error if the targetAmount equals 0.
 */
const calculateProgress = (currentAmount, targetAmount) => {
  if (targetAmount === 0) {
    throw new Error("Target amount cannot be 0.");
  }

  const progressPercentage = (currentAmount / targetAmount) * 100;
  return Math.round(progressPercentage); // Optional: Round to 2 decimal places
};

/**
 * Converts an amount in cents to dollars.
 * @param {number} amountInCents - The amount in cents to be converted.
 * @returns {number} The amount in dollars.
 */
const convertCentsToDollars = (amountInCents) => {
  return amountInCents / 100;
};

// Export functions for use in index.js
module.exports = {
  calculateProgress,
  convertCentsToDollars,
};
