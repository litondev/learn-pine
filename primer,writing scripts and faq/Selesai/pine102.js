//@version=6
indicator("Delayed alert demo", overlay = true)

import PineCoders/Time/4 as PCtime

string TIME_TT  = "The delay's duration and units. This specifies the continuous duration for which the condition must be true before triggering the alert."
string RESET_TT = "When checked, the duration will reset every time a new realtime bar begins."

enum TimeUnit
    seconds
    minutes
    hours

int    durationInput = input.int(20,     "Condition must last",     minval  = 1,       inline = "00")
TimeUnit timeUnitInput = input.enum(TimeUnit.seconds, "", inline="00")
bool   resetInput    = input.bool(false, "Reset timing on new bar", tooltip = RESET_TT)
int    maLengthInput = input.int(9,      "MA length")

// Calculate and plot a SMA with `maLengthInput` length.
float ma = ta.sma(close, maLengthInput), plot(ma, "MA")
// Check whether the close is greater than the SMA.
bool cond = close > ma
// Time the duration for which the condition has been true.
int secSince = PCtime.secondsSince(cond, resetInput and barstate.isnew)
// Check if the duration is greater than the input timer.
bool timeAlert = secSince > (PCtime.timeFrom("bar", durationInput, str.tostring(timeUnitInput)) - time) / 1000
// Format a time string for the timer label.
string alertTime = str.format_time(secSince * 1000, "mm:ss")

// Set the contents for the label depending on the stage of the alert timer.
string alertString = switch
    timeAlert => "Timed Alert Triggered\n\n" + alertTime
    cond      => "Condition Detected...\n\nTimer count\n" + alertTime
    =>           "Waiting for condition..."

// Display alert timer using a label.  Declare a basic label once and update location, color, and text on the last bar for efficiency.
if barstate.islast
    var label condTime = label.new(na, na, yloc = yloc.abovebar, style = label.style_label_lower_left, textcolor = chart.fg_color)
    label.set_x(condTime, bar_index)
    label.set_text(condTime, alertString)
    label.set_color(condTime, color.new(timeAlert ? color.green : cond ? color.orange : color.red, 50))

// Create a flag to ensure alert is triggered only once each time the delay timer is exceeded.
varip bool isFirstOccurrence = true
// Fire alert if timer is triggered.
if timeAlert and isFirstOccurrence
    alert(str.format("{0} {1} Delayed Alert Triggered", durationInput, str.tostring(timeUnitInput)), alert.freq_all)

// Toggle the flag to `false` when alert triggers, and reset when the condition clears.
isFirstOccurrence := not timeAlert