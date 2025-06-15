//@version=6
strategy("Stop using `loss` and `stop`", overlay = true)

int lossTicksInput = input.int(60, "Stop loss in ticks (for longs)")
float atrMultInput = input.float(1.0, "ATR multiplier (for shorts)", minval = 0)

// Calculate the ATR value, adjusted by the multiplier, for setting dynamic stop loss levels on short positions.
float atr = ta.atr(14) * atrMultInput

// A persistent short stop loss level, updated based on short entry signals.
var float shortStopLevel = na

// Define conditions for entering long and short positions based on the crossover and crossunder of two SMAs.
float ma1 = ta.sma(close,  14)
float ma2 = ta.sma(close,  28)
bool longCondition  = ta.crossover(ma1,  ma2)
bool shortCondition = ta.crossunder(ma1, ma2)

// On detecting a long condition, place a long entry.
if longCondition
    strategy.entry("Long", strategy.long)
// For a short condition, place a short entry and set the stop loss level by adding the ATR value to the closing price.
if shortCondition
    strategy.entry("Short", strategy.short)
    shortStopLevel := close + atr

// Apply a fixed-size stop loss for long positions using the specified input tick size in the `loss` parameter.
strategy.exit(id = "Long Exit",  from_entry = "Long",  loss = lossTicksInput)
// For short positions, set the stop loss at the calculated price level using the `stop` parameter.
strategy.exit(id = "Short Exit", from_entry = "Short", stop = shortStopLevel)

// Calculate the long stop loss price by subtracting the loss size from the average entry price.
// Set the price to `na` if the strategy is not in a long position.
float longStopPlot  = strategy.position_size > 0 ? strategy.position_avg_price - lossTicksInput * syminfo.mintick : na
// The short stop price is already calculated. Set to `na` if the strategy is not in a short position.
float shortStopPlot = strategy.position_size < 0 ? shortStopLevel : na
// Plot the moving averages and stop loss levels.
plot(ma1, "MA 1", color.new(color.lime,    50))
plot(ma2, "MA 2", color.new(color.fuchsia, 50))
plot(longStopPlot,  "Long Stop",  color.red, style = plot.style_steplinebr)
plot(shortStopPlot, "Short Stop", color.red, style = plot.style_steplinebr)
// Color the background when long or short conditions are met.
bgcolor(longCondition ? color.new(color.aqua, 80) : shortCondition ? color.new(color.orange, 90) : na)