const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const {
  validateRegistration,
  validateLogin,
  handleValidationErrors
} = require('../middleware/validation');

// Public routes
router.post(
  '/register',
  validateRegistration,
  handleValidationErrors,
  authController.register
);

router.post(
  '/login',
  validateLogin,
  handleValidationErrors,
  authController.login
);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);
router.put('/profile', authenticate, authController.updateProfile);

module.exports = router;