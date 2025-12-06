const express = require('express');
const router = express.Router();
const jobRoutes = require('./job.routes');
const healthRoutes = require('./health.routes');

router.use('/jobs', jobRoutes);
router.use('/health', healthRoutes);

module.exports = router;