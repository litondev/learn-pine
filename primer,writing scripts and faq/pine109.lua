//@version=6
indicator("Object example", overlay = true)

// Create the pivot type with 3 fields: the x coordinate, the y coordinate, and a formatted time string.
type pivot
    int x
    float y
    string pivotTime
// Check for new pivots. `ta.pivotHigh` returns the price of the pivot.
float pivFound = ta.pivothigh(10, 10)
// When a pivot is found, create a new pivot object and generate a label using the values from its fields.
if not na(pivFound)
    pivot pivotObject = pivot.new(bar_index - 10, pivFound, str.format_time(time[10], "yyyy-MM-dd HH:mm"))
    label.new(pivotObject.x, pivotObject.y, pivotObject.pivotTime, textcolor = chart.fg_color)