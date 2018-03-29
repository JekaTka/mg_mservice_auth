const Joi = require('joi');

const register = {
    body: {
      email: Joi.string().required().email(),
      nickname: Joi.string().required().min(4),
      password: Joi.string().required().min(6),
    }
};

const login = {
    body: {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
    }
};

module.exports = { register, login };
