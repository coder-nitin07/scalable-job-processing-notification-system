const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const logger = require('../../shared/logger/logger');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// test route
app.get('/health', (req, res)=>{
    res.json({ status: 'ok', service: 'api-gateway' });
});

// route handler
app.use((err, req, res, next)=>{
    logger.error(err.stack || err.message || err);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;