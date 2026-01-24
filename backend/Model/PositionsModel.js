const mongoose = require("mongoose");
const { PositionsSchema } = require("../Schema/PositionsSchema");

const PositionsModel = mongoose.model("position", PositionsSchema);

module.exports = { PositionsModel };