//@version=6
strategy("R:R demo", overlay = true)

// Declare the stop size in ticks and the risk-to-reward ratio as inputs.
int   lossSizeInput   = input.int(300,   "Loss size (in ticks)", minval = 0)
float riskRewardInput = input.float(2.0, "Risk/Reward multiple", minval = 0)

// Create long and short entry conditions on MA crossover/crossunder, as long as we are not in a position.
float ma1 = ta.sma(close, 14), float ma2 = ta.sma(close, 28)
bool buyCondition  = ta.crossover(ma1,  ma2) and strategy.position_size == 0
bool sellCondition = ta.crossunder(ma1, ma2) and strategy.position_size == 0

// Place orders when `buyCondition` or `sellCondition` is true.
if buyCondition
    strategy.entry("buy", strategy.long)
if sellCondition
    strategy.entry("sell", strategy.short)

// Define exit point for the entries based on a predefined loss size.
// Calculate the profit target by multiplying the loss size with the user-defined risk-to-reward ratio.
strategy.exit("exit", loss = lossSizeInput, profit = lossSizeInput * riskRewardInput)

// Calculate the price equivalent of the profit and loss level.
float tradeBias       = math.sign(strategy.position_size)
float stopLossPrice   = strategy.position_avg_price - (tradeBias * lossSizeInput * syminfo.mintick)
float takeProfitPrice = strategy.position_avg_price + (tradeBias * lossSizeInput * syminfo.mintick * riskRewardInput)

// Plot the entry price, the stop price, and the price of the take-profit order.
plotEntry = plot(strategy.position_avg_price, "Entry price", color.new(color.gray, 70), style = plot.style_linebr)
plotStop  = plot(stopLossPrice,               "Stop-loss price",   color.red,   style = plot.style_linebr)
plotTP    = plot(takeProfitPrice,             "Take-profit price", color.green, style = plot.style_linebr)

// Highlight the R:R ratio by shading the area between the entry and the stop and the entry and the take-profit.
fill(plotStop, plotEntry, color.new(color.red,   80))
fill(plotTP, plotEntry, color.new(color.green, 80))