//@version=6
indicator("Storing calculated values demo", overlay = true)

//@variable The number of bars in the weighted average calculation.
int lengthInput = input.int(50, "Length", 1, 5000)
//@variable Window coefficient. 
float coefInput = input.float(0.5, "Window coefficient", 0.0, 1.0, 0.01)

//@variable The sum of weighted `close` prices.
float numerator = 0.0
//@variable The sum of weights.
float denominator = 0.0

//@variable The angular step in the cosine calculation.
float step = 2.0 * math.pi / lengthInput
// Accumulate weighted sums.
for i = 0 to lengthInput - 1
    float weight = coefInput - (1 - coefInput) * math.cos(step * i)
    numerator += close[i] * weight
    denominator += weight

// Plot the weighted average result.
plot(numerator / denominator, "Weighted average", color.purple, 3)