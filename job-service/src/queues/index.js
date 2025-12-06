const { Queue } = require('bullmq');
const IORedis  = require('ioredis');

let connection;
let jobQueue;

async function initQueue(){
    const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

    connection = new IORedis(redisUrl);
    jobQueue = new Queue('job-queue', { connection });
}

async function enqueueJob(jobData){
    if(!jobQueue) throw new Error('Queue not initialized');

    return jobQueue.add(jobData.type || 'default', jobData, { attempts: jobData.maxAttempts || 3 });
}

module.exports = { initQueue, enqueueJob };