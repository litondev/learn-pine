//@version=6
indicator("Tracing loop executions demo", "Binomial sample")

//@variable The probability that each random trial succeeds.
float probabilityInput = input.float(0.5, "Success probability", 0.0, 1.0)
//@variable The number of random trials to test.
float trialsInput = input.int(10, "Trials", 1)

//@variable Random sample from a binomial distribution, i.e., the number of successes from `trialsInput` random trials.
int sample = 0

// Execute `trialsInput` loop iterations to calculate the `sample`.
for trial = 1 to trialsInput
    //@variable A pseudorandom value between 0 and 1.
    float randValue = math.random()
    //@variable `true` if the `randValue` is less than or equal to the `probabilityInput`, `false` otherwise. 
    bool success = randValue <= probabilityInput
    // Skip the rest of the iteration if `success` is `false`. 
    if not success
        continue
    // Otherwise, add 1 to the `sample`. 
    sample += 1

// Plot the `sample` as teal columns. 
plot(sample, "Binomial sample", color.teal, 1, plot.style_columns)