const { model } = require("mongoose");
const { HoldingSchema } = require("../Schema/HoldingSchema");

const HoldingModel = model("holding", HoldingSchema);

module.exports = { HoldingModel };