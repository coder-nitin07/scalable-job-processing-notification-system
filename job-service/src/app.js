const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const notFoundMiddleware = require('./middlewares/notFound.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

function createApp(){
  const app = express();
  app.use(cors);
  app.use(express.json({ limit: 'Job' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  app.use('/api', routes);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  app.get('/', (req, res) => res.json({ ok: true, service: 'job-service' }));
  return app;
}

module.exports = createApp;