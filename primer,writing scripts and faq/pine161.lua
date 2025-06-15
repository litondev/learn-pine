//@version=6
strategy("Trailing stop order demo", overlay = true)

string TT_SO = "The trailing stop offset in ticks. Also used as the initial stop loss distance from the entry price."

//@variable The activation level is this number of ticks above the entry price.
int activationOffsetInput = input.int(1000, "Activation Level Offset (in ticks)")
//@variable The trailing stop trails this many ticks below the high price.
int stopOffsetInput = input.int(2000, "Stop Offset (in ticks)", tooltip = TT_SO)

//@variable The price at which the trailing stop activates.
float trailPriceActivationLevel = activationOffsetInput * syminfo.mintick + strategy.position_avg_price
//@variable The price at which the trailing stop itself is located.
var float trailingStop = na

// Calculate a fast and slow Simple Moving Average.
float ma1 = ta.sma(close, 14)
float ma2 = ta.sma(close, 28)

//@variable Is `true` when `ma1` crosses over `ma2` and we are not in a position.
bool longCondition  = ta.crossover(ma1,  ma2) and strategy.position_size == 0
//@variable Is `true` on the bar that a trade exits.
bool  isExitBar = strategy.closedtrades.exit_bar_index(strategy.closedtrades - 1) == bar_index
float exitPrice = strategy.closedtrades.exit_price(strategy.closedtrades - 1)

// Generate a long market order when `longCondition` is `true`.
// Set a static abd trailing stop loss.
if longCondition
    strategy.entry("Long", strategy.long)
    strategy.exit("Stop",
         from_entry   = "Long",
         trail_points = activationOffsetInput,
         trail_offset = stopOffsetInput,
         loss         = stopOffsetInput
         )

// If the high exceeds the activation level, set the `trailingStop` to whichever is higher:
// the current high minus the price equivalent of `stopOffsetInput` or the previous `trailingStop` value.
if high > trailPriceActivationLevel or isExitBar and exitPrice > trailingStop
    trailingStop := math.max(high - stopOffsetInput * syminfo.mintick, nz(trailingStop))

//@variable The price of the active stop price, using the trailing stop when activated, or a static stop loss otherwise.
float stopLevel = na(trailingStop) ? strategy.position_avg_price - stopOffsetInput * syminfo.mintick : trailingStop

// Visualize the movement of the trailing stop and the activation level.
plot(stopLevel,                 "Stop Level",       chart.fg_color,  2, plot.style_linebr)
plot(trailPriceActivationLevel, "Activation level", color.aqua, 1, plot.style_linebr)
// Display the two simple moving averages on the chart.
plot(ma1, "MA 1", color.new(color.lime,    60))
plot(ma2, "MA 2", color.new(color.fuchsia, 60))

// Mark the point where the trailing stop is activated with a shape and text.
plotshape(high > trailPriceActivationLevel and na(trailingStop)[1], "Trail Activated", shape.triangledown,
     size = size.small, color = color.aqua, text = "Trailing stop\nactivated", textcolor = color.aqua)

// Set the trailing stop to `na` when not in a position.
if strategy.position_size == 0
    trailingStop := na