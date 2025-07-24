//@version=6
indicator("Previous and current day open using `timeframe`", "", true, timeframe = "1D", timeframe_gaps = true)

plot(open[1], "Yesterday's Open", color.red,   2, plot.style_line)
plot(open,    "Today's Open",     color.green, 2, plot.style_line)