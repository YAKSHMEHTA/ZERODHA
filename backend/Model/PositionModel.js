import { Model } from "mongoose";
const {PositionSchema} = require('../Schema/PositionSchema')

const PositionModel =  model("position",PositionSchema)

model.export = {PositionModel}