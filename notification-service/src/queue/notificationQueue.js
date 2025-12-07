const { QueueEvents } = require("bullmq");
const redis = require("@src/config/redis");
const jobEventsHandler = require("@src/subscribers/jobEvents");

const notificationQueueEvents = new QueueEvents("job-events", {
  connection: redis,
});

notificationQueueEvents.on("completed", async ({ jobId, returnvalue }) => {
  await jobEventsHandler.handleCompleted(jobId, returnvalue);
});

notificationQueueEvents.on("failed", async ({ jobId, failedReason }) => {
  await jobEventsHandler.handleFailed(jobId, failedReason);
});

notificationQueueEvents.on("error", (err) => {
  console.error("QueueEvents error:", err);
});

module.exports = notificationQueueEvents;