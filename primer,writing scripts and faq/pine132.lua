//@version=6
indicator("`na` values on first bar demo")

bool useNzInput = input.bool(true, "Use `nz` to ensure value is never na")

// This variable is na on the first bar.
float barRangeRaw = close - close[1]
// This variable is never na.
float barRangeWithNz = close - nz(close[1], open)
// Choose the value to use based on the input
float barRange = useNzInput ? barRangeWithNz : barRangeRaw

// Perform a calculation that depends on the barRange
var float dependentCalculation = 0
dependentCalculation := ((dependentCalculation + barRange)/2)
// Plot the results
plot(dependentCalculation, title="Average Bar Range")