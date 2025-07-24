//@version=6
indicator("Array elements in a label", overlay = true)

var array<float> crossPrices = array.new<float>(4)

float fastMa = ta.ema(close, 9)
float slowMa = ta.ema(close, 21)

if ta.cross(fastMa, slowMa)
    crossPrices.push(close)
    crossPrices.shift()
    label.new(bar_index, high, str.tostring(crossPrices), textcolor = color.white)

plot(fastMa, "Fast MA", color.aqua)
plot(slowMa, "Slow MA", color.orange)