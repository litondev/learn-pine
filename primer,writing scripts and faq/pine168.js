//@version=6
indicator("Plotting text demo: incorrect", overlay = true)
float rsi   = ta.rsi(close, 14)
bool  rsiUp = ta.crossover( rsi, 50)
bool  rsiDn = ta.crossunder(rsi, 50)
string txt = rsiUp ? "RSI\nUp" : rsiDn ? "RSI\nDown" : ""
plotchar(series = rsiUp or rsiDn, title = "Up/Down", char = "R", text = txt, location = location.top, size = size.tiny)