const express = require('express');
const router = express.Router();

const journalRoutes = require('./journal/journal');
const healthRoute = require('./health/health');
const authRoute = require('./auth');

// Mount all the main Routes here
router.use('/health', healthRoute);
router.use('/journals', journalRoutes);
router.use('/auth', authRoute);

module.exports = router;
