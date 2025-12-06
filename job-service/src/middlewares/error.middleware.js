const logger = require("../utils/logger");

const errorMiddleware = (err, req, res, next)=>{
    logger.error(err);

    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    res.status(status).json({ error: message });
};