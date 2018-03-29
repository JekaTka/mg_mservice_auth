const { Strategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const { User } = require('../src/models');
const { jwtSecret } = require('./vars');


const jwtOptions = {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwt = new Strategy(jwtOptions, async (payload, done) => {
    try {
      const _id = mongoose.Types.ObjectId(payload.id);
      const user = await User.findOne({ _id });

      if (user) return done(null, user);

      return done(null, false);
    } catch (error) {
        return done(error, false);
    }
});

const local = new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email }).select('+salt +password');

        if (!user) return done(null, false);

        const isMatch = await User.checkPassword(password, user)

        if (!isMatch) return done(null, false);

        done(null, user);
    } catch (error) {
        done(error, false)
    }
});

module.exports = { jwt, local };
