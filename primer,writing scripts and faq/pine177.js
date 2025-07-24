//@version=6
indicator("Update x2 demo", "", true)

int activeLevelsInput = input.int(10, "Number of levels")
int pivotLegsInput    = input.int(5,  "Pivot length")

// Save pivot prices.
float pHi = ta.pivothigh(pivotLegsInput, pivotLegsInput)
// Initialize an array for lines on the first bar, sized to match the number of levels to track.
var array<line> pivotLines = array.new<line>(activeLevelsInput)

// Check for a pivot. Add a new line to the array. Remove and delete the oldest line.
if not na(pHi)
    line newPivotLine = line.new(bar_index[pivotLegsInput], pHi, bar_index, pHi)
    pivotLines.push(newPivotLine)
    pivotLines.shift().delete()

// Update all line x2 values.
if barstate.islast
    for eachLine in pivotLines
        eachLine.set_x2(bar_index)