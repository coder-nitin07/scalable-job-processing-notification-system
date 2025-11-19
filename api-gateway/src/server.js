const app = require('./app');
const logger = require('../../shared/logger/logger');

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    logger.info(`API Gateway listening on PORT ${PORT}`);
});