require('module-alias/register');

const app = require('./app');
const logger = require('@shared/logger/logger');

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  logger.info(`Job Service running on PORT ${PORT}`);
});
