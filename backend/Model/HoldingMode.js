const {model} = require("mongoose")
const { HoldingSchema } = require("../Schema/HoldingSchema")

const HoldingModel = new Model("holding",HoldingSchema)

model.exports={HoldingModel}
