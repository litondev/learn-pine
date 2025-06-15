//@version=6
indicator("Highest/lowest since new day", "", true)

// Identify the start of a new day and calculate the number of bars since then.
bool newDay  = timeframe.change("D")
int lookback = nz(ta.barssince(newDay)) + 1

// Calculate the highest and lowest point since the new day began.
float lowestSinceNewDay  = ta.lowest(lookback)
float highestSinceNewDay = ta.highest(lookback)

// Plot the high/low level since the start of a new day.
plot(lowestSinceNewDay, "High today", color.orange)
plot(highestSinceNewDay, "Low today", color.aqua)
// Change the background color to indicate the start of a new day.
bgcolor(newDay ? color.new(color.gray, 80) : na)
// Display the varying lookback period in Data Window.
plot(lookback, "Lookback", display = display.data_window)