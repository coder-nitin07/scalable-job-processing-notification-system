const axios = require('axios');
const ApiError = require('../utils/apiResponse');
const logger = require('../utils/logger');

const JOB_SERVICE_URL = process.env.JOB_SERVICE_URL || 'http://localhost:4001';

async function createJob(payload){
    try {
        const resp = await axios.post(`${ JOB_SERVICE_URL }/api/jobs`, payload, { timeout: 5000 });
        return resp.data;
    } catch (err) {
        logger.error('Error formatting createJob to job-service', err.message);
        if(err.response){
            throw new ApiError(err.response.status, err.response.data?.message || 'Upstream Error');
        }
        
        throw new ApiError(502, 'Failed to reach job-service');
    }
}

async function getJobStatus(id){
    try {
        const resp = await axios.get(`${ JOB_SERVICE_URL }/api/jobs/${ id }`, { timeout: 5000 });

        return resp.data;
    } catch (err) {
        logger.error('Error fetching job status from job-service', err.message);
        
        if (err.response && err.response.status === 404) return null;
        throw new ApiError(502, 'Failed to reach job-service');
    }
}

module.exports = { createJob, getJobStatus };