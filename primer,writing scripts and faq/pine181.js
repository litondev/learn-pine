//@version=6
indicator("Chart's visible high/low", "", true)

import PineCoders/VisibleChart/4 as PCvc

// Calculate the chart's visible high and low prices and their corresponding times.
int x1 = PCvc.highBarTime()
int x2 = PCvc.lowBarTime()
float chartHi = PCvc.high()
float chartLo = PCvc.low()

// Draw lines and labels on the last bar.
if barstate.islast
    line.new(x1, chartHi, x2, chartHi, xloc.bar_time, extend.both, color.lime)
    line.new(x1, chartLo, x2, chartLo, xloc.bar_time, extend.both, color.fuchsia)
    string hiTxt = str.format("{0}\n{1}", str.tostring(chartHi, format.mintick), str.format_time(x1, format = "dd/MM/yy @ HH:mm"))
    string loTxt = str.format("{0}\n{1}", str.tostring(chartLo, format.mintick), str.format_time(x2, format = "dd/MM/yy @ HH:mm"))
    label.new(x1, chartHi, hiTxt, xloc.bar_time, yloc.price, color.new(color.lime, 80),    label.style_label_down, color.lime)
    label.new(x2, chartLo, loTxt, xloc.bar_time, yloc.price, color.new(color.fuchsia, 80), label.style_label_up,   color.fuchsia)