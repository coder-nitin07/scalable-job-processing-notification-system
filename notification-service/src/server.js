require('module-alias/register');

const app = require('./app');
const logger = require('@shared/logger/logger');
const { processPendingNotifications } = require('./services/notificationSender');

const PORT = process.env.PORT || 8002;
setInterval(processPendingNotifications, 5000);

app.listen(PORT, () => {
  logger.info(`Notification Service running on PORT ${PORT}`);
});
