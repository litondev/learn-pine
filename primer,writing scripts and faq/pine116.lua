//@version=6
indicator("Example: `for...in` loop with index")
// Create an array of random integers above and below 0.
var valuesArray = array.from(4, -8, 11, 78, -16, 34, 7, 99, 0, 55)
// Create an array to track the positive state of each integer.
var isPos = array.new_bool(10, false)

// Iterate over the valuesArray using a `for...in` loop and update each corresponding element in the bool array to true
// if the value is above 0, or false if it is below 0.
for [i, eachValue] in valuesArray
    if eachValue > 0
        array.set(isPos, i, true)

// Print both arrays in a label on the last historical bar.
if barstate.islastconfirmedhistory
    label.new(bar_index +1, high, str.tostring(valuesArray) + "\n" + str.tostring(isPos), style = label.style_label_left, textcolor = chart.fg_color)