const express = require('express');
const app = express();

const cors = require('cors');
const morgan = require('morgan');
const logger = require('../../shared/logger/logger');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'worker-service' });
});

app.use((err, req, res, nexr) => {
  logger.error(err);
  res.status(500).json({ error: 'Worker service error' });
});

module.exports = app;