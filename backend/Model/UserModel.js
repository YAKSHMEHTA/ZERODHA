const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true
  },

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },

  balance: {
    type: Number,
    default: 100000, 
  },

  portfolio: [
    {
      stockSymbol: String,
      quantity: Number,
      avgPrice: Number
    }
  ],

  watchlist: [
    {
      stockSymbol: String
    }
  ],

  transactions: [
    {
      stockSymbol: String,
      type: {
        type: String,
        enum: ["BUY", "SELL"]
      },
      quantity: Number,
      price: Number,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  createdAt: {
    type: Date,
    default: Date.now
  }

});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;  
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);