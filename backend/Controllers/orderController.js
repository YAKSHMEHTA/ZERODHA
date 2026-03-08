const { newOrder, sellOrder } = require("../Services/orderService");

exports.buyStock = async (req, res) => {
  try {
    const { name, qty, price } = req.body;

    const order = await newOrder(name, qty, price);

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


exports.sellStock = async (req, res) => {
  try {
    const { name, qty, price } = req.body;

    const order = await sellOrder(name, qty, price);

    res.json({
      success: true,
      data: order
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};