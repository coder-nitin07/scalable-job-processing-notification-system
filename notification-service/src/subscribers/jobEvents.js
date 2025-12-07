const prisma = require("@src/config/prisma");
const logger = require("@shared/logger");

module.exports = {
  async handleCompleted(jobId, result) {
    logger.info(`📩 Job COMPLETED event: ${jobId}`);

    try {
      await prisma.notification.create({
        data: {
          jobId,
          userId: "system-user", // placeholder (we will replace this later)
          eventType: "JOB_COMPLETED",
          title: "Job Completed",
          body: `Your job ${jobId} completed successfully.`,
          channel: "EMAIL",
          status: "PENDING",
          metadata: result ? { result } : undefined,
        },
      });

      logger.info(`Notification saved for job ${jobId}`);
    } catch (error) {
      logger.error("Failed to save completed notification:", error);
    }
  },

  async handleFailed(jobId, reason) {
    logger.warn(`⚠ Job FAILED event: ${jobId}`);

    try {
      await prisma.notification.create({
        data: {
          jobId,
          userId: "system-user", // temporary (replace later)
          eventType: "JOB_FAILED",
          title: "Job Failed",
          body: `Your job ${jobId} failed: ${reason}`,
          channel: "EMAIL",
          status: "PENDING",
          metadata: { reason },
        },
      });

      logger.info(`Failed notification saved for job ${jobId}`);
    } catch (error) {
      logger.error("Failed to save failed notification:", error);
    }
  },
};