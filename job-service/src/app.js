const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const logger = require('../../shared/logger/logger');
const jobRouter = require('./routes/job.routes');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'job-service' });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// routes
app.use('/jobs', jobRouter);

module.exports = app;