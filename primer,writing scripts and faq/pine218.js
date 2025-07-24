//@version=6
indicator("18:00 hours", overlay = true)
int  timeInSession = time(timeframe = timeframe.period, session = "1800-1900")
int  timestamp1800 = timestamp(year, month, dayofmonth, 18, 00, 00)
bool method1 = hour == 18 and minute == 00
bool method2 = not na(timeInSession) and na(timeInSession[1])
bool method3 = timestamp1800 == time
plotchar(method1 ? 1 : na, "method1", "", location.abovebar, color.red,    text="1", size=size.tiny)
plotchar(method2 ? 2 : na, "method2", "", location.abovebar, color.orange, text="2\n‎", size=size.tiny)
plotchar(method3 ? 3 : na, "method3", "", location.abovebar, color.yellow, text="3\n‎\n‎", size=size.tiny)