//@version=6
indicator("Update x2 demo", "", true)

int activeLevelsInput = input.int(10, "Number of levels")
int pivotLegsInput    = input.int(5,  "Pivot length")

// Save pivot prices.
float pHi = ta.pivothigh(pivotLegsInput, pivotLegsInput)

// Check for a pivot. Delete the oldest line if the array is over the "Number of levels" limit.
if not na(pHi)
    line newPivotLine = line.new(bar_index[pivotLegsInput], pHi, bar_index, pHi)
    if line.all.size() > activeLevelsInput
        line.all.first().delete()

// Update all line x2 values.
if barstate.islast
    for eachLine in line.all
        eachLine.set_x2(bar_index)