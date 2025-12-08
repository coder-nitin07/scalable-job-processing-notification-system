const prisma = require("@src/config/prisma");
const logger = require("@shared/logger");

async function sendEmailMock(to, title, body) {
  logger.info(`Mock email sent to ${to}: ${ title }`);
  return true;
}

async function processPendingNotifications() {
  logger.info("Checking for pending notifications...");

  // Fetch pending notifications
  const pendingList = await prisma.notification.findMany({
    where: { status: "PENDING" },
    take: 10, // batch size
  });

  if (pendingList.length === 0) {
    logger.info("No pending notifications.");
    return;
  }

  logger.info(`Found ${pendingList.length} pending notifications`);

  for (const notif of pendingList) {
    try {
      // For now: mock send (no real email yet)
      await sendEmailMock("test@example.com", notif.title, notif.body);

      // Update status → SENT
      await prisma.notification.update({
        where: { id: notif.id },
        data: {
          status: "SENT",
          attempts: notif.attempts + 1,
          sentAt: new Date(),
        },
      });

      logger.info(`Notification ${ notif.id } marked as SENT`);
    } catch (err) {
      logger.error(`Failed to send notification ${ notif.id }`, err);

      await prisma.notification.update({
        where: { id: notif.id },
        data: {
          status: "FAILED",
          attempts: notif.attempts + 1,
        },
      });
    }
  }
}

module.exports = { processPendingNotifications };