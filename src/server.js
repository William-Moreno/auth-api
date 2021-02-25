'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorHandlerAuth = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes.js');
const logger = require('./middleware/logger.js');

const v1Routes = require('./routes/v1.js');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use(authRoutes);
app.use('/api/v1', v1Routes);

// app.use('*', notFoundHandler);
// app.use(errorHandler);
app.use(notFound);
app.use(errorHandlerAuth);

module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
