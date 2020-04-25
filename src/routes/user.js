import passport from "passport";
import config from "../config/config";
import { allowOnly } from "../services/routesHelper";
import { create, login, findAllUsers, findById } from "../controllers/user";

module.exports = app => {
  // create a new user
  app.post(
    "/api/users/register",
    //passport.authenticate("jwt", { session: false }),
    create
  );

  // user login
  app.post("/api/users/login", login);

  //retrieve all users
  app.get(
    "/api/users",
    passport.authenticate("jwt", {
      session: false
    }),
    findAllUsers
  );

  // retrieve user by id
  app.get(
    "/api/users/:userId",
    passport.authenticate("jwt", {
      session: false
    }),
    allowOnly(config.accessLevels.admin, findById)
  );
};
