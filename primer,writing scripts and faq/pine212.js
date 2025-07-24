//@version=6
indicator("Periodic high/low example", overlay = true)

// Inputs
bool   showHiInput = input.bool(true,      "Show highs")
bool   showLoInput = input.bool(true,      "Show lows")
string periodInput = input.timeframe("1D", "Period after which high/low is reset")

// Declare with `var` to retain values bar to bar.
var float hi = na
var float lo = na

// When a new period begins, reset hi/lo; otherwise, trail them.
bool  isNewPeriod = timeframe.change(periodInput)  
hi := isNewPeriod ? high : math.max(high, hi)
lo := isNewPeriod ? low : math.min(low, lo)

// Plot the hi, lo, and an invisible mid value for area fill.
p1 = plot(hi, "Highs", isNewPeriod ? na : color.new(color.lime,    60), display = showHiInput ? display.all : display.none)
p2 = plot(lo, "Lows",  isNewPeriod ? na : color.new(color.fuchsia, 60), display = showLoInput ? display.all : display.none)
p3 = plot(hl2, editable = false, display = display.none)

// Create fills between the current mid price and the highest and lowest price.
fill(p1, p3, color = isNewPeriod ? na : color.new(color.lime,    90))
fill(p2, p3, color = isNewPeriod ? na : color.new(color.fuchsia, 90))

bgcolor(isNewPeriod ? color.new(color.gray, 90) : na)  // Highlight the background when a new period begins.