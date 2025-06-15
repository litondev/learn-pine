//@version=6
indicator("Changing historical values demo", overlay = true)
// Initialize a variable to hold the value of the current bar's high.
series float a = high
// Reassign the *previous* value of the series `a` to hold the low of the current bar.
a[1] := low  // This line causes a compilation error.
plot(a, color = chart.fg_color, linewidth = 3)