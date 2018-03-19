const { ValidationError } = require('express-validation');
const httpStatus = require('http-status');
const { APIError } = require('../../config/errors');
const { env } = require('../../config/vars');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res, next) => {
    const response = {
        code: err.status,
        message: err.message || httpStatus[err.status],
        errors: err.errors,
        stack: err.stack,
    };

    if (env !== 'development') {
        delete response.stack;
    }

    res.status(err.status);
    res.json(response);
    res.end();
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
const converter = (err, req, res, next) => {
    let convertedError = err;
    if (err instanceof ValidationError) {
        convertedError = new APIError({
            message: 'Validation error!',
            errors: err.errors,
            status: err.status,
            stack: err.stack,
        });
    } else if (!(err instanceof APIError)) {
        convertedError = new APIError({
            message: err.message,
            status: err.status,
            stack: err.stack,
        });
    }

    return handler(convertedError, req, res);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
const notFound = (req, res, next) => {
    const err = new APIError({
        message: 'Not found',
        status: httpStatus.NOT_FOUND,
    });
    return handler(err, req, res);
};

module.exports = { handler, converter, notFound };
