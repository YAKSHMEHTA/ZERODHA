const router = require("express").Router();
const { HoldingModel } = require("../Model/HoldingModel");

// GET all holdings
router.get("/", async (req, res) => {
  try {
    let allHoldings = await HoldingModel.find({});
    res.json(allHoldings);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;