//@version=6
indicator("Last day example", overlay = true)
var bool isLastDay = false
if timeframe.change("1D") and last_bar_time - time < timeframe.in_seconds("1D") * 1000
    isLastDay := true
bgcolor(isLastDay ? color.new(color.red, 90) : na)