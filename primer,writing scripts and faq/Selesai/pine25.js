//@version=6
indicator("Extracting from local scopes initial demo", overlay = true)

//@variable The number of bars in the `customMA()` calculation.
int lengthInput = input.int(50, "Length", 2)

//@function      Calculates a moving average that changes only when `source` is outside the first and third quartiles.
//@param source  The series of values to process.
//@param length  The number of bars in the quartile calculation.
//@returns       The adaptive moving average value.
customMA(float source, int length) =>
    //@variable The custom moving average.
    var float result = na
    // Calculate the 25th and 75th `source` percentiles (first and third quartiles) over `length` bars.
    float q1 = ta.percentile_linear_interpolation(source, length, 25)
    float q3 = ta.percentile_linear_interpolation(source, length, 75)
    //@variable The distance from `source` to its interquartile range. 
    float outerRange = 0.0
    // Calculate the `outerRange` value when `source` is not `na`.
    if not na(source)
        float upperRange = source - q3
        float lowerRange = q1 - source
        outerRange := math.max(upperRange, lowerRange, 0.0)
    //@variable The total range of `source` values over `length` bars.
    float totalRange = ta.range(source, length)
    //@variable Half the ratio of the `outerRange` to the `totalRange`.
    float alpha = 0.5 * outerRange / totalRange
    // Mix the `source` with the `result` based on the `alpha` value.
    result := (1.0 - alpha) * nz(result, source) + alpha * source
    // Return the `result`.
    result

//@variable The `customMA()` of `close` over `lengthInput` bars. 
float maValue = customMA(close, lengthInput)

// Plot the `maValue`.
plot(maValue, "Custom MA", color.blue, 3)