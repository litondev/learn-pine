//@version=6
strategy("Example RSI strategy")
float rsi = ta.rsi(close, 14)
plot(rsi, "RSI", rsi >= 50 ? color.lime : color.fuchsia)
hline(50, "Middle line", linestyle = hline.style_solid)
plotshape(ta.crossover(rsi,  50), "Cross up",   shape.triangleup,   location.bottom, color.lime)
plotshape(ta.crossunder(rsi, 50), "Cross Down", shape.triangledown, location.top,    color.fuchsia)
barcolor(rsi >= 50 ? color.lime : color.fuchsia)

if ta.crossover(rsi,  50)
    strategy.entry("Long", strategy.long, comment = "Long")

if ta.crossunder(rsi,  50)
    strategy.entry("Short", strategy.short, comment = "Short")