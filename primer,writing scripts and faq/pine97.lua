//@version=6

// This annotation auto-populates the alert dialogue with the `alert_message` string.
// @strategy_alert_message {{strategy.order.alert_message}}

strategy("Alert message demo", overlay = true)

// Declare two moving averages to use for the entry condition.
float fastMa = ta.sma(close, 5)
float slowMa = ta.sma(close, 10)
// Declare two persistent variables that will hold our stop-loss and take-profit values.
var float limit = na
var float stop  = na

// If `fastMa` has crossed over `slowMa` and we are not already in a position,
// place an entry and exit order. 
//      • Set the `limit` to 2% above the close and the stop to 1% below.
//      • Use a combination of script variables and placeholders in the alert strings.
//      • The exit alert shows the order direction, position size, ticker, and order price.
//      • The entry alert includes the same values plus the stop and limit price.
if ta.crossover(fastMa, slowMa) and strategy.position_size == 0
    limit := close * 1.02
    stop  := close * 0.99
    string exitString  = "{{strategy.order.action}} {{strategy.position_size}} {{ticker}} @ {{strategy.order.price}}"
    string entryString = exitString + " TP: " + str.tostring(limit, format.mintick) + " SL: " + 
      str.tostring(stop, format.mintick)
    strategy.entry("Buy", strategy.long, alert_message = entryString)
    strategy.exit("Exit", "Buy", stop = stop, limit = limit, alert_message = exitString)

// Plot the moving averages, stop, and limit values on the chart.
plot(fastMa, "Fast Moving Average", color.aqua)
plot(slowMa, "Slow Moving Average", color.orange)
plot(strategy.position_size > 0 ? limit : na, "Limit", color.green, style = plot.style_linebr)
plot(strategy.position_size > 0 ? stop  : na, "Stop",  color.red,   style = plot.style_linebr)