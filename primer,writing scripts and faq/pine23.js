//@version=6
strategy("Decomposing expressions demo")

//@variable The length used for the first part of the oscillator.
int length1Input = input.int(20)
//@variable The length used for the second part of the oscillator.
int length2Input = input.int(40)
//@variable Oscillator smoothing length.
int smoothingInput = input.int(10)

//@variable The maximum of `length1Input` and `length2Input`.
int maxLength = math.max(length1Input, length2Input)

//@variable The smoothed median change in the differences between `close` and two EMAs over different lengths. 
float osc = ta.ema(
     math.avg(
         ta.change(close - ta.ema(close, length1Input), length1Input), 
         ta.change(close - ta.ema(close, length2Input), length2Input)
     ), smoothingInput
 )

//@variable `true` if `osc` is positive, above the last two-bar average, and below twice the stdev for `maxLength` bars.
bool upSignal = osc < 2 * ta.stdev(osc, maxLength) and osc > 0 and math.avg(osc[1], osc[2]) < osc

// Plot the `osc` as columns colored based on the `upSignal`. 
plot(osc, "Custom oscillator", upSignal ? color.aqua : color.gray, style = plot.style_columns)

// Place a "Buy" market order when `upSignal` is `true`, and a closing market order when it is `false`.
if upSignal
    strategy.entry("Buy", strategy.long)
else
    strategy.close("Buy")