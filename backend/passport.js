const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(jwt_payload);
    if (jwt_payload.nombre == "Diego Andre Garcia Villegas") {
        return done(null, jwt_payload.nombre);
    }
    else {
        return done(null, false);
    }
}));

module.exports = passport;