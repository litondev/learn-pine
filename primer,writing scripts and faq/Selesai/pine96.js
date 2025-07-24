//@version=6
indicator("Vstop alert demo", overlay = true)

import TradingView/ta/7 as TVta

// Calculate ATR trailing stop and determine trend direction.
[stopValue, trendUp] = TVta.vStop(close, 20, 2)

// Round the stop value to mintick for accuracy in comparison operators.
float stop = math.round_to_mintick(stopValue)

// Check for trend changes.
bool  trendReversal = trendUp != trendUp[1]
bool  trendToDn     = trendReversal and not trendUp
bool  trendToUp     = trendReversal and     trendUp
// Create color variables for the plot display.
color plotColor     = trendUp ? color.green : color.red
color lineColor     = trendReversal ? color(na) : plotColor

// Plot the stop value on the chart. Plot a circle on trend changes.
plot(stop, "V-Stop", lineColor)
plot(trendReversal ? stop : na, "Trend Change Circle", plotColor, 3, plot.style_circles)

// Convert the stop value to string for use in the alert messages.
string stopStr = str.tostring(stop)

// If the trend changed to up, send a long alert with the initial stop value.
if trendToUp
    alert("Long alert. Stop @ " + stopStr, alert.freq_once_per_bar_close)

// If the trend changed to down, send a short alert with the initial stop value.
if trendToDn
    alert("Short alert. Stop @ " + stopStr, alert.freq_once_per_bar_close)

// If the stop value has progressed, send an alert to update the stop value.
if (trendUp and stop > stop[1] or not trendUp and stop < stop[1]) and not trendReversal
    alert('Update stop to ' + stopStr, alert.freq_once_per_bar_close)