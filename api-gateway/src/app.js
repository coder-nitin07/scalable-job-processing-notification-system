const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const { route } = require('./routes');
const notfoundMiddleware = require('./middlewares/notfound.middleware');
const errorMiddleware = require('./middlewares/error.middleware');

const createApp = () =>{
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // routes
  app.use('/api', route);

  // error handler
  app.use(notfoundMiddleware);
  app.use(errorMiddleware);

  // test route
  app.get('/', (req, res)=>{
    res.json({ ok: true, service: 'api-gateway' });
  });

};

module.exports = createApp;