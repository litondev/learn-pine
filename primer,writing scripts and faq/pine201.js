//@version=6
indicator("Variable operators demo", overlay = true)

// Define two variables `a` and `b` using `=`, representing the high and low of each bar.
float a = high
float b = low

// Define the initial line color as lime
color lineColor = color.lime

// When there are fewer than 10 bars left on the chart,  use `:=` to update `a` to `b` and change the line color.
if last_bar_index - bar_index < 10
    a := b
    lineColor := color.fuchsia

// Plot the variable 'a' to visualize its change in value. 
// Initially, 'a' represents the 'high' of each bar. 
// If there are fewer than 10 bars remaining in the chart, 'a' is updated to represent the 'low' of each bar.
plot(a, "Our line", lineColor, 2)

// Plot a checkmark character whenever `a` is equal to `b`.
plotchar(a == b, "a equals b", "✅", location.bottom)

// Plot a cross character whenever `a` is not equal to `b`.
plotchar(a != b, "a does not equal b", "❌", location.bottom)