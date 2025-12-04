const express = require('express');
const { createJob } = require('../controllers/job.controller');
const jobRouter = express.Router();

jobRouter.post('/createJob', createJob);

module.exports = jobRouter;