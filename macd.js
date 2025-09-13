//@version=5
strategy("MACD Long Only", overlay=true,
     default_qty_type=strategy.cash,
     initial_capital=1000,
     currency=currency.USD)

macdFastLen  = input.int(12, title="MACD Fast Length")
macdSlowLen  = input.int(26, title="MACD Slow Length")
macdSignalLen = input.int(9, title="MACD Signal Length")

capitalPerc  = input.float(5, title="Capital % per Trade")
leverage     = input.float(50, title="Leverage")
sl_percent = (capitalPerc * 100) / leverage

// === MACD CALCULATION ===
[macdLine, signalLine, _] = ta.macd(close, macdFastLen, macdSlowLen, macdSignalLen)

// === ENTRY & EXIT CONDITIONS ===
longCondition  = ta.crossover(macdLine, signalLine)
exitCondition  = ta.crossunder(macdLine, signalLine)

// === POSITION SIZE ===
capitalToUse     = strategy.equity * (capitalPerc / 100)
leveragedCapital = capitalToUse * leverage
qty              = leveragedCapital / close

// === STRATEGY EXECUTION ===
if (longCondition)
    strategy.entry("Long-MACD", strategy.long, qty=qty)

if (longCondition)
    stopPrice = close * (1 - sl_percent / 100)
    strategy.exit("SL-MACD", from_entry="Long-MACD", stop=stopPrice)

if (exitCondition)
    strategy.close("Long-MACD")

// === PLOTTING ===
plot(macdLine, title="MACD Line", color=color.orange, linewidth=2)
plot(signalLine, title="Signal Line", color=color.blue, linewidth=2)
hline(0, "Zero Line", color=color.gray)