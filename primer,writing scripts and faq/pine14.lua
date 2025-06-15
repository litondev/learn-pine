//@version=6
indicator("Debugging with single-cell tables demo", "Chart info", true)

//@function         Draws a single-cell table to display the `info` text in the top-right corner of the chart.
//@param info       The string to display.
//@param textColor  Optional. The color of the displayed text. If `na`, the table uses `chart.fg_color`. 
//                  The default is `na`.
//@param size       Optional. The size of the table's text in typographic points. The default is 18.
//@returns          A single-cell table with dynamic text.  
printTable(string info, simple color textColor = na, simple int size = 18) =>
    var color col    = nz(textColor, chart.fg_color)
    var table result = table.new(position.top_right, 1, 1, na, force_overlay = true)
    table.cell(result, 0, 0, info, text_color = col, text_size = size)

// Call `printTable()` on the latest available bar to display chart information in the top-right corner.
if barstate.islast
    printTable(
         str.format(
             "Chart info:
             \n\nSymbol: {0}, Type: {1}, Timeframe: {2}\nStandard chart: {3}, Replay active: {4}
             \n\nO: {5,number,#.#####}, H: {6,number,#.#####}, L: {7,number,#.#####}, C: {8,number,#.#####}, V: {9}
             \nTotalBars: {10}",
             ticker.standard(), syminfo.type, timeframe.period, chart.is_standard, 
             str.contains(syminfo.tickerid, "replay"), open, high, low, close, str.tostring(volume, format.volume),
             bar_index + 1
         )
     )