//@version=6
indicator("Plotting without affecting the scale demo", "Weighted average", true, precision = 5)

//@variable The number of bars in the average.
int lengthInput = input.int(20, "Length", 1)

//@variable The weight applied to the price on each bar.
float weight = math.pow(close - open, 2)

//@variable The numerator of the average.
float numerator = math.sum(weight * close, lengthInput)
//@variable The denominator of the average.
float denominator = math.sum(weight, lengthInput)

//@variable The weighted average over `lengthInput` bars.
float average = numerator / denominator

// Plot the `average`.
plot(average, "Weighted average", linewidth = 3)

// Create debug plots for the `weight`, `numerator`, and `denominator`.
plot(weight,      "weight",      color.purple)
plot(numerator,   "numerator",   color.teal)
plot(denominator, "denominator", color.maroon)