//@version=6
indicator("Plotting text demo", overlay = true)
float rsi   = ta.rsi(close, 14)
bool  rsiUp = ta.crossover( rsi, 50)
bool  rsiDn = ta.crossunder(rsi, 50)
plotchar( series = rsiUp, title = "Up", char = "▲", location = location.belowbar, 
  color = color.lime, text = "RSI\nUp", size = size.tiny)
plotshape(series = rsiDn, title = "Down", style = shape.triangledown, location = location.abovebar, 
  color = color.fuchsia, text = "RSI\nDown", size = size.tiny, textcolor = color.fuchsia)