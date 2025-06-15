//@version=6
indicator("Max pivot demo", "", true)
// Create inputs to specify the pivot legs and the number of last pivots to keep to compare.
int pivotLengthInput = input.int(5, "Pivot length", minval = 1)
int numPivotsInput   = input.int(3, "Number of pivots to check")
// Initialize an array with a size based on the number of recent pivots to evaluate.
var array<float> pivotsArray = array.new<float>(numPivotsInput)
// Find the pivot value and set up a condition to verify if a value has been found.
float ph = ta.pivothigh(pivotLengthInput, pivotLengthInput)
bool newPH = not na(ph)
// When a new pivot is found, add it to the array and discard the oldest value.
if newPH
    pivotsArray.push(ph)
    pivotsArray.shift()
// Display the max value from the array on the chart, along with markers indicating the positions and detection times of the pivot highs.
plot(pivotsArray.max())
plotchar(newPH, "newPH", "•", location.abovebar, offset = - pivotLengthInput)
plotchar(newPH, "newPH", "▲", location.top)