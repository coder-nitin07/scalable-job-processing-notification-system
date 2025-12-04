const morgan = require('morgan');
const logger = require('../config/logger');

const morganMiddleware = morgan(
    `:method :url :status :response-time ms`,
    {
        stream: {
            write: (message) => logger.info(message.trim())
        }
    }
);

module.exports = morganMiddleware;