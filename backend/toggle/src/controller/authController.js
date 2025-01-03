const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

//Handle errors
const handleErrors = (err) => {
  console.log(err);

  console.log(err.message, err.code);
  let errors = { username: "", email: "", password: "" };

  //incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }
  //incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }
  //duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }
  if (err.code === 12000) {
    errors.username = "That Username already exist";
    return errors;
  }

  //validation erros
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//create token
const maxAge = 3 * 24 * 60 * 60;

const jwtsecret = process.env.TOKEN_SECRET;

const createToken = (id) => {
  return jwt.sign({ id }, jwtsecret, {
    expiresIn: maxAge,
  });
};

const addUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      const user = await User.create({ username, email, password });
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res
        .status(201)
        .json({ userId: user._id, token: token, username: user.username });
    } else {
      const errors = handleErrors({ code: 12000 });
      res.status(400).json(errors);
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};
const getUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    console.log(user);

    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res
      .status(200)
      .json({ userId: user._id, token: token, username: user.username });
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);

    res.status(400).json(errors);
  }
};

const removeUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {
  addUser,
  getUser,
  removeUser,
};
