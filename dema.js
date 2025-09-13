//@version=5
strategy("DEMA Long Only (20 / 50)", overlay=true,
     default_qty_type=strategy.cash,
     initial_capital=1000,
     currency=currency.USD)
     
demaFastLen  = input.int(20, title="DEMA Fast")
demaSlowLen  = input.int(50, title="DEMA Slow")

capitalPerc  = input.float(5, title="Capital % per Trade")
leverage     = input.float(50, title="Leverage")
sl_percent = (capitalPerc * 100) / leverage
// startDate     = input.time(timestamp("2019-01-01 00:00:00"), title="Start Date Filter")

// isInDateRange = time >= startDate

// === DEMA CALCULATION ===
dema(src, length) =>
    ema1 = ta.ema(src, length)
    ema2 = ta.ema(ema1, length)
    2 * ema1 - ema2

fastDEMA = dema(close, demaFastLen)
slowDEMA = dema(close, demaSlowLen)

// === ENTRY & EXIT CONDITIONS ===
longCondition = ta.crossover(fastDEMA, slowDEMA)
exitCondition = ta.crossunder(fastDEMA, slowDEMA)

// === POSITION SIZE ===
capitalToUse = strategy.equity * (capitalPerc / 100)
leveragedCapital = capitalToUse * leverage
qty = leveragedCapital / close

// === STRATEGY EXECUTION ===
// and isInDateRange
if (longCondition)
    strategy.entry("Long-1", strategy.long, qty=qty)

// === STOP LOSS ===
// and isInDateRange
if (longCondition)
    stopPrice = close * (1 - sl_percent / 100)
    strategy.exit("SL-1", from_entry="Long-1", stop=stopPrice)

// === EXIT ON CROSSDOWN ===
// and isInDateRange
if (exitCondition)
    strategy.close("Long-1")

// === PLOTTING ===
plot(fastDEMA, title="DEMA Fast (20)", color=color.orange)
plot(slowDEMA, title="DEMA Slow (50)", color=color.blue)