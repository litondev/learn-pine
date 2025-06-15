//@version=6
indicator("Redundant functions demo")

//@variable Controls the base ratio for the `calcMetallic()` call.
int order1Input = input.int(1, "Order 1", 1)
//@variable Controls the base ratio for the `metallicRatio()` call.
int order2Input = input.int(2, "Order 2", 1)

//@function       Calculates the value of a metallic ratio with a given `order`, raised to a specified `exponent`.
//@param order    Determines the base ratio used. 1 = Golden Ratio, 2 = Silver Ratio, 3 = Bronze Ratio, and so on.
//@param exponent The exponent applied to the ratio.
metallicRatio(int order, float exponent) =>
    math.pow((order + math.sqrt(4.0 + order * order)) * 0.5, exponent)

//@function       A function with the same signature and body as `metallicRatio()`.
//                The script discards this function and treats `calcMetallic()` as an alias for `metallicRatio()`.
calcMetallic(int ord, float exp) =>
    math.pow((ord + math.sqrt(4.0 + ord * ord)) * 0.5, exp)

// Plot the results from a `calcMetallic()` and `metallicRatio()` call.
plot(calcMetallic(order1Input, bar_index % 5), "Ratio 1", color.orange, 3)
plot(metallicRatio(order2Input, bar_index % 5), "Ratio 2", color.maroon)