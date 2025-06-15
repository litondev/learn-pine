//@version=6
indicator("Track distance from condition", "", true)
// Plot the high/low from the bar where a condition occurred the last time.

// Conditions
bool upBar = close > open
bool dnBar = close < open
bool up3Bars = dnBar and upBar[1] and upBar[2] and upBar[3]
bool dn3Bars = upBar and dnBar[1] and dnBar[2] and dnBar[3]
display = display.data_window

// Method 1: Using "ta.barssince()".
plot(high[ta.barssince(up3Bars)], color = color.new(color.blue, 80), linewidth = 16)
plot(low[ta.barssince(dn3Bars)],  color = color.new(color.red,  80), linewidth = 16)
plot(ta.barssince(up3Bars), "1. ta.barssince(up3Bars)", display = display)
plot(ta.barssince(dn3Bars), "1. ta.barssince(dn3Bars)", display = display)

// Method 2: Manually replicating the functionality of the "ta.barssince()" function.
var int barsFromUp = na
var int barsFromDn = na
barsFromUp := up3Bars ? 0 : barsFromUp + 1
barsFromDn := dn3Bars ? 0 : barsFromDn + 1
plot(high[barsFromUp], color = color.blue, linewidth = 3)
plot(low[barsFromDn],  color = color.red,  linewidth = 3)
plot(barsFromUp, "3. barsFromUp", display = display)
plot(barsFromDn, "3. barsFromDn", display = display)

// Method 3: Storing the `bar_index` value when a condition is met.
var int barWhenUp = na
var int barWhenDn = na
if up3Bars
    barWhenUp := bar_index
if dn3Bars
    barWhenDn := bar_index
plot(high[bar_index - barWhenUp], color = color.new(color.blue, 70), linewidth = 8)
plot(low[bar_index  - barWhenDn], color = color.new(color.red,  70), linewidth = 8)
plot(bar_index - barWhenUp, "2. bar_index - barWhenUp", display = display)
plot(bar_index - barWhenDn, "2. bar_index - barWhenDn", display = display)

// Method 4: Storing the value when a condition is met.
var float highWhenUp = na
var float lowWhenDn  = na
if up3Bars
    highWhenUp := high
if dn3Bars
    lowWhenDn  := low

plot(highWhenUp, color = color.new(color.white, 70), linewidth = 1)
plot(lowWhenDn,  color = color.new(color.white, 70), linewidth = 1)