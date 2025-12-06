const jobService = require('../services/job.service');
const ApiError = require('../utils/apiResponse');

const createJob = async (req, res, next)=>{
    try {
        const payload = req.body;

        const result = await jobService.createJob(payload);
        return res.status(201).json(result);
    } catch (err) {
        return next(err);
    }
};

const getJobStatus = async (req, res, next)=>{
    try {
        const { id } = req.params;

        const result = await jobService.getJobStatus(id);
        if(!result){
            return next(new ApiError(404, 'Job not found'));
        }
    } catch (err) {
        return next(err);
    }
};

module.exports = { createJob, getJobStatus };