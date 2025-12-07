const prisma = require("../config/prisma");
const { v4: uuidv4 } = require('uuid');
const { enqueueJob } = require('../queues');
const ApiError = require('../utils/apiResponse');
const logger = require('../utils/logger');

async function createJob(payload){
    const id = uuidv4();
    const { type, data, maxAttempts = 3 } = payload;

    // persist jobb
    const job = await prisma.job.create({
        data: {
            id,
            type,
            payload: data || {},
            maxAttempts,
            status: 'PENDING'
        }
    });

    // add history
    await prisma.jobStatusHistory.create({
        data: { 
            jobId: id, 
            status: 'PENDING', 
            message: 'Job Created' 
        }
    });

    // Enqueue for processing
    try {
        await enqueueJob({ id, type, payload: job.payload });

        // update status to Queued
        await prisma.job.update({ 
            where: { id }, 
            data: { status: 'QUEUED' } 
        });

        await prisma.jobStatusHistory.create({ 
            data: { 
                jobId: id, 
                status: 'QUEUED', 
                message: 'Job queued' 
            } 
        });
    } catch (err) {
        logger.error('Failed to Enqueue Job', err);
        
        await prisma.job.update({ 
            where: { id }, 
            data: { status: 'FAILED' } 
        });
        
        await prisma.jobStatusHistory.create({ 
            data: { 
                jobId: id, 
                status: 'FAILED', 
                message: 'Enqueue Failed' 
            } 
        });
        
        throw new ApiError(500, 'Failed to enqueue Job');
    }

    return job;
};

async function getJobById(id){
    return prisma.job.findUnique({ 
        where: { id }, 
        include: { 
            history: { orderBy: { timestamp: 'asc' } }, 
        }, 
    });
}

async function listJobs({ page=1, limit=10, status, type, q }) {
    const where = {};

    if (status) where.status = status;
    if (type) where.type = type;

    if (q) where.OR = [{ type: { contains: q } }, { payload: { path: [], equals: q } }];

    const total = await prisma.job.count({ where });
    const jobs = await prisma.job.findMany({ 
        where, 
        skip: (page - 1) * limit, 
        take: limit, 
        orderBy: { createdAt: 'desc' }, 
    });
    
    return { total, page, limit, jobs };
}

module.exports = { createJob, getJobById, listJobs };