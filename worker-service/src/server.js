require('module-alias/register');

const app = require('./app');
const logger = require('@shared/logger/logger');

const PORT = process.env.PORT || 8003;

app.listen(PORT, () => {
  logger.info(`Worker Service running on PORT ${PORT}`);
});
