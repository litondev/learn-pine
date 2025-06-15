//@version=6
indicator("Changing historical values demo", overlay = true)
// Initialize a variable to hold the value of the current bar's high.
series float a = high
// Reassign the *current* value of the series `a` to hold the high of the *previous* bar.
a := high[1]
plot(a, color = chart.fg_color, linewidth = 3)