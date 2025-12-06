const jobService = require('../services/job.service');
const ApiError = require('../utils/apiResponse');

exports.createJob = async (req, res, next) => {
    try {
        const payload = req.body;
        const job = await jobService.createJob(payload);
        return res.status(201).json(job);
    } catch (err) {
        return next(err);
    }
};

exports.getJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await jobService.getJobById(id);
        if (!job) return next(new ApiError(404, 'Job not found'));
        return res.json(job);
    } catch (err) {
        return next(err);
    }
};

exports.listJobs = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status, type, q } = req.query;
        const result = await jobService.listJobs({ page: Number(page), limit: Number(limit), status, type, q });
        return res.json(result);
    } catch (err) {
        return next(err);
    }
};