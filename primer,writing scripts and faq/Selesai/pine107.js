//@version=6
indicator("Array example")
// Declare an array with 5 `na` values on the first bar.
var array<float> pricesArray = array.new<float>(5)
// On each bar, add a new value to the end of the array and remove the first (oldest) element.
array.push(pricesArray, close)
array.shift(pricesArray)
// Display the array and its contents in a table.
var table displayTable = table.new(position.middle_right, 1, 1)
if barstate.islast
    table.cell(displayTable, 0, 0, str.tostring(pricesArray), text_color = chart.fg_color)