console.log('Running');

const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;
const { PositionsModel } = require("./Model/PositionsModel");
const { HoldingModel } = require("./Model/HoldingModel");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const holdingRoutes = require("./Routes/holdingRoutes")
const authRoute = require("./Routes/AuthRoute");
const orderRoutes = require("./Routes/orderRoutes")
const stockRoutes = require("./Routes/stockRoutes")
const User = require("./Model/UserModel")


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://zerodha-zkum.vercel.app",
    "https://zerodha-b9kl.vercel.app",
    "https://zerodha-b9kl-172038azf-yakshvardhansinghmehta-2728s-projects.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
console.log('authRoute:', typeof authRoute);
console.log('holdingRoutes:', typeof holdingRoutes);
console.log('orderRoutes:', typeof orderRoutes);
console.log('stockRoutes:', typeof stockRoutes);
const { getLivePricesPost } = require("./Services/yahooFinanceService");


app.post("/getLivePrices", getLivePricesPost);


app.use("/auth", authRoute);
app.use("/holdings", holdingRoutes);
app.use("/orders", orderRoutes);
app.use("/stocks", stockRoutes);




app.post('/add',async(req,res)=>{
  const {name,qty,price} = req.body
  console.log('req');
  console.log(req.body)
  console.log(qty);
  console.log(price);
  
  const token = req.cookies.token
  if(!token){
    console.log('notoken');
    return;
  }

  try{
    const decoded = jwt.verify(token,process.env.TOKEN_KEY)
    req.user = decoded
    const id = req.user.id
    let user = await User.findOne({_id:id})
    user.portfolio.push({
      stockSymbol: name,
      quantity: qty,
      avgPrice: price
    })
    user.save();
  }catch(e){
    console.log(e);
  }

})

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log(`\n Server running on port ${PORT}`);
      console.log(`Live Stock Price API ready`);
      console.log(`POST http://localhost:${PORT}/getLivePrices`);
      console.log(`GET  http://localhost:${PORT}/getLivePrices?symbols=INFY,TCS,RELIANCE\n`);
    });
  })
  .catch((err) => console.error(err));

