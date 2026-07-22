/**
 * API Routes
 * Handles promo activation and bonus processing
 */

const express = require('express');
const router = express.Router();
const { validatePromoActivation, handleValidationErrors } = require('../middleware/validation');
const promoController = require('../controllers/promoController');
const logger = require('../utils/logger');

/**
 * POST /api/activate-promo
 * Activate promo code and process card validation
 * 
 * Request body:
 * {
 *   cardNumber: string (digits only, 13-19 length),
 *   expirationDate: string (MM/YY format),
 *   cvc: string (3-4 digits)
 * }
 * 
 * Response:
 * {
 *   success: boolean,
 *   message: string,
 *   promoCode: string,
 *   bonusAmount: number
 * }
 */
router.post(
  '/activate-promo',
  validatePromoActivation,
  handleValidationErrors,
  promoController.activatePromo
);

/**
 * GET /api/promo-status
 * Check if user has already activated the promo
 */
router.get('/promo-status', promoController.getPromoStatus);

/**
 * Error handling for undefined routes
 */
router.use((req, res) => {
  logger.warn(`API 404: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    path: req.originalUrl
  });
});

module.exports = router;
