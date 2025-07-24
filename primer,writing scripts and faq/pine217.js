//@version=6
indicator("Date of High/Low", overlay = true)

int lengthInput = input.int(20)

// Create labels. They do not display until the na values for the time and price are updated with new values. 
var label hiLabel = label.new(na, na, "", color = na, textcolor = color.lime)
var label loLabel = label.new(na, na, "", color = na, textcolor = color.fuchsia)
// Find the highest and lowest values over the input lookback and the bars on which they occurred.
float hiValue  = ta.highest(lengthInput), float loValue  = ta.lowest(lengthInput)
float hiOffset = ta.highestbars(lengthInput), float loOffset = ta.lowestbars(lengthInput)

// If the high or low occur on the current bar, update the label and time variables.
if hiOffset == 0
    label.set_xy(hiLabel, bar_index, hiValue)
    label.set_text(hiLabel, str.format_time(time, "YYYY.MM.dd @ HH:mm:ss"))
if loOffset == 0
    label.set_xy(loLabel, bar_index, loValue)
    label.set_text(loLabel, str.format_time(time, "YYYY.MM.dd @ HH:mm:ss"))

// Plot the highest and lowest values.
plot(hiValue,            "High",              color.lime)
plot(loValue,            "Low",               color.fuchsia)