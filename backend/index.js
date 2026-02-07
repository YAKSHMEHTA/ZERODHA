console.log('Running');

const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const { PositionsModel } = require("./Model/PositionsModel");
const { HoldingModel } = require("./Model/HoldingModel");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3001","zerodha-zkum-pv2p938cg-yakshvardhansinghmehta-2728s-projects.vercel.app","https://zerodha-zkum.vercel.app","http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/auth", authRoute);
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
  })
  .catch((err) => console.error(err));

app.get("/addHoldings", async (req, res) => {
  let tempHolding = [
    {
      name: "BHARTIARTL",
      qty: 2,
      avg: 538.05,
      price: 541.15,
      net: "+0.58%",
      day: "+2.99%",
    },
    {
      name: "HDFCBANK",
      qty: 2,
      avg: 1383.4,
      price: 1522.35,
      net: "+10.04%",
      day: "+0.11%",
    },
    {
      name: "HINDUNILVR",
      qty: 1,
      avg: 2335.85,
      price: 2417.4,
      net: "+3.49%",
      day: "+0.21%",
    },
    {
      name: "INFY",
      qty: 1,
      avg: 1350.5,
      price: 1555.45,
      net: "+15.18%",
      day: "-1.60%",
      isLoss: true,
    },
    {
      name: "ITC",
      qty: 5,
      avg: 202.0,
      price: 207.9,
      net: "+2.92%",
      day: "+0.80%",
    },
    {
      name: "KPITTECH",
      qty: 5,
      avg: 250.3,
      price: 266.45,
      net: "+6.45%",
      day: "+3.54%",
    },
    {
      name: "M&M",
      qty: 2,
      avg: 809.9,
      price: 779.8,
      net: "-3.72%",
      day: "-0.01%",
      isLoss: true,
    },
    {
      name: "RELIANCE",
      qty: 1,
      avg: 2193.7,
      price: 2112.4,
      net: "-3.71%",
      day: "+1.44%",
    },
    {
      name: "SBIN",
      qty: 4,
      avg: 324.35,
      price: 430.2,
      net: "+32.63%",
      day: "-0.34%",
      isLoss: true,
    },
    {
      name: "SGBMAY29",
      qty: 2,
      avg: 4727.0,
      price: 4719.0,
      net: "-0.17%",
      day: "+0.15%",
    },
    {
      name: "TATAPOWER",
      qty: 5,
      avg: 104.2,
      price: 124.15,
      net: "+19.15%",
      day: "-0.24%",
      isLoss: true,
    },
    {
      name: "TCS",
      qty: 1,
      avg: 3041.7,
      price: 3194.8,
      net: "+5.03%",
      day: "-0.25%",
      isLoss: true,
    },
    {
      name: "WIPRO",
      qty: 4,
      avg: 489.3,
      price: 577.75,
      net: "+18.08%",
      day: "+0.32%",
    },
  ];

  tempHolding.forEach((item) => {
    let newHolding = new HoldingModel({
      name: item.name,
      qty: item.qty,
      avg: item.avg,
      price: item.price,
      net: item.net,
      day: item.day,
    });
    newHolding.save();
  });
  res.send("done");
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price } = req.body;

    let holding = await HoldingModel.findOne({ name });

    
    if (!holding) {
      holding = new HoldingModel({
        name,
        qty,
        avg: price,
        price,
        net: "0%",
        day: "0%",
      });
    } 
    
    else {
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

    res.json({
      success: true,
      holding,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order failed" });
  }
});

app.post("/sellOrder",async(req,res)=>{
  try{
    const{name,qty,price} = req.body
    let holding = await HoldingModel.findOne({name})

    if(!holding){
      return res.status(404).json({ error: "No holding found" });
    }
    if (qty > holding.qty) {
      return res.status(400).json({ error: "Not enough quantity to sell" });
    }
    const remainingQty = holding.qty - qty;
    if(remainingQty === 0){
      if(qty>holding.qty) return
      await HoldingModel.deleteOne({ name });
      return res.json({ success: true, message: "Holding sold completely" });
    }
    holding.qty = remainingQty;
    holding.price = price;
    await holding.save()
  }catch(err){
    console.log(err);
  }
  res.json({okay:"sent"})
})


app.get("/addPositions", async (req, res) => {
  let tempPosition = [
    {
      product: "CNC",
      name: "EVEREADY",
      qty: 2,
      avg: 316.27,
      price: 312.35,
      net: "+0.58%",
      day: "-1.24%",
      isLoss: true,
    },
    {
      product: "CNC",
      name: "JUBLFOOD",
      qty: 1,
      avg: 3124.75,
      price: 3082.65,
      net: "+10.04%",
      day: "-1.35%",
      isLoss: true,
    },
  ];

  tempPosition.forEach((item) => {
    let newPosition = new PositionsModel({
      product: item.product,
      name: item.name,
      qty: item.qty,
      avg: item.avg,
      price: item.price,
      net: item.net,
      day: item.day,
      isLoss: item.isLoss,
    });
    newPosition.save();
  });
  res.send("position Saved");
});



app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingModel.find({});
  res.json(allHoldings);
});

app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});
