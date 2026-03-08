const YahooFinance = require("yahoo-finance2").default;

const yahooFinance = new YahooFinance({
  suppressNotices: ["yahooSurvey"],
});

let priceCache = {};
let lastPriceUpdate = 0;
const CACHE_DURATION = 30000; 

async function fetchLivePrices  (symbols) {
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



async function getLivePricesPost (req, res)  {
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
};


async  function getLivePricesGet (req, res)  {
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
};


async function getSingleStockPrice(req, res) {
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
};

module.exports = {
  fetchLivePrices,
  getLivePricesPost,
  getLivePricesGet,
  getSingleStockPrice
};