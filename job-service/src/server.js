require('dotenv').config();
const createApp = require('./app');
const { initQueue } = require('./queues');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 4001;

async function start() {
  // initialize queues (connect to redis)
  await initQueue();

  const app = createApp();
  app.listen(PORT, () => logger.info(`Job Service listening on ${ PORT }`));
}


start().catch(err => {
  console.error('Failed to start job-service', err);
  process.exit(1);
});