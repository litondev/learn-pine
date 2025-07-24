//@version=6
strategy("Multiple TP, one stop demo", overlay = true)

int exitPercentInput = input.int(1, "Exit %", minval = 1, maxval = 99)
float exitPercent = exitPercentInput / 100

var float stop   = na
var float limit1 = na
var float limit2 = na

bool buyCondition = bar_index % 100 == 0  // Is `true` on every 100th bar.

// Place orders when `buyCondition` is true and we are not in a position.
if buyCondition and strategy.position_size == 0
    stop   := close * (1 - exitPercent)
    limit1 := close * (1 + exitPercent)
    limit2 := close * (1 + (2 * exitPercent))
    strategy.entry("Long",    strategy.long, 6)
    // All three sell orders use the "Bracket" OCA group; filling one order reduces the quantity of the remaining orders.
    strategy.order("Stop",    strategy.short, stop  = stop,   qty = 6, oca_name = "Bracket", oca_type = strategy.oca.reduce)
    strategy.order("Limit 1", strategy.short, limit = limit1, qty = 3, oca_name = "Bracket", oca_type = strategy.oca.reduce)
    strategy.order("Limit 2", strategy.short, limit = limit2, qty = 6, oca_name = "Bracket", oca_type = strategy.oca.reduce)

// Set `limit1` to `na` when price exceeds it.
if high >= limit1
    limit1 := na
// Set `stop`, `limit11`, and `limit2` to `na` when price surpasses either the last take-profit, or the stop.
if low <= stop or high >= limit2
    stop := na, limit1 := na, limit2 := na

plot(stop,   "Stop",    color.red,   style = plot.style_linebr)
plot(limit1, "Limit 1", color.green, style = plot.style_linebr)
plot(limit2, "Limit 2", color.green, style = plot.style_linebr)