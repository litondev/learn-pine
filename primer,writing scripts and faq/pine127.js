//@version=6
indicator("Round to x increment demo", overlay = true)

float incrementInput = input.float(0.75, "Increment", step = 0.25)

// @function                Rounds a value to the nearest multiple of a specified increment.
// @param value             The value to round.
// @param increment         The increment to round the value to.
// @returns                 The rounded value.
roundToIncrement(value, increment) =>
    math.round(value / increment) * increment

plot(series = roundToIncrement(close, incrementInput), color = chart.fg_color)