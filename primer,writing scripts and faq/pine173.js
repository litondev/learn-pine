//@version=6
indicator("RSI table", "", true)

var table rsiDisplay = table.new(position.top_right, 1, 1, bgcolor = color.gray, frame_width = 2, frame_color = color.black)
float rsi = ta.rsi(close, 14)

bool  rsiAbove50 = rsi >= 50
bool  rsiBelow50 = rsi < 50

color textColor = rsiAbove50 ? color.lime : rsiBelow50 ? color.fuchsia : color(na)

if barstate.isfirst
    table.cell(rsiDisplay, 0, 0, "")
else if barstate.islast
    table.cell_set_text(rsiDisplay, 0, 0, str.format("RSI: {0, number, #.##}", rsi))
    table.cell_set_text_color(rsiDisplay, 0, 0, textColor)