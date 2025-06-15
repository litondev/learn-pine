//@version=6
indicator("Collecting loop information demo", "Average ROC")

//@variable The number of past bars in the calculation.
int lookbackInput = input.int(20, "Lookback", 1)

//@variable The average ROC of `close` prices over each length from 1 to `lookbackInput` bars.
float aroc = 0.0

// Calculation loop.
for length = 1 to lookbackInput
    //@variable The `close` value `length` bars ago.
    float pastClose = close[length]
    //@variable The `close` rate of change over `length` bars.
    float roc = (close - pastClose) / pastClose
    // Add the `roc` to the `aroc` value.
    aroc += roc

// Divide `aroc` by the `lookbackInput` to get the average.
aroc /= lookbackInput

// Plot the `aroc` series.
plot(aroc, "aroc", color.blue, 3)