//@version=6
indicator("Extraction using return expressions demo", overlay = true)

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
    // To extract `upperRange` and `lowerRange` values, we need to make them accessible to the function's main scope.
    // Here, we added a tuple at the end of the `if` statement's local block, then declared a tuple in the function's 
    // scope to hold the returned values.
    [upper, lower] = if not na(source)
        float upperRange = source - q3
        float lowerRange = q1 - source
        outerRange := math.max(upperRange, lowerRange, 0.0)
        [upperRange, lowerRange]
    //@variable The total range of `source` values over `length` bars.
    float totalRange = ta.range(source, length)
    //@variable Half the ratio of the `outerRange` to the `totalRange`.
    float alpha = 0.5 * outerRange / totalRange
    // Mix the `source` with the `result` based on the `alpha` value.
    result := (1.0 - alpha) * nz(result, source) + alpha * source
    // Return a tuple containing the `result` and other local variables.
    [result, q1, q3, upper, lower, outerRange, totalRange, alpha]

//@variable The `customMA()` of `close` over `lengthInput` bars. 
[maValue, q1Dbg, q3Dbg, upperDbg, lowerDbg, outerRangeDbg, totalRangeDbg, alphaDbg] = customMA(close, lengthInput)

// Plot the `maValue`.
plot(maValue, "Custom MA", color.blue, 3)

// When the bar is confirmed, log an "info" message containing formatted debug information for each variable. 
if barstate.isconfirmed
    log.info(
         "maValue: {0,number,#.#####}\nq1Dbg: {1,number,#.#####}, q3Dbg: {2,number,#.#####}
         \nupperDbg: {3,number,#.#####}, lowerDbg: {4,number,#.#####}
         \nouterRangeDbg: {5,number,#.#####}, totalRangeDbg: {6,number,#.#####}
         \nalphaDbg: {7,number,#.#####}", 
         maValue, q1Dbg, q3Dbg, upperDbg, lowerDbg, outerRangeDbg, totalRangeDbg, alphaDbg
     )

// Display the extracted `q1` and `q3` data in all plot locations.
plot(q1Dbg, "q1Dbg", color.new(color.maroon, 50))
plot(q3Dbg, "q3Dbg", color.new(color.teal, 50))
// Highlight the chart's background when the extracted `alpha` value is 0.
bgcolor(alphaDbg == 0.0 ? color.new(color.orange, 90) : na, title = "`alpha == 0.0` highlight")