console.log('Running');

const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3002;
const { PositionsModel } = require("./Model/PositionsModel");
const { HoldingModel } = require("./Model/HoldingModel");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");

// ADD YAHOO FINANCE
const YahooFinance = require('yahoo-finance2').default;
const yahooFinance = new YahooFinance({
  suppressNotices: ['yahooSurvey']
});

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
app.use("/auth", authRoute);
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


let priceCache = {};
let lastPriceUpdate = 0;
const CACHE_DURATION = 30000; 


async function fetchLivePrices(symbols) {
  try {
    if (!symbols || symbols.length === 0) {
      return {};
    }

    console.log(symbols);
    const yahooSymbols = symbols.map(symbol => {
      const upperSymbol = symbol.toUpperCase();
      if (upperSymbol === 'SGBMAY29') return 'SGBMAY29.BO';
      return `${upperSymbol}.NS`;
    });

    console.log(`Fetching live prices for: ${symbols.join(', ')}`);
    const quotes = await yahooFinance.quote(yahooSymbols);

    const priceMap = {};
    quotes.forEach(quote => {
      const cleanSymbol = quote.symbol.replace('.NS', '').replace('.BO', '');
      priceMap[cleanSymbol] = {
        ltp: quote.regularMarketPrice || 0,
        change: quote.regularMarketChange || 0,
        changePercent: quote.regularMarketChangePercent || 0,
        dayHigh: quote.regularMarketDayHigh || 0,
        dayLow: quote.regularMarketDayLow || 0,
        volume: quote.regularMarketVolume || 0,
        previousClose: quote.regularMarketPreviousClose || 0,
        open: quote.regularMarketOpen || 0
      };
    });

    console.log(`Successfully fetched ${Object.keys(priceMap).length} stock prices`);
    return priceMap;

  } catch (error) {
    console.error('Yahoo Finance error:', error.message);
    return {};
  }
}


app.post("/getLivePrices", async (req, res) => {
  try {
    const { symbols, holdings } = req.body;

    if (!symbols || !Array.isArray(symbols) || symbols.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide an array of stock symbols'
      });
    }

    const now = Date.now();

    const livePrices = await fetchLivePrices(symbols);
    
    if (Object.keys(livePrices).length === 0) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch live prices'
      });
    }

    let enrichedHoldings = null;
    let summary = null;

    if (holdings && Array.isArray(holdings)) {
      enrichedHoldings = holdings.map(holding => {
        const liveData = livePrices[holding.name] || {};
        const livePrice = liveData.ltp || 0;
        
        // Calculate P&L
        const currentValue = holding.qty * livePrice;
        const invested = holding.qty * holding.avg;
        const pnl = currentValue - invested;
        const pnlPercent = invested > 0 ? ((pnl / invested) * 100).toFixed(2) : 0;
        
        return {
          name: holding.name,
          qty: holding.qty,
          avg: holding.avg,
          ltp: livePrice,
          currentValue: currentValue.toFixed(2),
          invested: invested.toFixed(2),
          pnl: pnl.toFixed(2),
          pnlPercent: pnlPercent,
          net: `${pnlPercent >= 0 ? '+' : ''}${pnlPercent}%`,
          day: `${liveData.changePercent >= 0 ? '+' : ''}${liveData.changePercent?.toFixed(2) || 0}%`,
          dayChange: liveData.changePercent || 0,
          isLoss: pnl < 0,
          dayHigh: liveData.dayHigh,
          dayLow: liveData.dayLow,
          volume: liveData.volume
        };
      });


      const totalInvested = enrichedHoldings.reduce((sum, h) => sum + parseFloat(h.invested), 0);
      const totalCurrent = enrichedHoldings.reduce((sum, h) => sum + parseFloat(h.currentValue), 0);
      const totalPnL = totalCurrent - totalInvested;
      const totalPnLPercent = totalInvested > 0 ? ((totalPnL / totalInvested) * 100).toFixed(2) : 0;

      summary = {
        totalInvested: totalInvested.toFixed(2),
        totalCurrent: totalCurrent.toFixed(2),
        totalPnL: totalPnL.toFixed(2),
        totalPnLPercent: totalPnLPercent
      };
    }

    res.json({
      success: true,
      prices: livePrices,
      holdings: enrichedHoldings,
      summary: summary,
      timestamp: now
    });

  } catch (error) {
    console.error('Error in /getLivePrices:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch live prices' 
    });
  }
});


