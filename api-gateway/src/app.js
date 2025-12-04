const express = require('express');
const app = express();
const { logger, morganStream } = require('./config/logger');
const rateLimiter = require('./middlewares/rateLimiter');

const morgan = require('morgan');
const cors = require('cors');
const authMiddleware = require('./middlewares/auth');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// morgan + winston
app.use(
  morgan(':method :url :status :response-time ms', { stream: morganStream })
);

// rate limiter
app.use(rateLimiter(100, 60));

// test route
app.get('/health', (req, res)=>{
    res.json({ status: 'ok', service: 'api-gateway' });
});

// route handler
app.use((err, req, res, next)=>{
    logger.error(err.stack || err.message || err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// routes
app.use('/jobs', authMiddleware, jobRoutes);
app.use('/notifications', authMiddleware, notificationRoutes);

module.exports = app;