const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { jwtSecret } = require('../../config/vars');

const signToken = async (userId) => jwt.sign({ id: userId }, jwtSecret);

const register = async (req, res, $next) => {
    try {
        const user = await User.create(req.body),
            token = await signToken(user.id);

        res.json({ user, token });
    } catch (err) {
        return $next(User.checkDuplicateEmail(err));
    }
}

const login = async (req, res, $next) => {
  try {
    const token = await signToken(req.user.id);
    res.json({ token });
  } catch (err) {
      return $next(err);
  }
}

const secure = (req, res) => res.send('OK');

module.exports = {
  register,
  login,
  secure,
};
