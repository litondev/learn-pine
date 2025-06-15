//@version=6
indicator("Save a value when an event occurs", "", true)
float hiHi = ta.highest(high, 5)[1]
var float priceAtCross = na
if ta.crossover(close, hiHi)  // When a crossover occurs, assign the current close price to `priceAtCross`.
    priceAtCross := close
plot(hiHi)
plot(priceAtCross, "Price At Cross", color.orange, 3, plot.style_circles)