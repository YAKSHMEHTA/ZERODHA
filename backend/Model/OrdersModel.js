const {model} = require("mongoose")
const { OrdersSchema } = require("../Schema/OrdersSchema")

const OrdersModel =  model("holding",OrdersSchema)

module.exports={OrdersModel}