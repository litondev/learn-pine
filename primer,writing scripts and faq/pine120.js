//@version=6
indicator("Plot array elements")
array<float> ohlc = array.from(open, high, low, close)
plot(ohlc.get(0), "Open",  color.red)
plot(ohlc.get(1), "High",  color.yellow)
plot(ohlc.get(2), "Low",   color.blue)
plot(ohlc.get(3), "Close", color.green)