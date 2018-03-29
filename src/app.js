const Express = require('express');
const BodyParser = require('body-parser');
const Helmet = require('helmet');
const passport = require('passport');
const strategies = require('../config/passport');
const { HealthCheckRouter, AuthRouter } = require('./routers');
const { ErrorMiddleware } = require('./middlewares');
const mongoose = require('../config/mongoose');


// open mongoose connection
mongoose.connect();

const app = Express();

// parse body params and attache them to req.body
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(Helmet());

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);
passport.use('local', strategies.local);

// mount routes
app.use(HealthCheckRouter);
app.use(AuthRouter);

// if error is not an instanceOf APIError, convert it.
app.use(ErrorMiddleware.converter);

// catch 404 and forward to error handler
app.use(ErrorMiddleware.notFound);

// error handler, send stacktrace only during development
app.use(ErrorMiddleware.handler);

module.exports = app;
