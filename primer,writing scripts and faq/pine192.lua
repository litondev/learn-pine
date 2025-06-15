//@version=6
indicator("First time today example", "", true)

bool isUpCandle = close > open

// ————— Method 1.
int barsSincePreviousUpCandle = ta.barssince(isUpCandle[1]) 
int barsSinceStartOfDay = ta.barssince(timeframe.change("1D")) - 1
bool previousUpCandleWasNotToday = barsSincePreviousUpCandle > barsSinceStartOfDay
bool isFirstToday1 = isUpCandle and previousUpCandleWasNotToday
plotchar(isFirstToday1, "isFirstToday1", "•", location.top, color = color.silver, size = size.normal)

plot(barsSinceStartOfDay, "barsSinceStartOfDay", display=display.data_window)

// ————— Method 2.
var bool hadUpCandleToday = false  // This is a persistent state.
bool     isFirstToday2    = false  // This is a one-off event.
if timeframe.change("1D")  // When the day begins..
    hadUpCandleToday := false  // we have not yet had an up candle today, so reset the state.
if isUpCandle and not hadUpCandleToday  // If this is the first up candle today..
    hadUpCandleToday := true  // set the persistent state
    isFirstToday2    := true  // and update the event.
plotchar(isFirstToday2, "isFirstToday2", "•", location.top, color = color.yellow, size = size.small)