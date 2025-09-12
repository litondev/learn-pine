//@version=5
indicator("MACD + EMA Cross Indicator", overlay=true)

// ========== INPUTS ==========
fastLen  = input.int(8,  "MACD Fast Length", minval=1)
slowLen  = input.int(18, "MACD Slow Length", minval=1)
sigLen   = input.int(5,  "MACD Signal Length", minval=1)
src      = input.source(close, "Source")

emaFastLen = input.int(50, "EMA Fast (Trend)")
emaSlowLen = input.int(150, "EMA Slow (Trend)")

// ========== MACD CALC ==========
fastEMA = ta.ema(src, fastLen)
slowEMA = ta.ema(src, slowLen)
macdLine = fastEMA - slowEMA
signalLine = ta.ema(macdLine, sigLen)

bullCross = (macdLine > signalLine and macdLine[1] <= signalLine[1])
bearCross = (macdLine < signalLine and macdLine[1] >= signalLine[1])

// ========== EMA FILTER ==========
ema50  = ta.ema(src, emaFastLen)
ema150 = ta.ema(src, emaSlowLen)

trendLong  = ema50 > ema150   // Golden cross
trendShort = ema50 < ema150   // Dead cross

// ========== PLOTS ==========
plot(ema50,  title="EMA 50", color=color.green, linewidth=2)
plot(ema150, title="EMA 150", color=color.red, linewidth=2)

// Plot sinyal BUY/SELL
plotshape(bullCross and trendLong, title="BUY Signal", text="BUY", style=shape.labelup, location=location.belowbar, color=color.green, textcolor=color.white, size=size.tiny)
plotshape(bearCross and trendShort, title="SELL Signal", text="SELL", style=shape.labeldown, location=location.abovebar, color=color.red, textcolor=color.white, size=size.tiny)
