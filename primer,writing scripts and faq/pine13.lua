//@version=6
indicator("Drawing labels at the end of the chart demo", "Chart info", true)

//@function         Draws a label to display the `info` text at the latest available time.
//                  Each instance of a call to this function updates its label text across executions.
//@param info       The string to display.
//@param price      Optional. The y-coordinate of the label. If `na`, the function draws the label above the last bar. 
//                  The default is `na`.
//@param textColor  Optional. The color of the displayed text. If `na`, the label uses `chart.fg_color`. 
//                  The default is `na`.
//@param size       Optional. The size of the label in typographic points. The default is 18. 
//@returns          A `label` object with dynamic text. 
printLabel(string info, simple float price = na, simple color textColor = na, simple int size = 18) =>
    var int anchorTime = math.max(last_bar_time, chart.right_visible_bar_time)
    var color col = nz(textColor, chart.fg_color)
    var yloc = na(price) ? yloc.abovebar : yloc.price
    var label result = label.new(
         anchorTime, price, na, xloc.bar_time, yloc, na, label.style_none, col, size, force_overlay = true
     )
    result.set_text(info)

// Call `printLabel()` on the first bar to display "Chart info:" and formatted chart information.
if barstate.isfirst
    printLabel("Chart info:" + str.repeat("\n", 6), textColor = color.teal)
    printLabel(
         str.format(
             "Symbol: {0}, Type: {1}, Timeframe: {2}\nStandard chart: {3}, Replay active: {4}",
             ticker.standard(), syminfo.type, timeframe.period, chart.is_standard, 
             str.contains(syminfo.tickerid, "replay")
         ) + str.repeat("\n", 3)
     )

// On the last available bar, call `printLabel()` to display the latest OHLCV values and total bar count.
if barstate.islast
    printLabel(
         str.format(
             "O: {0,number,#.#####}, H: {1,number,#.#####}, L: {2,number,#.#####}, C: {3,number,#.#####},
             V: {4}", 
             open, high, low, close, str.tostring(volume, format.volume)
         ) + "\n"
     )
    printLabel("Total bars: " + str.tostring(bar_index + 1))