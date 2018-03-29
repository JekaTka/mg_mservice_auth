const express = require('express');
const passport = require('passport');
const { AuthController } = require('../controllers');
const { AuthValidation } = require('../validations');
const validate = require('express-validation');

const router = express.Router();

router.route('/auth/register')
    .post(
      validate(AuthValidation.register),
      AuthController.register
    );

router.route('/auth/login')
  .post(
    validate(AuthValidation.login),
    passport.authenticate('local', { session: false }),
    AuthController.login
);

router.route('/auth/secure')
  .get(
    passport.authenticate('jwt', { session: false }),
    AuthController.secure
);

module.exports = router;
