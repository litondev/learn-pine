//@version=6
indicator("Alternating states", "", true)

lookback = input.int(2, title="Lookback & Lookahead")

// Define an enum of allowed pivot types.
enum PivotType
    high
    low
    undefined

const color red80 = color.new(color.red, 80)
const color green80 = color.new(color.green, 80)
const color yellow80 = color.new(color.yellow, 80)

// Define a variable of type PivotType to track the pivot direction.
var PivotType lastPivot = PivotType.undefined

// Define pivots.
float pivotLowPrice = ta.pivotlow(lookback, lookback)
float pivotHighPrice = ta.pivothigh(lookback, lookback)
bool isPivotLow = not na(pivotLowPrice)
bool isPivotHigh = not na(pivotHighPrice)

// Plot triangles for pivot points.
plotshape(isPivotLow ? pivotLowPrice : na, "Low", shape.triangleup, location.belowbar, color.yellow, 
  offset = -lookback, size = size.tiny)
plotshape(isPivotHigh ? pivotHighPrice : na, "High", shape.triangledown, location.abovebar, color.yellow,
  offset = -lookback, size = size.tiny)

// Confirm highs and lows strictly in order. `PivotType.undefined` handles the case where no pivot has yet occurrred.
bool confirmedLow = isPivotLow and (lastPivot == PivotType.high or lastPivot == PivotType.undefined)
bool confirmedHigh = isPivotHigh and (lastPivot == PivotType.low or lastPivot == PivotType.undefined)

// Plot larger triangles for confirmed pivots.
plotshape(confirmedLow ? pivotLowPrice : na, "Low Confirmed", shape.triangleup, location.belowbar, color.green,
  offset = -lookback, size = size.normal)
plotshape(confirmedHigh ? pivotHighPrice : na, "High Confirmed", shape.triangledown, location.abovebar, color.red,
  offset = -lookback, size = size.normal)

// Update last pivot direction.
lastPivot := confirmedLow ? PivotType.low : confirmedHigh ? PivotType.high : lastPivot

// Color the background of the chart based on the direction of the most recent confirmed pivot.
bgcolor(lastPivot == PivotType.low ? green80 : lastPivot == PivotType.high ? red80 : 
  lastPivot == PivotType.undefined ? yellow80 : na)