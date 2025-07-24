//@version=6
indicator("Array elements in a label tooltip", overlay = true)

// Create two arrays to hold the MA values.
var array<float> fastMaValues = array.new<float>(3)
var array<float> slowMaValues = array.new<float>(3)

// Calculate the MAs.
float fastMa = ta.ema(close, 9)
float slowMa = ta.ema(close, 21)

// Load the current MA values into the arrays.
fastMaValues.push(math.round(fastMa,2)), slowMaValues.push(math.round(slowMa,2))
// Remove the first element to keep the arrays at the same size.
fastMaValues.shift(),  slowMaValues.shift()
// Define the string to print in the label tooltip.
string labelString = str.format("Fast MA array: {0}\n  Slow MA array: {1}\n  Crossed this bar? {2}",
  str.tostring(fastMaValues),
  str.tostring(slowMaValues),
  ta.cross(fastMa, slowMa))
//Print the labels.
label.new(bar_index, high, text="", color=color.new(chart.fg_color,90), textcolor = chart.fg_color, tooltip=labelString)

plot(fastMa, "Fast MA", color.aqua)
plot(slowMa, "Slow MA", color.orange)