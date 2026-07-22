/**
 * Utility Helper Functions
 * Common helper functions used across the application
 */

/**
 * Mask credit card number for logging
 * Shows first 4 and last 4 digits
 */
const maskCardNumber = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 8) return '****';
  
  const first4 = digits.substring(0, 4);
  const last4 = digits.substring(digits.length - 4);
  
  return `${first4}****${last4}`;
};

/**
 * Generate random request ID for tracing
 */
const generateRequestId = () => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Format currency value
 */
const formatCurrency = (amount, currency = 'USD') => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  });
  
  return formatter.format(amount);
};

/**
 * Check if email is valid
 */
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Sleep/delay function (promise-based)
 */
const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
  maskCardNumber,
  generateRequestId,
  formatCurrency,
  isValidEmail,
  delay
};
