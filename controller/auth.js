const User = require("../models/user");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const result = env.config();
env.config();
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (
      req.body.firstName == null ||
      req.body.lastName == null ||
      req.body.email == null ||
      req.body.password == null
    ) {
      res.status(400).json({
        message: "wrong input"
      });
    } else {
      if (user)
        return res.status(400).json({
          message: "user already registered"
        });
    }

    const { firstName, lastName, email, password } = req.body;

    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString()
    });
    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: `${error}`
        });
      }

      if (data) {
        return res.status(201).json({
          msg: "registered"
        });
      }
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(401).json({ error });
    if (user) {
      if (user.authenticate(req.body.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d"
        });
        const { _id, firstname, lastname, email, rootpower, username } = user;
        res.status(200).json({
          token,
          user: { _id, firstname, lastname, email, rootpower, username }
        });
      } else {
        return res.status(400).json({
          msg: "invalid pass"
        });
      }
    } else if (user.length > 1) {
      return res.status(401).json({
        message: "auth failed"
      });
    } else {
      return res.status(401).json({ error });
    }
  });
};
