const router = require("express").Router();
const orderController = require("../Controllers/orderController");


router.post("/buy", orderController.buyStock);


router.post("/sell", orderController.sellStock);
console.log(orderController);
module.exports = router;