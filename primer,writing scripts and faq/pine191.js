//@version=6
indicator("Median Touches", "", overlay = false)

int medianLengthInput  = input.int(100, "Median calculation: Number of previous closes")
int touchesLengthInput = input.int(50,  "Number of previous bars to check for price touches")
float median = ta.percentile_nearest_rank(close, medianLengthInput, 50)
// Don"t count neutral touches when price doesn't move.
bool barUp = close > open
bool barDn = close < open
// Bar touches median.
bool medianTouch    = high    > median and low  < median
bool gapOverMedian  = high[1] < median and low  > median
bool gapUnderMedian = low[1]  > median and high < median
// Record touches.
int medianTouchUp = medianTouch and barUp or gapOverMedian  ? 1 : 0
int medianTouchDn = medianTouch and barDn or gapUnderMedian ? 1 : 0
// Count touches over the last n bars.
float touchesUp = math.sum(medianTouchUp, touchesLengthInput)
float touchesDn = math.sum(medianTouchDn, touchesLengthInput)
// —————————— Plots
// Markers
plotchar(medianTouchUp, "medianTouchUp", "▲", location.belowbar, color.lime, force_overlay = true)
plotchar(medianTouchDn, "medianTouchDn", "▼", location.abovebar, color.red, force_overlay = true)
// Median
plot(median, "Median", color.orange, force_overlay = true)
// Base areas.
plot( touchesUp, "Touches Up", color.green,  style = plot.style_columns)
plot(-touchesDn, "Touches Dn", color.maroon, style = plot.style_columns)
// Exceeding area.
float minTouches     = math.min(touchesUp, touchesDn)
bool  minTouchesIsUp = touchesUp < touchesDn
basePlus  = plot(minTouches, "Base Plus", display = display.none)
hiPlus    = plot(not minTouchesIsUp ? touchesUp : na, "High Plus", display = display.none)
baseMinus = plot(-minTouches, "Base Plus", display = display.none)
loMinus   = plot(minTouchesIsUp ? -touchesDn : na, "Low Minus", display = display.none)
fill(basePlus,  hiPlus,  color.lime)
fill(baseMinus, loMinus, color.red)