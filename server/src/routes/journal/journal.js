const express = require('express');
const router = express.Router();
const journalController = require('../../controllers/journalController');

/**
 * @route   GET /api/journals
 * @desc    Get all journals
 * @access  Public
 * This endpoint returns all the journals.
 */
router.get('/', journalController.getAllJournals);

module.exports = router;
