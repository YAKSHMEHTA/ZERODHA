const User = require("../Model/UserModel");
const { createSecretToken } = require("../Util/SecretToken");
const bcrypt = require("bcryptjs");

moduel.exports.Signup = async (req, res, next) => {
  try {
    const { email, username, password, createdAt } = req.body;
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, username, password, createdAt });
    const token = createSecretToken(user.id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (err) {
    console.log(err);
  }
};
