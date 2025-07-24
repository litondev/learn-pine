//@version=6
indicator("Tracing loop executions demo")

//@variable The probability that each random trial succeeds.
float probabilityInput = input.float(0.5, "Success probability", 0.0, 1.0)
//@variable The number of random trials to test.
float trialsInput = input.int(10, "Trials", 1)

//@variable Random sample from a binomial distribution, i.e., the number of successes from `trialsInput` random trials.
int sample = 0

// Log a message to mark the point before the start of the loop.
log.warning("---------------- LOOP START (bar {0,number,#})", bar_index)

// Execute `trialsInput` loop iterations to calculate the `sample`.
for trial = 1 to trialsInput
    //@variable A pseudorandom value between 0 and 1.
    float randValue = math.random()
    //@variable `true` if the `randValue` is less than or equal to the `probabilityInput`, `false` otherwise. 
    bool success = randValue <= probabilityInput
    // Log a message containing the `trial`, `randValue`, and `success` information. 
    log.info("trial: {0}, randValue: {1,number,#.########}, success: {2}", trial, randValue, success)
    // Skip the rest of the iteration if `success` is `false`. 
    if not success
        // Log a message before the `continue` statement. 
        log.warning("CONTINUE")
        continue
    // Otherwise, add 1 to the `sample`. 
    sample += 1
    // Log a message showing the iteration's `sample` value. 
    log.info("sample: {0}", sample)

// Log a message to mark the point after the loop ends. 
log.warning("---------------- LOOP END\n\n")

// Plot the `sample` as teal columns. 
plot(sample, "Binomial sample", color.teal, 1, plot.style_columns)