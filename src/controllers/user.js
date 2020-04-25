import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import db from "../models";
const { User, Post } = db;

// load input validation
import validateRegisterForm from "../validation/register";
import validateLoginForm from "../validation/login";

// create user
const create = async (req, res) => {
  const { errors, isValid } = validateRegisterForm(req.body);
  let { username, password } = req.body;
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let user = await User.findAll({ where: { username } });
  if (user.length) {
    return res.status(400).json({ email: "Email already exists!" });
  } else {
    let newUser = {
      username,
      password
    };
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        try {
          let user = await User.create(newUser);
          res.json({ user });
        } catch (error) {
          res.status(500).json({ err });
        }
      });
    });
  }
};
// fetch all users
const findAllUsers = async (req, res) => {
  try {
    let user = await User.findAll({ attributes: ["id", "username"] });

    res.json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
};
const login = async (req, res) => {
  const { errors, isValid } = validateLoginForm(req.body);
  let user = {};
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;
  try {
    user = await User.findAll({
      where: {
        username
      }
    });
  } catch (err) {
    res.status(500).json({ err });
  }

  //check for user
  if (!user.length) {
    errors.username = "User not found!";
    return res.status(404).json(errors);
  }

  const originalPassword = user[0].dataValues.password;

  //check for password
  const isMatch = await bcrypt
    .compare(password, originalPassword)
    .catch(err => console.log(err));
  if (isMatch) {
    // user matched
    console.log("matched!");
    const { id, username } = user[0].dataValues;
    const payload = { id, username }; //jwt payload
    // console.log(payload)

    const token = await jwt.sign(payload, "secret", {
      expiresIn: 3600
    });

    res.json({
      success: true,
      token: "Bearer " + token,
      role: user[0].dataValues.role
    });
  } else {
    errors.password = "Password not correct";
    return res.status(400).json(errors);
  }
};

// fetch user by userId
const findById = (req, res) => {
  const id = req.params.userId;

  User.findAll({ where: { id }, fields: ["id", "username"] })
    .then(user => {
      if (!user.length) {
        return res.json({ msg: "user not found" });
      }
      res.json({ user });
    })
    .catch(err => res.status(500).json({ err }));
};

const findAllPaginatioon = (req, res) => {
  let { firstname, lastname, username, email, password } = req.body;
  User.findAndCountAll({
    include: [Post],
    where: req.body,
    attributes: ["id", "username"],
    limit: limit,
    offset: offset
  });
};

export { create, login, findAllPaginatioon, findAllUsers };
