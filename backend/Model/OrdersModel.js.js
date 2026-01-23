const {model} = require("mongoose")
const { OrdersSchema } = require("../Schema/OrdersSchema")

const OrdersModel = new model("holding",OrdersSchema)

model.exports={OrdersModel}