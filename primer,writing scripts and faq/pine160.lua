//@version=6
strategy("Move stop to breakeven", overlay = true)

float stopSizeInput   = input.float(5.0, "SL %", minval = 0.0) / 100.0
float profitSizeInput = input.float(5.0, "TP %", minval = 0.0) / 100.0
float breakEvenInput  = input.float(50,  "BE %", minval = 0.0, maxval = 100) / 100.0

//@variable Is `true` on every 100th bar.
bool buyCondition = bar_index % 100 == 0

//@variable Stop-loss price for exit commands.
var float stopLoss   = na
//@variable Take-profit price for exit commands.
var float takeProfit = na
//@variable Price that, if breached, sets the stop to breakeven.
var float breakEvenThreshold = na

// Place orders when `buyCondition` is true and we are not in a position.
if buyCondition and strategy.position_size == 0.0
    stopLoss           := close * (1.0 - stopSizeInput)
    takeProfit         := close * (1.0 + profitSizeInput)  // Set the breakeven threshold.
    breakEvenThreshold := close * (1.0 + profitSizeInput * breakEvenInput)
    strategy.entry("buy", strategy.long)

// If the breakeven threshold is exceeded while in a position, set the stop to the entry price.
if high >= breakEvenThreshold and strategy.position_size != 0
    stopLoss := strategy.position_avg_price

//@variable Is `true` on the bar on which a trade exits.
bool isExitBar = strategy.closedtrades.exit_bar_index(strategy.closedtrades - 1) == bar_index
//@variable Condition to determine when plots are displayed.
bool showPlots = strategy.position_size != 0 or buyCondition or isExitBar
// Plot the entry price, stop loss, take-profit, and the breakeven threshold.
plot(strategy.position_avg_price,         "BE", chart.fg_color, style = plot.style_linebr)
plot(showPlots ? stopLoss           : na, "SL", color.red,                 style = plot.style_linebr)
plot(showPlots ? takeProfit         : na, "TP", color.green,               style = plot.style_linebr)
plot(showPlots ? breakEvenThreshold : na, "TG", color.blue,                style = plot.style_circles)

// Place a bracket order using the `stopLoss` and `takeProfit` values.
// We call it on every bar so that the stop level is updated when the breakeven threshold is exceeded.
strategy.exit("exit", "buy", stop = stopLoss, limit = takeProfit)