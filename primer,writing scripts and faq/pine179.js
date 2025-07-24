//@version=6
indicator("`barssince` demo", overlay = true)
int  lengthInput = input.int(3, "Length")
bool cond = close > open and close[1] > open[1]
int  count = ta.barssince(cond[1]) + 1
bool trigger = cond and count > lengthInput
plot(cond ? 0 : count, "Count", display = display.data_window)
plotchar(cond)
plotchar(trigger, "", "O", color = color.red)