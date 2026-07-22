/**
 * Promo Controller
 * Handles business logic for promo code activation
 */

const logger = require('../utils/logger');
const { maskCardNumber } = require('../utils/helpers');

/**
 * Activate promo code
 * POST /api/activate-promo
 */
const activatePromo = async (req, res, next) => {
  try {
    const { cardNumber, expirationDate, cvc } = req.body;
    const userIp = req.ip;
    const userAgent = req.get('user-agent');

    // Log the activation attempt (masked card)
    logger.info(`Promo activation attempt from IP: ${userIp}`, {
      cardMasked: maskCardNumber(cardNumber),
      timestamp: new Date().toISOString()
    });

    // Validate card details (basic checks)
    if (!validateCardNumber(cardNumber)) {
      logger.warn(`Invalid card number format: ${userIp}`);
      return res.status(400).json({
        success: false,
        error: 'Invalid card number'
      });
    }

    if (!validateExpiration(expirationDate)) {
      logger.warn(`Invalid expiration date: ${userIp}`);
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired card'
      });
    }

    // Simulate processing delay (realistic API behavior)
    await simulateProcessing(800);

    // Log successful activation
    logger.info(`Promo activated successfully`, {
      cardMasked: maskCardNumber(cardNumber),
      promoCode: 'DIGITALIX20',
      bonusAmount: 20,
      ip: userIp
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Бонус $20 успешно начислен на ваш счет!',
      promoCode: 'DIGITALIX20',
      bonusAmount: 20,
      currency: 'USD',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Error in activatePromo:', error);
    next(error);
  }
};

/**
 * Get promo status
 * GET /api/promo-status
 */
const getPromoStatus = async (req, res, next) => {
  try {
    // In a real application, you would check against a database
    // For demo purposes, we return a default response
    
    res.status(200).json({
      success: true,
      promoCode: 'DIGITALIX20',
      bonusAmount: 20,
      isActive: true,
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() // 90 days
    });
  } catch (error) {
    logger.error('Error in getPromoStatus:', error);
    next(error);
  }
};

/**
 * Validate card number using Luhn algorithm
 */
const validateCardNumber = (cardNumber) => {
  const digits = cardNumber.replace(/\D/g, '');
  
  // Check length
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  // Luhn algorithm
  let sum = 0;
  let isEven = false;
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Validate expiration date
 */
const validateExpiration = (expirationDate) => {
  const [month, year] = expirationDate.split('/');
  const monthNum = parseInt(month, 10);
  const yearNum = parseInt('20' + year, 10);
  
  if (monthNum < 1 || monthNum > 12) {
    return false;
  }
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  // Check if card has expired
  if (yearNum < currentYear) {
    return false;
  }
  
  if (yearNum === currentYear && monthNum < currentMonth) {
    return false;
  }
  
  return true;
};

/**
 * Simulate API processing delay
 */
const simulateProcessing = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

module.exports = {
  activatePromo,
  getPromoStatus
};
