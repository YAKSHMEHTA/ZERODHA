import { Model } from "mongoose";
const {PositionSchema} = require('../Schema/PositionSchema')

const PositionModel = new model("position",PositionSchema)

model.export = {PositionModel}