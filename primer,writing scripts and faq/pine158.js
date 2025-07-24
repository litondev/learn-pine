//@version=6
strategy("Exit demo using `calc_on_order_fills`", overlay = true, calc_on_order_fills = true)

float stopSizeInput   = input.float(1.0, "SL %", minval = 0.0) / 100.0
float profitSizeInput = input.float(1.0, "TP %", minval = 0.0) / 100.0

//@variable Is `true` on every 100th bar.
bool buyCondition = bar_index % 100 == 0

//@variable Stop-loss price for exit commands.
var float stopLoss   = na
//@variable Take-profit price for exit commands.
var float takeProfit = na

// Place orders when `buyCondition` is true and we are not in a position.
if buyCondition and strategy.position_size == 0.0
    strategy.entry("buy", strategy.long)

// If we are in a position, set the exit orders.
if strategy.position_size != 0.0
    stopLoss   := strategy.position_avg_price * (1.0 - stopSizeInput)
    takeProfit := strategy.position_avg_price * (1.0 + profitSizeInput)
    strategy.exit("exit", "buy", stop = stopLoss, limit = takeProfit)

// Set `stopLoss` and `takeProfit` to `na` when price touches either, i.e., when the strategy simulates an exit.
if low <= stopLoss or high >= takeProfit
    stopLoss   := na
    takeProfit := na

plot(stopLoss,   "SL", color.red,   style = plot.style_linebr)
plot(takeProfit, "TP", color.green, style = plot.style_linebr)