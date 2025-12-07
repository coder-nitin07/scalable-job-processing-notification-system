const { Worker } = require('bullmq');
const redis = require('../config/redis');
const processJob = require('../processors/job.processor');

const jobWorker = new Worker('job-queue', processJob, {
    connection: redis,
    concurrency: 5,       // allow 5 jobs at once
    removeOnComplete: true,
    removeOnFail: false
});

jobWorker.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed`, result);
});

jobWorker.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err.message);
});

module.exports = jobWorker;
