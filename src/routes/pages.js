/**
 * Page Routes
 * Serves the landing page and static HTML pages
 */

const express = require('express');
const path = require('path');
const router = express.Router();

// Home / Landing page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// 404 fallback for unmatched routes
router.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Page not found',
    path: req.originalUrl
  });
});

module.exports = router;
