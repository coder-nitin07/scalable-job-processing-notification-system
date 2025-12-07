const prisma = require('../config/prisma');
const logger = require('../utils/logger');

module.exports = async (job) => {
    const { id, payload, type } = job.data;
    const jobId = id; 

    try {
        // Update DB → processing
        await prisma.job.update({
            where: { id: jobId },
            data: { status: 'PROCESSING' }
        });

        logger.info(`Processing job ${jobId}`);

        // Simulate processing (your business logic here)
        const result = {
            processedAt: new Date().toISOString(),
            output: `Processed payload: ${JSON.stringify(payload)}`
        };

        await new Promise(resolve => setTimeout(resolve, 2000)); // simulate work

        // Update DB → completed
        await prisma.job.update({
            where: { id: jobId },
            data: { status: 'COMPLETED', result }
        });

        logger.info(`Job ${jobId} completed`);
        return result;

    } catch (err) {
        logger.error(`Job ${jobId} failed`, err);

        // Update DB → failed
        await prisma.job.update({
            where: { id: jobId },
            data: { status: 'FAILED', errorMessage: err.message }
        });

        throw err;
    }
};