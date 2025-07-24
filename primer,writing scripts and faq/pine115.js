//@version=6
indicator("Example: `for...in` loop", overlay = true)

// @function            Queues a new `value` at the end of the `id` array and removes
//                      the first element if the array size exceeds the specified `maxSize`.
// @param id            (<any array type>) The array in which to queue the element.
// @param maxSize       (int) The maximum allowed number of elements in the array.
//                      If the array exceeds this size, the first element is removed.
// @param value         (<type of the array>) The new element to add to the array.
// @returns             (<type of the array>) The removed element.
arrayQueue(id, int maxSize, value) =>
    id.push(value)
    if id.size() > maxSize
        id.shift()

// @function                Adds a new horizontal line to an array at a certain pivot level and removes the oldest line.
// @param id                (array<line>) The array to which to add the new line.
// @param pivot             (float) The price level at which to draw the horizontal line.
// @param numLines          (int) The number of lines to keep in the queue.
// @param lineColor         (color) The color of the line to draw.
// @returns                 (void) The function has no explicit return.
queueLine(array<line> id, float pivot, int numLines, color lineColor) =>
    if not na(pivot)
        arrayQueue(id, numLines, line.new(bar_index - 10, pivot, bar_index, pivot, color = lineColor))

// @function                Extends the endpoint (`x2`) of each line in an array to the current `bar_index`.
// @param id                (array<line>) The array containing the line objects to update.
// @returns                 (void) The function has no explicit return.
extendLines(array<line> id) =>
    for eachLine in id
        eachLine.set_x2(bar_index)

// @function                Adjusts the color of each line in an array. If the `close` is above the line, the line is 
//                          set to `bullColor` (support), else, `bearColor` (resistance).
// @param id                (array<line>) The array containing the line objects.
// @param bullColor         (color) The color to apply to the line if `close` is equal to or higher than the line's price.
// @param bearColor         (color) The color to apply to the line if `close` is below the line's price.
// @returns                 (void) The function has no explicit return.
colorLines(array<line> id, color bullColor, color bearColor) =>
    for eachLine in id
        if close >= eachLine.get_price(bar_index)
            eachLine.set_color(bullColor)
        else
            eachLine.set_color(bearColor)

// Find the pivot high and pivot low prices.
float pivotLo = ta.pivotlow(10,  10)
float pivotHi = ta.pivothigh(10, 10)

// Initialize two arrays on the first bar to queue our lines in.
var array<line> pivotHiArray = array.new<line>(), var array<line> pivotLoArray = array.new<line>()

// If a pivot occurs, draw a line from the pivot to the current bar, add it to the queue, and remove the oldest line.
queueLine(pivotHiArray, pivotHi, 4, color.orange), queueLine(pivotLoArray, pivotLo, 4, color.aqua)

// Extend all lines in each array to the current bar on each bar.
extendLines(pivotHiArray), extendLines(pivotLoArray)

// Set the color of lines as support or resistance by checking if the closing price is above or below the lines.
colorLines(pivotHiArray, color.aqua, color.orange)
colorLines(pivotLoArray, color.aqua, color.orange)