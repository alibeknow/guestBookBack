import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import models from "../models";

const Users = models.User;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

// create jwt strategy
module.exports = async passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      let user = await Users.findAll({
        where: { id: jwt_payload.id }
      }).catch(err => console.log(err));
      if (!user) return done(null, false);
      if (user.length) {
        return done(null, user);
      }
      return done(null, false);
    })
  );
};
