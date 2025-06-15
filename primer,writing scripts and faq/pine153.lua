//@version=6
strategy("Multiple exit demo", overlay = true)

int exitPercentInput = input.int(1, "Exit %", minval = 1, maxval = 99)
float exitPercent = exitPercentInput / 100

//@variable Is `true` on every 100th bar.
bool buyCondition = bar_index % 100 == 0

var float stopLoss1 = na, var float takeProfit1 = na  // Exit levels for `Exit1`
var float stopLoss2 = na, var float takeProfit2 = na  // Exit levels for `Exit2`

// Place orders when `buyCondition` is true and we are not in a position.
if buyCondition and strategy.position_size == 0.0
    stopLoss1 := close * (1 - exitPercent), takeProfit1 := close * (1 + exitPercent)  // Update the levels based on the current price
    stopLoss2 := close * (1 - (2 * exitPercent)), takeProfit2 := close * (1 + (2 * exitPercent))
    strategy.entry("Buy", strategy.long, qty = 2)
    strategy.exit("Exit1", "Buy", stop = stopLoss1, limit = takeProfit1, qty_percent = 50)
    strategy.exit("Exit2", "Buy", stop = stopLoss2, limit = takeProfit2)

// Set `stopLoss1` and `takeProfit1` to `na` when price touches either.
if low <= stopLoss1 or high >= takeProfit1
    stopLoss1   := na
    takeProfit1 := na
// Set `stopLoss2` and `takeProfit2` to `na` when price touches either.
if low <= stopLoss2 or high >= takeProfit2
    stopLoss2   := na
    takeProfit2 := na

plot(stopLoss1,   "SL1", color.red,   style = plot.style_circles)
plot(stopLoss2,   "SL2", color.red,   style = plot.style_circles)
plot(takeProfit1, "TP1", color.green, style = plot.style_circles)
plot(takeProfit2, "TP2", color.green, style = plot.style_circles)