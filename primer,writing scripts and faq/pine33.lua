//@version=6
indicator("Displaying collection strings demo")

//@variable The length of the EMA.
int lengthInput = input.int(20, "EMA length", 1)

//@variable An array of `close` prices requested for the chart's symbol at the 1-minute timeframe.
array<float> intrabarPrices = request.security_lower_tf("", "1", close)

//@variable The average `close` price of the intrabars within the current chart bar.
float avgPrice = intrabarPrices.avg()
//@variable The bar's total range. 
float barRange = high - low

//@variable The difference between `close` and `avgPrice`, normalized by the `barRange`.
float ratio = (close - avgPrice) / barRange
//@variable The EMA of the `ratio`.
float smoothed = ta.ema(ratio, lengthInput)

// Plot the `ratio` series as conditionally-colored columns.
plot(ratio, "", ratio > 0 ? color.teal : color.maroon, 1, plot.style_columns)
// Display the `smoothed` series as a translucent orange area plot. 
plot(smoothed, "", color.new(color.orange, 40), 1, plot.style_area)

//@variable A "string" representation of `intrabarPrices`, `intrabarPrices.size()`, and the `avgPrice`.
string debugText = str.format(
     "\nintrabarPrices: {0}\nsize: {1}\navgPrice: {2,number,#.#####}", 
     str.tostring(intrabarPrices), intrabarPrices.size(), avgPrice
 )

// Log the `debugText` with the "info" or "warning" level, depending on whether the bar is confirmed. 
switch
    barstate.isconfirmed => log.info(debugText)
    =>                      log.warning(debugText)