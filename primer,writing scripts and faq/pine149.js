//@version=6
indicator("Example RSI indicator")
float rsi = ta.rsi(close, 14)
plot(rsi, "RSI", rsi >= 50 ? color.lime : color.fuchsia)
hline(50, "Middle line", linestyle = hline.style_solid)
plotshape(ta.crossover(rsi,  50), "Cross up",   shape.arrowup,   location.bottom, color.lime)
plotshape(ta.crossunder(rsi, 50), "Cross Down", shape.arrowdown, location.top,    color.fuchsia)
barcolor(rsi >= 50 ? color.lime : color.fuchsia)