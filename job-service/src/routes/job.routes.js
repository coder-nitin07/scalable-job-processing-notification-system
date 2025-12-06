const express = require('express');
const router = express.Router();
const controller = require('../controllers/job.controller');
const { validateCreateJob } = require('../validation/job.schema');

router.post('/', validateCreateJob, controller.createJob);
router.get('/:id', controller.getJobById);
router.get('/', controller.listJobs);

module.exports = router;