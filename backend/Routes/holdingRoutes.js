const router = require("express").Router();
const { HoldingModel } = require("../Model/HoldingModel");
const User = require("../Model/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");


// GET all holdings
router.get("/", async (req, res) => {
  console.log('coming');
  try {
    let w = await HoldingModel.find({});
    const token = req.cookies.token
    const decoded = jwt.verify(token,process.env.TOKEN_KEY)
    let id =decoded.id

    const user = await User.findById(id)
    const portfolio = user.portfolio;
    console.log(w);
    let userData = await User.find({});
    let allHoldings = userData[0].portfolio;
    
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;