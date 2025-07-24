//@version=6
strategy("Time-delayed orders", overlay=true, max_labels_count = 500, max_lines_count = 500)

import PineCoders/Time/4 as PCtime

// Constants
string TU1 = "seconds", string TU2 = "minutes", string TU3 = "hours", string TU4 = "days"            
string TU5 = "weeks",   string TU6 = "months",  string DT1 = "bars",  string DT2 = "time"

// Tooltips for inputs
string D_TT = "Delay orders for a specific number of bars or a specific duration of time since the last trade."
string N_TT = "Specify the number of bars or time units for the delay."
string U_TT = "Unit of time; relevant only if the delay type is 'time'."

// User inputs for delay type, number of units/bars, and time units.
string delayTypeInput = input.string(DT2, "Delay type",                   tooltip = D_TT, options = [DT1, DT2])
int    nInput         = input.int(15,     "Number of bars or time units", tooltip = N_TT)
string unitsInput     = input.string(TU2, "Time units",                   tooltip = U_TT, options = [TU1, TU2, TU3, TU4, TU5])

// Convert the time unit string input to a value in milliseconds for use in the time delay calculation.
int mult = switch unitsInput
    TU1 => 1000     
    TU2 => 60000    
    TU3 => 3600000  
    TU4 => 86400000 
    TU5 => 604800000
    =>     2628003000

bool useTimeDelay    = delayTypeInput == DT2  // Use time delay or not.
int  timeOfExit      = strategy.closedtrades.exit_time(strategy.closedtrades - 1)  // Time of last trade exit.
int  barOfExit       = strategy.closedtrades.exit_bar_index(strategy.closedtrades - 1)  // Bar index of last trade exit.
int  timeSinceExit   = time - timeOfExit  // Calculate the time since the last trade.
int  barsSinceExit   = bar_index - barOfExit  // Calculate the number of bars since the last trade.
bool timeAllowed     = (timeSinceExit >= nInput * mult or na(timeOfExit)) and useTimeDelay
bool barAllowed      = (bar_index - barOfExit >= nInput or na(barOfExit)) and not useTimeDelay
// Allow entry of a trade if the delay has passed and we're not in a position.
bool entryCondition  = (timeAllowed or barAllowed) and strategy.position_size == 0
bool tradeExited     = barOfExit == bar_index  // Did the trade exit on the current bar?

if entryCondition  // Enter the trade if conditions allow.
    strategy.entry("Long", strategy.long)
    // Set label text: format time or show bar count since last trade.
    string labelTxt = useTimeDelay ? PCtime.formattedNoOfPeriods(timeSinceExit, unitsInput) : str.format("{0} bars", barsSinceExit)
    label.new(bar_index, low, labelTxt,  
         color     = color.new(color.lime, 80),
         textcolor = color.lime,
         style     = label.style_label_up)
    line.new(timeOfExit, low, time, low, xloc.bar_time,
         color = color.new(color.lime, 50),
         style = line.style_arrow_left,
         width = 2)

if bar_index % 10 == 0  // Close any open position on every tenth bar.
    strategy.close("Long")
bgcolor(entryCondition ? color.new(color.lime, 85) : tradeExited ? color.new(color.fuchsia, 85) : na)