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

//#region Split the `osc` calculations into smaller parts:

// 1. Calculate the EMAS over `length1Input` and `length2Input` bars.
float ema1 = ta.ema(close, length1Input), float ema2 = ta.ema(close, length2Input)
// 2. Calculate the differences between `close` and `ema1` and `ema2`.
float diff1 = close - ema1, float diff2 = close - ema2
// 3. Calculate the changes in `diff1` and `diff2` over `length1Input` and `length2Input` bars.
float change1 = ta.change(diff1, length1Input), float change2 = ta.change(diff2, length2Input)
// 4. Calculate the median of `change1` and `change2`. 
float medChange = math.avg(change1, change2)
//#endregion

//@variable The smoothed median change in the differences between `close` and two EMAs over different lengths. 
float osc = ta.ema(medChange, smoothingInput)

//#region Split the `upSignal` calculations and logic into smaller parts:

// 1. Assign the calculations in the expression to separate variables. 
float oscDev  = 2 * ta.stdev(osc, maxLength), float pastAvg = math.avg(osc[1], osc[2])
// 2. Assign each singular condition to a separate variable. 
bool cond1 = osc < oscDev, bool cond2 = osc > 0, bool cond3 = pastAvg < osc
//#endregion

//@variable Is `true` if `osc` is positive, above the past two-bar average, and below twice its stdev over `maxLength` bars. 
bool upSignal = cond1 and cond2 and cond3

// Plot the `osc` as columns colored based on the `upSignal`. 
plot(osc, "Custom oscillator", upSignal ? color.aqua : color.gray, style = plot.style_columns)

// Place a "Buy" market order when `upSignal` is `true`, and a closing market order when it is `false`.
if upSignal
    strategy.entry("Buy", strategy.long)
else
    strategy.close("Buy")

// Call `log.info()` to display a formatted message containing debug information in the Pine Logs pane. 
if barstate.isconfirmed
    log.info(
         "\nema1: {0,number,0.00000}, diff1: {1,number,0.00000}, change1: {2,number,0.00000}
         \nema2: {3,number,0.00000}, diff2: {4,number,0.00000}, change2: {5,number,0.00000}
         \nmedChange: {6,number,0.00000}\n\nosc: {7,number,0.00000}\n----
         \noscDev: {8,number,0.00000}\npastAvg: {9,number,0.00000}
         \ncond1: {10}, cond2: {11}, cond3: {12}\n\nupSignal: {13}",
         ema1, diff1, change1, ema2, diff2, change2, medChange, osc, oscDev, pastAvg, cond1, cond2, cond3, upSignal
     )