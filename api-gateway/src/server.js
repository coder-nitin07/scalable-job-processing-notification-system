require('dotenv').config();

const createApp = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 4000;
const app = createApp();

app.listen(PORT, ()=>{
    logger.info(`API Gateway listening on PORT ${ PORT }`);
});