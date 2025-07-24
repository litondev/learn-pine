//@version=6
indicator("Eliminating loops demo")

//@variable The number of bars in the calculation.
int lengthInput = input.int(20, "Length", 1)

//@function Calculates the average difference between the current `source` and `length` previous `source` values.
avgDifference(float source, int length) =>
    float diffSum = 0.0
    for i = 1 to length
        diffSum += source - source[i]
    diffSum / length

plot(avgDifference(close, lengthInput))