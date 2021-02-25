'use strict';

// Start up DB Server
require('dotenv').config();

const server = require('./src/server.js');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

// Start the web server
mongoose.connect(process.env.MONGODB_URI, options)
  .then(() => {
    server.start(PORT);
  })
  .catch(e => console.error('Could not start server', e.message));