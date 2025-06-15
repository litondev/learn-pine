//@version=6
indicator("")
series = close >= open ? close : na
vw = fixnan(series)
plot(series, style = plot.style_linebr, color = color.red)  // series has na values
plot(vw)  // all na values are replaced with the last non-empty value