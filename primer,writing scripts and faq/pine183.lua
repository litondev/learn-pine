//@version=6
indicator("Previous and current day open using `timeframe.change()`", "", true)

bool newDay = timeframe.change("1D")
var float yesterdayOpen = na
var float todayOpen     = na

if newDay
    yesterdayOpen := todayOpen  // We reassign this value first
    todayOpen     := open  // and then store today's open

plot(yesterdayOpen, "Yesterday's Open", newDay ? na : color.red, 2, plot.style_line)
plot(todayOpen, "Today's Open", newDay ? na : color.green, 2, plot.style_line)
bgcolor(newDay ? color.new(color.gray, 80) : na)