//@version=6
indicator("Single label demo", "", true)
float rsi        = ta.rsi(close, 14)
bool  rsiAbove50 = rsi >= 50
bool  rsiBelow50 = rsi < 50

var label rsiLabel = label.new(na, na, style = label.style_label_left, yloc = yloc.price,
  color = color.new(color.gray,70))

if barstate.islast
    color  textColor = rsiAbove50 ? color.lime : rsiBelow50 ? color.fuchsia : color(na)
    rsiLabel.set_x(bar_index + 1)
    rsiLabel.set_y(open)
    rsiLabel.set_text(str.format("RSI: {0, number, #.##}", rsi))
    rsiLabel.set_textcolor(textColor)