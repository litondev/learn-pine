//@version=6
indicator("Collecting loop information demo", "Average ROC", max_labels_count = 500)

//@variable The number of bars in the calculation.
int lookbackInput = input.int(20, "Lookback", 1)

//@variable An array containing the `roc` value from each loop iteration.
array<float> debugValues = array.new<float>()
//@variable A string containing information about the `roc` value on each iteration.
string logText = ""

//@variable The average ROC of `close` over lags from 1 to `lookbackInput` bars.
float aroc = 0.0

// Calculation loop.
for length = 1 to lookbackInput
    //@variable The `close` value `length` bars ago.
    float pastClose = close[length]
    //@variable The `close` rate of change over `length` bars.
    float roc = (close - pastClose) / pastClose
    // Add the `roc` to `aroc`.
    aroc += roc

    // Concatenate a new "string" representation with the `debugText`.
    logText += "\nlength: " + str.tostring(length) + ", roc: " + str.tostring(roc)
    // Push the `roc` value into the `debugValues` array.
    array.push(debugValues, roc)

// Divide `aroc` by the `lookbackInput`.
aroc /= lookbackInput

// Plot the `aroc`.
plot(aroc, "aroc", color.blue, 3)

// Log the `logText` in the Pine Logs pane when the bar is confirmed.
if barstate.isconfirmed
    log.info(logText)

// Draw a label with a tooltip containing a "string" representation of the `debugValues` array.
label.new(bar_index, aroc, color = color.new(color.blue, 70), tooltip = str.tostring(debugValues))

// Plot the `roc` values from the first and last iteration.
plot(array.first(debugValues), "First iteration roc", color.new(color.teal, 50), 2)
plot(array.last(debugValues), "Last iteration roc", color.new(color.maroon, 50), 2)