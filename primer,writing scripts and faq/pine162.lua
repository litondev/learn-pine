//@version=6
strategy("ATR trailing stop demo", overlay = true)

// Set the lookback period in bars to identify the highest or lowest point for trailing stop calculations.
int SWING_LOOKBACK = 5

// @function                Calculates a dynamic trailing stop by adjusting the highest
//                          (bearish) or lowest (bullish) swing points over a set `length`
//                          of bars using the ATR, for a stop distance proportional to average bar size.
// @param calcStop          (series bool) A condition that activates the trailing stop, e.g., being in a trade.
// @param length            (simple int) The number of bars to look back to determine the highest or lowest point for
//                          the trailing stop calculation.
// @param isLong            (simple bool) Indicator of the trailing stop's orientation: true for long trades
//                          (stop below price) and false for short trades (stop above price).
// @param atrMultiplier     (simple float) The multiplier applied to the ATR, adjusting the stop's distance from the
//                          identified extreme price point. Optional. Default is 1.0, or 100% of the ATR value.
// @returns                 (float) The trailing stop price, or `na` if `calcStop` is false.
atrTrailingStop(series bool calcStop, simple int length, simple bool isLong, simple float atrMultiplier = 1.0) =>
    var float trailPrice = na
    int   m   = isLong ? 1 : -1
    float atr = ta.atr(14) * atrMultiplier
    float swingPoint = switch
        isLong => ta.lowest(length)  - atr
        =>        ta.highest(length) + atr
    trailPrice := switch
        calcStop    and not calcStop[1] => swingPoint
        calcStop[1] and not calcStop    => na
        => math.max(trailPrice * m, swingPoint * m) * m


// Calculate a fast and slow simple moving average.
float ma1 = ta.sma(close, 14)
float ma2 = ta.sma(close, 28)

// Conditions for long/short entries on MA crossover/crossunder, if we are not in a position.
bool longCondition  = ta.crossover(ma1,  ma2) and strategy.position_size == 0
bool shortCondition = ta.crossunder(ma1, ma2) and strategy.position_size == 0

// Determine when to calculate trailing stops for long/short positions, based on entries and position.
bool isExitBar = strategy.closedtrades.exit_bar_index(strategy.closedtrades - 1) == bar_index
bool isLong = longCondition  or strategy.position_size > 0 or isExitBar
bool isBear = shortCondition or strategy.position_size < 0 or isExitBar

// Use `atrTrailingStop()` to calculate trailing stops for both long and short positions.
float longStop  = atrTrailingStop(isLong, SWING_LOOKBACK, true)
float shortStop = atrTrailingStop(isBear, SWING_LOOKBACK, false)

// Place long entry order when `longCondition` occurs.
if longCondition
    strategy.entry("long", strategy.long)
// Place short entry order when `shortCondition` occurs.
if shortCondition
    strategy.entry("short", strategy.short)

// Create exit orders for long/short trades with ATR trailing stop, called on each bar to update to the latest price.
strategy.exit("long exit",  "long",  stop = longStop)
strategy.exit("short exit", "short", stop = shortStop)

// Display the two simple moving averages and stop levels on the chart.
plot(ma1, "MA 1", color.new(color.lime,    60))
plot(ma2, "MA 2", color.new(color.fuchsia, 60))
plot(isExitBar ? longStop[1]  : longStop,  "Long Stop",  color.red, 2, plot.style_linebr)
plot(isExitBar ? shortStop[1] : shortStop, "Short Stop", color.red, 2, plot.style_linebr)