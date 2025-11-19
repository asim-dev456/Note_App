const AuthModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// user signup

const userSignup = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await AuthModel.findOne({ email });
  if (user) {
    return res
      .status(409)
      .json({ message: "this email already in Use", success: false });
  } else {
    const AuthUser = new AuthModel({ username, email, password });

    AuthUser.password = await bcrypt.hash(password, 10);
    await AuthUser.save();
    res.status(201).json({ message: "You have Signup Successfully" });
  }
};

// user login

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await AuthModel.findOne({ email });

  if (!user) {
    return res
      .status(403)
      .json({ message: "email is incorrect", success: false });
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    return res
      .status(400)
      .json({ message: "password  is incorrect", success: false });
  }
  const jsonwebtoken = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  res
    .status(200)
    .json({
      message: "User logged in  Successfully",
      success: true,
      jsonwebtoken,
    });
};

module.exports = { userSignup, userLogin };
