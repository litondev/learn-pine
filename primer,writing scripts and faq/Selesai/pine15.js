//@version=6
indicator("Plotting numbers demo")

//@variable The length of each oscillator.
int lengthInput = input.int(20, "Length", 2)

//@variable The correlation between `close` and `bar_index` over `lengthInput` bars.
float osc1 = ta.correlation(close, bar_index, lengthInput)
//@variable The RSI of `close` over `lengthInput` bars, scaled to the range [-1, 1].
float osc2 = (ta.rsi(close, lengthInput) - 50) / 50
//@variable The percent rank of `close` compared to `lengthInput` past values, scaled to the range [-1, 1].
float osc3 = (ta.percentrank(close, lengthInput) - 50) / 50

//@variable The average of `osc1`, `osc2`, and `osc3`.
float oscillator = math.avg(osc1, osc2, osc3)

// Plot the `oscillator`.
plot(oscillator, "Combined oscillator", color.purple, 3)