const Express = require('express');
const BodyParser = require('body-parser');
const Helmet = require('helmet');
const { HealthCheckRouter } = require('./routers');
const { ErrorMiddleware } = require('./middlewares');

const app = Express();

// parse body params and attache them to req.body
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(Helmet());

// mount routes
app.use(HealthCheckRouter);

// if error is not an instanceOf APIError, convert it.
app.use(ErrorMiddleware.converter);

// catch 404 and forward to error handler
app.use(ErrorMiddleware.notFound);

// error handler, send stacktrace only during development
app.use(ErrorMiddleware.handler);

module.exports = app;
