const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const createApp = () =>{
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
};

module.exports = createApp;