import bcrypt from "bcryptjs";
import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Your email is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Your username is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const userModel = new model("user", userSchema);
module.exports = { userModel };
