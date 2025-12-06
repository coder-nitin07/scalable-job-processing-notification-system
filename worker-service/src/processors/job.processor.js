const prisma = require('../config/prisma');
const logger = require('../utils/logger');

module.exports = async (job) => {
    const { jobId, payload } = job.data;

    try {
        // Update DB → processing
        await prisma.job.update({
            where: { id: jobId },
            data: { status: 'processing' }
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
            data: { status: 'completed', result }
        });

        logger.info(`Job ${jobId} completed`);
        return result;

    } catch (err) {
        logger.error(`Job ${jobId} failed`, err);

        // Update DB → failed
        await prisma.job.update({
            where: { id: jobId },
            data: { status: 'failed', errorMessage: err.message }
        });

        throw err;
    }
};