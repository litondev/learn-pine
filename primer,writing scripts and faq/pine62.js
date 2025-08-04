//@version=6
indicator("Reducing drawing updates demo")

//@variable The first offset shown in the paginated table.
int offsetInput = input.int(0, "Page", 0, 249) * 20

//@variable A table that shows the history of RSI values.
var table infoTable = table.new(position.top_right, 2, 21, border_color = chart.fg_color, border_width = 1)
// Initialize the table's cells on the first bar.
if barstate.isfirst
    table.cell(infoTable, 0, 0, "Offset", text_color = chart.fg_color)
    table.cell(infoTable, 1, 0, "RSI", text_color = chart.fg_color)
    for i = 0 to 19
        table.cell(infoTable, 0, i + 1, str.tostring(offsetInput + i))
        table.cell(infoTable, 1, i + 1)

float rsi = ta.rsi(close, 14)

// Update the history shown in the `infoTable` on each bar. 
for i = 0 to 19
    float historicalRSI = rsi[offsetInput + i]
    table.cell_set_text(infoTable, 1, i + 1, str.tostring(historicalRSI))
    table.cell_set_bgcolor(
         infoTable, 1, i + 1, color.from_gradient(historicalRSI, 30, 70, color.red, color.green)
     )

plot(rsi, "RSI")