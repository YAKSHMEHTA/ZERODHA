const User = require("../Model/UserModel");
const { createSecretToken } = require("../Util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    console.log("SIGNUP HIT", req.body);

    const { email, username, password, createdAt } = req.body;
    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, username, password, createdAt });
    const token = createSecretToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
  } catch (err) {
    console.log(err);
  }
};
