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

//@function A faster way to calculate the `avgDifference()` result. 
//          Eliminates the `for` loop using the relationship: 
//          `(x - x[1]) + (x - x[2]) + ... + (x - x[n]) = x * n - math.sum(x, n)[1]`.
fastAvgDifference(float source, int length) =>
    (source * length - math.sum(source, length)[1]) / length

plot(avgDifference(close, lengthInput))
plot(fastAvgDifference(close, lengthInput))