const { Queue } = require('bullmq');

const jobQueue = new Queue('job-queue', {
    connection: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

module.exports = jobQueue;