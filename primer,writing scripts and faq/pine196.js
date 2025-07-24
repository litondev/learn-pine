//@version=6
indicator("Reset sum on condition example", overlay = false)
const color TEAL = color.new(color.teal, 50)
const color RED  = color.new(color.red,  50)
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)
bool crossUp = ta.crossover(macdLine,  signalLine)
bool crossDn = ta.crossunder(macdLine, signalLine)
bool doReset = crossUp or crossDn
var float cumulativeVolume = na
cumulativeVolume += volume  // On every bar, we sum the volume.
cumulativeVolume := doReset ? 0. : cumulativeVolume  // But when we get a cross, we reset it to zero.
plot(cumulativeVolume, "Cumulative volume", close >= open ? TEAL : RED, 1, plot.style_columns)
plotshape(crossUp, "crossDn", shape.arrowup,   location.top, color.lime)
plotshape(crossDn, "crossUp", shape.arrowdown, location.top, color.fuchsia)