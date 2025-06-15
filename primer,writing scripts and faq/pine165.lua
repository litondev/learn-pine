//@version=6
strategy("Fixed risk", overlay = false, initial_capital = 100000)

// Specify the desired stop distance (in ticks), the trade R:R ratio, and the percentage of equity to risk.
int   lossSizeInput   = input.int(300,   "Loss size (in ticks)", minval = 0)
float riskRewardInput = input.float(2.0, "Risk/Reward multiple", minval = 0)
float pctRiskInput    = input.float(1.0, "% of equity to risk") / 100

// Create conditions for long/short entries on MA crossover/crossunder, if we are not in a position.
float ma1 = ta.sma(close, 14), float ma2 = ta.sma(close, 28)
bool buyCondition  = ta.crossover(ma1,  ma2) and strategy.position_size == 0
bool sellCondition = ta.crossunder(ma1, ma2) and strategy.position_size == 0

// Store the equity value at each trade entry, in order to calculate the percent change in equity.
var float equityAtEntry = 0.0
// Calculate the risk per contract of the instrument.
float riskPerContract = lossSizeInput * syminfo.mintick * syminfo.pointvalue
// Calculate the amount of equity to risk.
float equityToRisk = strategy.equity * pctRiskInput
// Determine the position size necessary to risk the specified percentage of the equity.
float positionSize = equityToRisk / riskPerContract

// Place orders when `buyCondition` or `sellCondition` is true.
if buyCondition
    strategy.entry("buy", strategy.long, positionSize)
    equityAtEntry := strategy.equity  // Set the `equityAtEntry` variable to the current equity on each entry.
if sellCondition
    strategy.entry("sell", strategy.short, positionSize)
    equityAtEntry := strategy.equity

// Stop-loss level is from the user input. Profit target is the multiple of the loss size with the risk-to-reward ratio.
strategy.exit("exit", loss = lossSizeInput, profit = lossSizeInput * riskRewardInput)

// Calculate the percent equity change between the current equity and the equity at entry.
// On the exit bar of each trade, this value can be used to verify the percentage of equity risked.
float equityChgPercent = 100 * (strategy.equity - equityAtEntry) / equityAtEntry
color equityChgColor   = equityChgPercent < 0 ? color.red : color.green,

// Display current equity and current value of a new position on the chart, and % change in equity to the Data Window.
plot(strategy.equity, "Current Total Equity", color.green, 2, display = display.all - display.pane)
plot(positionSize * close, "Value of New Position at Current Price", color.aqua, 2, display = display.all - display.pane)
plot(equityChgPercent, "% Change in Equity per Trade", equityChgColor, display = display.data_window, format = format.percent)

// Color the background red if the calculated risk value exceeds the available equity (leverage required).
bgcolor(strategy.equity < positionSize * close ? color.new(color.red, 80) : na)
// Plot the minimum leverage multiple required to open the position, applicable only if leverage is necessary.
plot(strategy.equity < positionSize * close ? positionSize * close / strategy.equity : na, "Leverage multiple required",
     display = display.data_window)