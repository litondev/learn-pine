// TF 1D
    // BTC
    // ETH
    // SOL 
    // BONK 
    // NASDAQ
    // S&P 
// TF 4H
    // BTC
    // ETH
    // SOL 
    // S&P 
// TF 1H
    // BTC
    // ETH
    // SOL
    // BONK 
    // S&P 
// TF 15M
    // BTC 
    // ETH 
    // SOL 
    // BONK 
    // POP
// TF 5M
    // ETH
    // S&P
    
//@version=5
strategy("Stochastic RSI Long Only", overlay=true,
     default_qty_type=strategy.cash,
     initial_capital=1000,
     currency=currency.USD)

rsiLength      = input.int(14, title="RSI Length")
stochLength    = input.int(14, title="Stoch Length")
kSmooth        = input.int(3, title="%K Smoothing")
dSmooth        = input.int(3, title="%D Smoothing")
overbought     = input.int(80, title="Overbought Level")
oversold       = input.int(20, title="Oversold Level")

capitalPerc    = input.float(5, title="Capital % per Trade")
leverage       = input.float(50, title="Leverage")
sl_percent = (capitalPerc * 100) / leverage

// === CALCULATION: STOCH RSI ===
rsi = ta.rsi(close, rsiLength)
rsiLowest = ta.lowest(rsi, stochLength)
rsiHighest = ta.highest(rsi, stochLength)

stochRSI = (rsi - rsiLowest) / (rsiHighest - rsiLowest)
k = ta.sma(stochRSI * 100, kSmooth)
d = ta.sma(k, dSmooth)

// === ENTRY & EXIT CONDITIONS ===
longCondition = ta.crossover(k, oversold)
exitCondition = ta.crossunder(k, overbought)

// === POSITION SIZE ===
capitalToUse     = strategy.equity * (capitalPerc / 100)
leveragedCapital = capitalToUse * leverage
qty              = leveragedCapital / close

// === STRATEGY EXECUTION ===
if (longCondition)
    strategy.entry("Long-StochRSI", strategy.long, qty=qty)

if (longCondition)
    stopPrice = close * (1 - sl_percent / 100)
    strategy.exit("SL-StochRSI", from_entry="Long-StochRSI", stop=stopPrice)

if (exitCondition)
    strategy.close("Long-StochRSI")

// === PLOT STOCH RSI ===
plot(k, title="%K", color=color.blue)
plot(d, title="%D", color=color.orange)
hline(overbought, "Overbought", color=color.red)
hline(oversold, "Oversold", color=color.green)