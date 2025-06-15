//@version=6
indicator("Extraction using reference types demo", overlay = true)

//@variable The number of bars in the `customMA()` calculation.
int lengthInput = input.int(50, "Length", 2)

//@variable A global map of "string" keys and "float" values to store debug information from local scopes. 
var map<string, float> debugData = map.new<string, float>()

//@function      Calculates a moving average that changes only when `source` is outside the first and third quartiles.
//@param source  The series of values to process.
//@param length  The number of bars in the quartile calculation.
//@returns       The adaptive moving average value.
customMA(float source, int length) =>
    //@variable The custom moving average.
    var float result = na
    // Calculate the 25th and 75th percentiles (first and third quartiles).
    float q1 = ta.percentile_linear_interpolation(source, length, 25),      debugData.put("q1", q1)
    float q3 = ta.percentile_linear_interpolation(source, length, 75),      debugData.put("q3", q3)
    //@variable The distance from `source` to its interquartile range. 
    float outerRange = 0.0
    // Calculate the `outerRange` value when `source` is not `na`.
    if not na(source)
        float upperRange = source - q3,                                     debugData.put("upperRange", upperRange)
        float lowerRange = q1 - source,                                     debugData.put("lowerRange", lowerRange)
        outerRange := math.max(upperRange, lowerRange, 0.0),                debugData.put("outerRange", outerRange)
    //@variable The total range of `source` values over `length` bars.
    float totalRange = ta.range(source, length),                            debugData.put("totalRange", totalRange)
    //@variable Half the ratio of the `outerRange` to the `totalRange`.
    float alpha = 0.5 * outerRange / totalRange,                            debugData.put("alpha", alpha)
    // Mix the `source` with the `result` based on the `alpha` value.
    result := (1.0 - alpha) * nz(result, source) + alpha * source
    // Return the `result`.
    result

//@variable The `customMA()` of `close` over `lengthInput` bars. 
float maValue = customMA(close, lengthInput)

// Plot the `maValue`.
plot(maValue, "Custom MA", color.blue, 3)

// When the bar is confirmed, log an "info" message containing formatted debug information for each value. 
if barstate.isconfirmed
    log.info(
         "maValue: {0,number,#.#####}\nq1: {1,number,#.#####}, q3: {2,number,#.#####}
         \nupperRange: {3,number,#.#####}, lowerRange: {4,number,#.#####}
         \nouterRange: {5,number,#.#####}, totalRange: {6,number,#.#####}
         \nalpha: {7,number,#.#####}", 
         maValue, debugData.get("q1"), debugData.get("q3"), debugData.get("upperRange"), debugData.get("lowerRange"), 
         debugData.get("outerRange"), debugData.get("totalRange"), debugData.get("alpha")
     )

// Display the extracted `q1` and `q3` data in all plot locations.
plot(debugData.get("q1"), "q1", color.new(color.maroon, 50))
plot(debugData.get("q3"), "q3", color.new(color.teal, 50))
// Highlight the chart's background when the extracted `alpha` value is 0.
bgcolor(debugData.get("alpha") == 0.0 ? color.new(color.orange, 90) : na, title = "`alpha == 0.0` highlight")