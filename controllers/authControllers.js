const User = require("../models/userModel");

exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const newUser = await User.create({ username, password });
    res.send("User has been signed up");
  } catch (err) {
    next(new Error("User create fail!"));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const curUser = await User.findOne({ username }).select("+password");

    if (!curUser) return next(new Error("Cannot find this user!"));

    if (curUser.correctPassword(password, curUser.password)) {
      req.session.isVerified = true;
      res.redirect("secret");
    } else return next(new Error("Password incorrect!"));
  } catch (err) {
    next(err);
  }
};

exports.protect = (req, res, next) => {
  if (req.session.isVerified) next();
  else next(new Error("403"));
};
