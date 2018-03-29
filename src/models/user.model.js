const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const httpStatus = require('http-status');
const { APIError } = require('../../config/errors');

const schema = new Schema({
    nickname: {
      type: String,
      required: true,
      unique: false
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    salt: {
      type: String,
      required: false,
      select: false
    },
}, {
    versionKey: false,
    timestamps: true
});

schema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('password')) return next();

  user.salt = crypto.randomBytes(128).toString('base64');
  user.password = crypto.pbkdf2Sync(user.password, user.salt, 1, 128, 'sha1');
  next();
});


/**
 * Statics
 */
schema.statics = {
    /**
     * Compare passwords
     * @param {String} password
     * @param {Object} user
     *
     * @return {Boolean}
     */
    checkPassword (password, user) {
        return crypto.pbkdf2Sync(password, user.salt, 1, 128, 'sha1').toString() === user.password.toString();
    },

    /**
     * Return new validation error
     * if error is a mongoose duplicate key error
     *
     * @param {Error} error
     * @returns {Error|APIError}
     */
    checkDuplicateEmail(error) {
        if (error.code === 11000) {
            return new APIError({
                message: 'Validation Error',
                errors: [{
                    field: 'email',
                    location: 'body',
                    messages: ['"email" already exists'],
                }],
                status: httpStatus.CONFLICT,
                isPublic: true,
                stack: error.stack,
            });
        }
        return error;
    },
};


module.exports = mongoose.model('User', schema);
