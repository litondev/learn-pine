// @version=6
indicator("Week of month demo 1")

bool isNewWeek = ta.change(weekofyear) != 0
bool isNewMonth = ta.change(month) != 0

var int weekCount = na
weekCount := timeframe.ismonthly ? na : isNewMonth ? 1 : isNewWeek ? weekCount + 1 : weekCount

plot(weekCount, "Week of month", chart.fg_color)
bgcolor(isNewWeek ? color.new(chart.fg_color, 90) : na)
bgcolor(isNewMonth ? color.new(color.lime, 80) : na)