//@version=6
indicator("Different tick values example", overlay = true, precision = 10)

// @function Rounds each OHLC value to the nearest minimum tick size.
// @returns  A tuple containing the rounded values.
OHLCToMinTick() =>
    [math.round_to_mintick(open), math.round_to_mintick(high), math.round_to_mintick(low), math.round_to_mintick(close)]

//@function Checks whether two float values are equal or not.
//@param    v1 (series float) The first value to compare.
//@param    v2 (series float) The second value to compare.
//@returns  The color blue if the values are equal or red otherwise.
getTickColor(series float v1, series float v2) =>
    color result = v1 != v2 ? color.red : color.blue

// Round each OHLC value to the nearest mintick size.
[o, h, l, c] = OHLCToMinTick()

// Plot the original and rounded values of each OHLC component in the data window.
// If a value and its rounded counterpart are not equal, color the plot red. Otherwise, color it blue.
plot(o,     "o",     getTickColor(o, open),  display = display.data_window)
plot(open,  "open",  getTickColor(o, open),  display = display.data_window)
plot(h,     "h",     getTickColor(h, high),  display = display.data_window)
plot(high,  "high",  getTickColor(h, high),  display = display.data_window)
plot(l,     "l",     getTickColor(l, low),   display = display.data_window)
plot(low,   "low",   getTickColor(l, low),   display = display.data_window)
plot(c,     "c",     getTickColor(c, close), display = display.data_window)
plot(close, "close", getTickColor(c, close), display = display.data_window)

// If any of the original and rounded values of OHLC components are not equal, set the background color to red.
bgcolor(o != open or h != high or l != low or c != close ? color.new(color.red, 90) : na)