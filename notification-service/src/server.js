require('module-alias/register');

const app = require('./app');
const logger = require('@shared/logger/logger');

const PORT = process.env.PORT || 8002;

app.listen(PORT, () => {
  logger.info(`Notification Service running on PORT ${PORT}`);
});