app.get("/getLivePrices", async (req, res) => {
  try {
    const symbolsParam = req.query.symbols;

    if (!symbolsParam) {
      return res.status(400).json({
        success: false,
        error: 'Please provide symbols query parameter (comma-separated)'
      });
    }


    const symbols = symbolsParam.split(',').map(s => s.trim()).filter(Boolean);

    if (symbols.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid symbols provided'
      });
    }

    const now = Date.now();
    const cacheKey = symbols.sort().join(',');

    // Check cache
    if (priceCache[cacheKey] && now - lastPriceUpdate < CACHE_DURATION) {
      return res.json({
        success: true,
        prices: priceCache[cacheKey],
        timestamp: lastPriceUpdate,
        cached: true,
        cacheAge: Math.floor((now - lastPriceUpdate) / 1000)
      });
    }


    const livePrices = await fetchLivePrices(symbols);
    
    if (Object.keys(livePrices).length === 0) {
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch live prices'
      });
    }


    priceCache[cacheKey] = livePrices;
    lastPriceUpdate = now;

    res.json({
      success: true,
      prices: livePrices,
      timestamp: now,
      cached: false
    });

  } catch (error) {
    console.error('Error in /getLivePrices:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch live prices' 
    });
  }
});


app.get("/stockPrice/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const yahooSymbol = symbol === 'SGBMAY29' ? 'SGBMAY29.BO' : `${symbol}.NS`;
    
    const quote = await yahooFinance.quote(yahooSymbol);
    
    res.json({
      success: true,
      symbol,
      ltp: quote.regularMarketPrice,
      change: quote.regularMarketChange,
      changePercent: quote.regularMarketChangePercent,
      dayHigh: quote.regularMarketDayHigh,
      dayLow: quote.regularMarketDayLow,
      volume: quote.regularMarketVolume,
      open: quote.regularMarketOpen,
      previousClose: quote.regularMarketPreviousClose
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: 'Stock not found'
    });
  }
});

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

app.get("/addHoldings", async (req, res) => {
  let tempHolding = [
    { name: "BHARTIARTL", qty: 2, avg: 538.05, price: 541.15, net: "+0.58%", day: "+2.99%" },
    { name: "HDFCBANK", qty: 2, avg: 1383.4, price: 1522.35, net: "+10.04%", day: "+0.11%" },
    { name: "HINDUNILVR", qty: 1, avg: 2335.85, price: 2417.4, net: "+3.49%", day: "+0.21%" },
    { name: "INFY", qty: 1, avg: 1350.5, price: 1555.45, net: "+15.18%", day: "-1.60%", isLoss: true },
    { name: "ITC", qty: 5, avg: 202.0, price: 207.9, net: "+2.92%", day: "+0.80%" },
    { name: "KPITTECH", qty: 5, avg: 250.3, price: 266.45, net: "+6.45%", day: "+3.54%" },
    { name: "M&M", qty: 2, avg: 809.9, price: 779.8, net: "-3.72%", day: "-0.01%", isLoss: true },
    { name: "RELIANCE", qty: 1, avg: 2193.7, price: 2112.4, net: "-3.71%", day: "+1.44%" },
    { name: "SBIN", qty: 4, avg: 324.35, price: 430.2, net: "+32.63%", day: "-0.34%", isLoss: true },
    { name: "SGBMAY29", qty: 2, avg: 4727.0, price: 4719.0, net: "-0.17%", day: "+0.15%" },
    { name: "TATAPOWER", qty: 5, avg: 104.2, price: 124.15, net: "+19.15%", day: "-0.24%", isLoss: true },
    { name: "TCS", qty: 1, avg: 3041.7, price: 3194.8, net: "+5.03%", day: "-0.25%", isLoss: true },
    { name: "WIPRO", qty: 4, avg: 489.3, price: 577.75, net: "+18.08%", day: "+0.32%" },
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
        name, qty, avg: price, price,
        net: "0%", day: "0%",
      });
    } else {
      const qtyNum = Number(qty);
      const priceNum = Number(price);
      const totalQty = holding.qty + qtyNum;
      const newAvg = (holding.avg * holding.qty + priceNum * qtyNum) / totalQty;

      holding.qty = totalQty;
      holding.avg = newAvg;
      holding.price = priceNum;
    }

    await holding.save();
    res.json({ success: true, holding });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order failed" });
  }
});

app.post("/sellOrder", async (req, res) => {
  try {
    const { name, qty, price } = req.body;
    let holding = await HoldingModel.findOne({ name });

    if (!holding) {
      return res.status(404).json({ error: "No holding found" });
    }
    if (qty > holding.qty) {
      return res.status(400).json({ error: "Not enough quantity to sell" });
    }
    
    const remainingQty = holding.qty - qty;
    if (remainingQty === 0) {
      await HoldingModel.deleteOne({ name });
      return res.json({ success: true, message: "Holding sold completely" });
    }
    
    holding.qty = remainingQty;
    holding.price = price;
    await holding.save();
    res.json({ success: true, holding });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Sell order failed" });
  }
});

app.get("/addPositions", async (req, res) => {
  let tempPosition = [
    { product: "CNC", name: "EVEREADY", qty: 2, avg: 316.27, price: 312.35, net: "+0.58%", day: "-1.24%", isLoss: true },
    { product: "CNC", name: "JUBLFOOD", qty: 1, avg: 3124.75, price: 3082.65, net: "+10.04%", day: "-1.35%", isLoss: true },
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