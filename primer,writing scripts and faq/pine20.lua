//@version=6
indicator("Plotting and coloring conditions demo")

//@variable The length of the RSI.
int lengthInput = input.int(14, "Length", 1)

//@variable The calculated RSI value.
float rsi = ta.rsi(close, lengthInput)

//@variable Is `true` when the `rsi` crosses below 30, `false` otherwise.
bool crossBelow = ta.crossunder(rsi, 30.0)

// Plot the `rsi`.
plot(rsi, "RSI", color.rgb(136, 76, 146), linewidth = 3)

// Plot a circle near the top of the pane when `crossBelow` is `true`.
// The status line and Data Window show 1 when the condition is `true` and 0 when it is `false`.
plotshape(crossBelow, "plotshape debug", shape.circle, location.top, color.red, size = size.small)

// Plot the `⤰` character at the `rsi` value when `crossBelow` is `true`. 
// The status line and Data Window show the `rsi` value when the condition is `true` and `na` when it is `false`.
plotchar(crossBelow ? rsi : na, "plotchar debug", "⤰", location.absolute, color.maroon, size = size.normal)

// Highlight the background when `crossBelow` is `true`. Does not add information to the status line or Data Window.
bgcolor(crossBelow ? color.new(color.red, 60) : na, title = "bgcolor debug")