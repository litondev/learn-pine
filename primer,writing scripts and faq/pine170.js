//@version=6
indicator("Drawing labels demo", "", true)
float rsi   = ta.rsi(close, 14)
bool  rsiUp = ta.crossover( rsi, 50)
bool  rsiDn = ta.crossunder(rsi, 50)
if rsiUp or rsiDn
    string labelText = rsiUp ? "▲\nRSI Up"   : "RSI Down\n▼"
    color  textColor = rsiUp ? color.lime    : color.fuchsia
    string labelPos  = rsiUp ? yloc.belowbar : yloc.abovebar
    label.new(bar_index, na, labelText, yloc = labelPos, color = color(na), textcolor = textColor)