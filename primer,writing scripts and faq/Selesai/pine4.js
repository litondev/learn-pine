//@version=6
indicator("Common debug outputs - Pine drawings", overlay = true)

//@variable Is `true` when a new bar opens on the "1D" timeframe.
bool newDailyBar = timeframe.change("1D")
//@variable The previous bar's `bar_index` from when `newDailyBar` last occurred.
int closedIndex = ta.valuewhen(newDailyBar, bar_index - 1, 0)
//@variable The previous bar's `close` from when `newDailyBar` last occurred.
float closedPrice = ta.valuewhen(newDailyBar, close[1], 0)

if newDailyBar
    // Draw a line from the previous `closedIndex` and `closedPrice` to the current values.
    line.new(closedIndex[1], closedPrice[1], closedIndex, closedPrice, width = 2)
    //@variable A string containing debug information to display in a label.
    string debugText = "'1D' bar closed at: \n(" + str.tostring(closedIndex) + ", " + str.tostring(closedPrice) + ")"
    //@variable Draws a label at the current `closedIndex` and `closedPrice`.
    label debugLabel = label.new(closedIndex, closedPrice, debugText, color = color.purple, textcolor = color.white)