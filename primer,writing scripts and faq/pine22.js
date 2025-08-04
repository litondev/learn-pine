//@version=6
indicator("Plotting and coloring compound conditions demo")

//@variable The length of the RSI and median RSI calculations.
int lengthInput = input.int(14, "Length", 2)

//@variable The RSI over `lengthInput` bars.
float rsi = ta.rsi(close, lengthInput)
//@variable The median of the `rsi` over `lengthInput` bars.
float median = ta.median(rsi, lengthInput)

//@variable Condition #1: Is `true` when the 1-bar `rsi` change switches from 1 to -1.
bool changeNegative = ta.change(math.sign(ta.change(rsi))) == -2
//@variable Condition #2: Is `true` when the previous bar's `rsi` is greater than 70.
bool prevAbove70 = rsi[1] > 70.0
//@variable Condition #3: Is `true` when the current `close` is lower than the previous bar's `open`.
bool closeBelow = close < open[1]
//@variable Condition #4: Is `true` when the `rsi` is between 60 and 70.
bool betweenLevels = bool(math.max(70.0 - rsi, 0.0) * math.max(rsi - 60.0, 0.0))
//@variable Condition #5: Is `true` when the `rsi` is above the `median`.
bool aboveMedian = rsi > median

//@variable Is `true` when the first condition occurs alongside conditions 2 and 3 or 4 and 5.
bool compundCondition = changeNegative and ((prevAbove70 and closeBelow) or (betweenLevels and aboveMedian))
 
//Plot the `rsi` and the `median`.
plot(rsi, "RSI", color.teal, 3)
plot(median, "RSI Median", color.gray, 2)

// Highlight the background red when the `compundCondition` occurs.
bgcolor(compundCondition ? color.new(color.red, 60) : na, title = "compundCondition")

// Use `plotshape()` to show `compundCondition` values in the status line and Data Window.
plotshape(
     compundCondition, "compundCondition (1 and (2 and 3) or (4 and 5))", 
     color = chart.fg_color, display = display.all - display.pane
 )

// Plot characters on the chart and numbers in the status line and Data Window when conditions 1-5 occur.
plotchar(changeNegative, "changeNegative (1)", "", location.top, text = "1",         textcolor = chart.fg_color)
plotchar(prevAbove70,    "prevAbove70 (2)",    "", location.top, text = "\n2",       textcolor = chart.fg_color)
plotchar(closeBelow,     "closeBelow (3)",     "", location.top, text = "\n\n3",     textcolor = chart.fg_color)
plotchar(betweenLevels,  "betweenLevels (4)",  "", location.top, text = "\n\n\n4",   textcolor = chart.fg_color)
plotchar(aboveMedian,    "aboveMedian (5)",    "", location.top, text = "\n\n\n\n5", textcolor = chart.fg_color)