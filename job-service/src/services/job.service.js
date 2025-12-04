const prisma = require('../config/prisma');
const jobQueue = require('../queues/jobQueue');

class JobService {
    static async createJob(data, userId){
        // save job in DB
        const job = await prisma.job.create({
            data: {
                type: data.type,
                payload: data.payload,
                status: 'PENDING',
                userId,
            }
        });

        // Enqueue Job in Redis BullMQ
        await jobQueue.add('process-job', {
            jobId: job.id,
            type: job.type,
            payload: job.payload
        });

        return job;
    }
}

module.exports = JobService;