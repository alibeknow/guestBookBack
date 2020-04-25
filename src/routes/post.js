import passport from "passport";
import config from "../config/config";
import { allowOnly } from "../services/routesHelper";
import {
  create,
  findAllPaginatioon,
  findById,
  deletePost,
  countPosts
} from "../controllers/post";

module.exports = app => {
  // create a new user
  app.post(
    "/api/posts/new",
    passport.authenticate("jwt", { session: false }),
    create
  );
  app.get(
    "/api/posts/count",
    //passport.authenticate("jwt", { session: false }),
    countPosts
  );
  app.get(
    "/api/posts/:page",
    passport.authenticate("jwt", { session: false }),
    findAllPaginatioon
  );

  app.get(
    "/api/posts/",
    passport.authenticate("jwt", { session: false }),
    findAllPaginatioon
  );

  // retrieve user by id
  app.get(
    "/api/posts/:postId",
    passport.authenticate("jwt", {
      session: false
    }),
    findById
  );
  app.delete(
    "/api/posts/:postId",
    passport.authenticate("jwt", {
      session: false
    }),
    deletePost
  );
};
