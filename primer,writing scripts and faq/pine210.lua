//@version=6
indicator("Detect today", overlay = true)
isToday() =>
    int currentYear  = year(timenow)
    int currentMonth = month(timenow)
    int currentDay   = dayofmonth(timenow)
    bool result = year == currentYear and month == currentMonth and dayofmonth == currentDay
bgcolor(isToday() ? color.new(color.red, 90) : na)