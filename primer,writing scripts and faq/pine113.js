//@version=6
indicator("Array as a stack", overlay = true)

// @function                Adds a new horizontal line to an array of lines at a specified pivot level.
// @param id                (array<line>) The array to which to add the new line.
// @param pivot             (float) The price level at which to draw the horizontal line.
// @param lineColor         (color) The color of the line.
// @returns                 (void) The function has no explicit return.
stackLine(array<line> id, float pivot, color lineColor) =>
    if not na(pivot)
        array.push(id, line.new(bar_index - 10, pivot, bar_index, pivot, color = lineColor))

// @function                Extends the endpoint (`x2`) of each line in an array to the current `bar_index`.
// @param id                (array<line>) The array containing the line objects to update.
// @returns                 (void) The function has no explicit return.
extendLines(array<line> id) =>
    for eachLine in id
        eachLine.set_x2(bar_index)

// @function                Removes line objects from an array if they are above or below the current bar's high or low.
// @param id                (array<line>) The array from which to remove line objects.
// @param isBull            (bool) If true, remove bullish pivot lines below the high price;
//                          if false, remove bearish pivot line above the low price.
// @returns                 (void) The function has no explicit return.
removeLines(array<line> id, bool isBull) =>
    if array.size(id) > 0
        float linePrice = line.get_price(array.last(id), bar_index)
        if isBull ? high > linePrice : low < linePrice
            array.pop(id)
    line(na)

// Find the pivot high and pivot low prices.
float pivotLo = ta.pivotlow(10,  10), float pivotHi = ta.pivothigh(10, 10)

// Initialize two arrays on the first bar to stack our lines in.
var array<line> pivotHiArray = array.new<line>()
var array<line> pivotLoArray = array.new<line>()

// If a pivot occurs, draw a line from the pivot to the current bar and add the line to the stack.
stackLine(pivotHiArray, pivotHi, color.orange)
stackLine(pivotLoArray, pivotLo, color.aqua)

// Extend all lines in each array to the current bar on each bar.
extendLines(pivotHiArray)
extendLines(pivotLoArray)

// Check the final element of each array to see if price exceeded the pivot lines.
// Pop the line off the stack if it was exceeded.
removeLines(pivotHiArray, true)
removeLines(pivotLoArray, false)