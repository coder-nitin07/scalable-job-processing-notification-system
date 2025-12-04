const JobService = require('../services/job.service');

const createJob = async (req, res, next)=>{
    try {
        const { type, payload } = req.body;

        if(!type){
            return res.status(400).json({ message: "Job 'type' is required" });
        }

        const userId = req.user.id;

        const job = await JobService.createJob({ type, payload }, userId);

        res.status(201).json({ 
            message: 'Job Created Successfully',
            jobId: job.id,
            status: job.status
         })
    } catch (err) {
        next(err);
    }
};

module.exports = { createJob };