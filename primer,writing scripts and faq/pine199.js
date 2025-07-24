//@version=6
indicator("Var keyword example")

// Declare and initialize a persistent variable by using `var`.
var float a = 0
// Declare and initialize a normal float variable.
float b = 0

// Reset the values of a and b whenever a new day begins.
if timeframe.change("D")
    a := 0
    b := 0

// Add the current volume to both a and b.
a += volume
b += volume

// Plot the values of `a` and `b`. The value of `a` accumulates over time; `b` is reinitialized at every bar.
plot(a, "a", close > open ? #089981 : #f23645, style = plot.style_columns)
plot(b, "b", color.yellow)