const express = require('express');
const router = express.router();
const { validateCreateJob } = require('../validation/job.schema');
const controller = require('../controllers/job.controller');

router.post('/', validateCreateJob, controller.createJob);
router.get('/:id', controller.getJobStatus);

module.exports = router;