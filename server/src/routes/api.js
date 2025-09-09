const express = require('express');
const router = express.Router();

const journalRoutes = require('./journal/journal');
const healthRoute = require('./health/health');

// Mount all the main Routes here
router.use('/health', healthRoute);
router.use('/journals', journalRoutes);

module.exports = router;
