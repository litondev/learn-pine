//@version=6
strategy("Predefined price exit demo", overlay = true)

int exitPercentInput = input.int(1, "Exit %", minval = 1, maxval = 99)
float exitPercent = exitPercentInput / 100

//@variable Is `true` on every 100th bar.
bool buyCondition = bar_index % 100 == 0

var float stopLoss   = na
var float takeProfit = na

// Place orders when `buyCondition` is true and we are not in a position.
if buyCondition and strategy.position_size == 0.0
    stopLoss   := close * (1 - exitPercent)
    takeProfit := close * (1 + exitPercent)
    strategy.entry("buy", strategy.long)
    strategy.exit("exit", "buy", stop = stopLoss, limit = takeProfit)

// Set `stopLoss` and `takeProfit` to `na` when price touches either, i.e., when the strategy simulates an exit.
if low <= stopLoss or high >= takeProfit
    stopLoss   := na
    takeProfit := na

plot(stopLoss,   "SL", color.red,   style = plot.style_linebr)
plot(takeProfit, "TP", color.green, style = plot.style_linebr)