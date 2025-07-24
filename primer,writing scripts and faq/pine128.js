//@version=6
indicator("Value abbreviation example")

// @function            Converts a numeric value into a readable string representation featuring the appropriate order
//                          of magnitude abbreviation (K, M, B, T).
// @param value         (float) The value to format.
// @param precision         (string) The numerical precision of the result. ("" for none, ".00" for two digits, etc.)
// @returns                 (string) The formatted value as a string with the appropriate abbreviation suffix.
abbreviateValue(float value, string precision) =>
    float digitsAmt = math.log10(math.abs(value))
    string formatPrecision = "#" + precision
    string result = switch
        digitsAmt > 12 => str.tostring(value / 1e12, formatPrecision + "  T")
        digitsAmt > 9  => str.tostring(value / 1e9,  formatPrecision + "  B")
        digitsAmt > 6  => str.tostring(value / 1e6,  formatPrecision + "  M")
        digitsAmt > 3  => str.tostring(value / 1e3,  formatPrecision + "  K")
        =>                str.tostring(value, "#" +  formatPrecision)

print(formattedString) =>
    var table t = table.new(position.middle_right, 1, 1)
    table.cell(t, 0, 0, formattedString, bgcolor = color.yellow)

print(abbreviateValue(volume, ".00"))