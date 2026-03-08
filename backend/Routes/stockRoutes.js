const router = require("express").Router();
const { 
  getLivePricesPost,
  getLivePricesGet,
  getSingleStockPrice
} = require("../Services/yahooFinanceService");

router.post("/live-prices", getLivePricesPost);
router.get("/live-prices", getLivePricesGet);
router.get("/price/:symbol", getSingleStockPrice);

module.exports = router;