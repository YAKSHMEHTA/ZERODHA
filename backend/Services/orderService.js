const { HoldingModel } = require("../Model/HoldingModel");


exports.sellOrder = async (name, qty, price) => {

  let holding = await HoldingModel.findOne({ name });

  if (!holding) {
    throw new Error("No holding found");
  }

  if (qty > holding.qty) {
    throw new Error("Not enough quantity to sell");
  }

  const remainingQty = holding.qty - qty;

  if (remainingQty === 0) {
    await HoldingModel.deleteOne({ name });
    return { message: "Holding sold completely" };
  }

  holding.qty = remainingQty;
  holding.price = price;

  await holding.save();

  return holding;
};



exports.newOrder = async (name, qty, price) => {

  let holding = await HoldingModel.findOne({ name });

  if (!holding) {

    holding = new HoldingModel({
      name,
      qty,
      avg: price,
      price,
      net: "0%",
      day: "0%"
    });

  } else {

    const qtyNum = Number(qty);
    const priceNum = Number(price);

    const totalQty = holding.qty + qtyNum;

    const newAvg =
      (holding.avg * holding.qty + priceNum * qtyNum) / totalQty;

    holding.qty = totalQty;
    holding.avg = newAvg;
    holding.price = priceNum;
  }

  await holding.save();

  return holding;
};