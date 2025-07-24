//@version=6
strategy("Custom strategy metrics", "", true, initial_capital  = 10000, commission_type  = strategy.commission.percent,
     commission_value = 0.075, max_bars_back = 1000, default_qty_type = strategy.percent_of_equity,
     default_qty_value = 100)
// Calculate entry conditions.
float c          = math.round_to_mintick(close)  // Round OHLC to chart prices.
float maF        = math.round_to_mintick(ta.sma(hlc3, 10)), float maS = math.round_to_mintick(ta.sma(hlc3, 60))
bool enterLong   = ta.crossover(maF, maS), bool enterShort  = ta.crossunder(maF, maS)  // Entry conditions.
float stopLong   = ta.lowest(20)[1], float stopShort  = ta.highest(20)[1]  // Stop-loss order levels.
// Enter a new position or reverse, unless stop could not be calculated yet.
if enterLong and not na(stopLong)
    strategy.entry("Long", strategy.long, comment = "►Long")
if enterShort and not na(stopShort)
    strategy.entry("Short", strategy.short, comment = "►Short")
// Modify existing exit orders using the current stop value.
strategy.exit("◄Long",  "Long",  stop = stopLong), strategy.exit("◄Short", "Short", stop = stopShort)
// Generate custom statistics.
float riskOnEntry          = math.abs(c - (enterLong ? stopLong : enterShort ? stopShort : na))  // Trade risk at entry.
int   changeInClosedTrades = ta.change(strategy.closedtrades)
int   changeInOpenTrades   = ta.change(strategy.opentrades)
bool  tradeWasClosed       = changeInClosedTrades != 0
bool  tradeWasEntered      = changeInOpenTrades > 0 or (strategy.opentrades == strategy.opentrades[1] and tradeWasClosed) or
  changeInClosedTrades > 1
bool  tradeIsActive        = strategy.opentrades != 0  // Check if a trade is currently active.
float barsInTradePct       = 100 * ta.cum(tradeIsActive ? 1 : 0) / bar_index  // Percentage of bars on which a trade was open.
float tradesEntered        = ta.cum(tradeWasEntered ? 1 : 0)
float positionSize         = math.abs(strategy.position_size)
float avgPositionSize      = ta.cum(nz(positionSize))[1] / tradesEntered  // Calculate average position size.
float positionValue        = positionSize * close  // Position monetary value
float priceRiskPct         = riskOnEntry / close  // Risk percentage of trade relative to entry price.
float tradeRiskPct         = positionSize * riskOnEntry  // Monetary risk of the trade.
float stop                 = strategy.position_size > 0 ? stopLong : strategy.position_size < 0 ? stopShort : na
// Plot the MAs, stop price, and markers for entries and exits to the chart.
plot(maF,"MA Fast"), plot(maS,  "MA Slow", color.silver), plot(stop, "Stop", color.fuchsia, 1, plot.style_circles)
plotchar(tradeWasClosed,  "tradeWasClosed",  "—", location.bottom, color.fuchsia, size = size.tiny)
plotchar(tradeWasEntered, "tradeWasEntered", "+", location.top,    color.lime,    size = size.tiny)
// Highlight the background while long and short positions are active.
bgcolor(strategy.position_size > 0 ? color.new(color.teal, 80) : strategy.position_size < 0 ? color.new(color.maroon, 80) : na)
// Plot statistics to the Data Window.
plot(na,                     "════════  Built-ins",         display = display.data_window)
plot(strategy.opentrades,    "strategy.opentrades",         display = display.data_window)
plot(strategy.closedtrades,  "strategy.closedtrades",       display = display.data_window)
plot(strategy.position_size, "strategy.position_size",      display = display.data_window)
plot(strategy.equity,        "Equity",                      display = display.data_window)
plot(na,                     "════════  Custom Metrics",    display = display.data_window)
plot(riskOnEntry,            "Risk On Entry",               display = display.data_window)
plot(positionSize,           "Position Size",               display = display.data_window)
plot(tradesEntered,          "tradesEntered",               display = display.data_window)
plot(barsInTradePct,         "barsInTradePct",              display = display.data_window)
plot(avgPositionSize,        "avgPositionSize",             display = display.data_window)
plot(positionValue,          "Position Value",              display = display.data_window)
plot(priceRiskPct,           "Price Risk %",                display = display.data_window)
plot(tradeRiskPct,           "Trade Risk Value",            display = display.data_window)