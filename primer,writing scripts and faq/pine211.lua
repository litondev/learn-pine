//@version=6
indicator("Plot value starting n months/years back", overlay = true)
int  monthsBackInput  = input.int(3, minval = 0)
int  yearsBackInput   = input.int(0, minval = 0)
bool calcFromNowInput = input(false, "Calculate from current date/time instead of first of the month")

bool isTargetDate = time >= timestamp(
  year(timenow)  - yearsBackInput,
  month(timenow) - monthsBackInput,
  calcFromNowInput ? dayofmonth(timenow) : 1,
  calcFromNowInput ? hour(timenow)       : 0,
  calcFromNowInput ? minute(timenow)     : 0,
  calcFromNowInput ? second(timenow)     : 0)
bool isBeginMonth = not isTargetDate[1] and isTargetDate
var float valueToPlot = na
if isBeginMonth
    valueToPlot := high
plot(valueToPlot)
bgcolor(isBeginMonth ? color.new(color.red, 80) : na)