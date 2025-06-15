//@version=6
indicator("Condition timer", overlay = true)

import PineCoders/Time/4 as PCtime

string TICKS_TT = "The number of ticks price must move above the open to trigger the alert."
string SEC_TT   = "Seconds for which the condition must be continuously true before the alert triggers."
string RESET_TT = "When checked, the duration resets every time a new realtime bar begins."
int    ticksInput   = input.int(2,  minval = 1,  title = "Number Of Ticks From Open",   tooltip = TICKS_TT)
float  secondsInput = input.int(20, minval = 10, title = "Seconds condition must last", tooltip = SEC_TT)
bool   resetInput   = input.bool(true,           title = "Reset timing on new bar",     tooltip = RESET_TT)

float targetTicks = open + (syminfo.mintick * ticksInput)
bool targetTicksReached = close >= targetTicks

// Calculate seconds elapsed since price reached the target.
int secondsSinceTarget = PCtime.secondsSince(targetTicksReached, resetInput and barstate.isnew)
bool timeAlert = secondsSinceTarget > secondsInput  // Has the timer expired?

string alertTime = str.format_time(secondsSinceTarget * 1000, "mm:ss")  // Format a time string for the timer label.
// Set the contents for the label depending on the stage of the alert timer.
string alertString = "Waiting for price to reach " + str.tostring(targetTicks) + "(" + str.tostring(ticksInput) + 
  " ticks from " + str.tostring(open, format.mintick) + ")\nCurrent price: " + str.tostring(close, format.mintick)
alertString := timeAlert ? "Timed Alert Triggered\n\n" + alertTime : targetTicksReached ? 
  "Condition Detected...\n\nTimer count\n" + alertTime : alertString

if barstate.islast
    var table statusTable = table.new(position.top_right, 1, 2, bgcolor = color.new(color.black, 70))
    // Row 1: Combined tick conditions and current status
    string row1Text = "Target price: " + str.tostring(targetTicks, format.mintick) + " (+" + str.tostring(ticksInput)
      + " ticks from " + str.tostring(open, format.mintick) + ")\n" +
         (targetTicksReached ? "Price condition reached" : "Current price: " + str.tostring(close, format.mintick))
    table.cell(statusTable, 0, 0, row1Text,
         text_color = chart.fg_color,
         bgcolor = targetTicksReached ? color.new(color.blue, 50) : color.new(color.black, 70))
    if targetTicksReached  // Only show the timer on row 2 when the price condition is reached.
        string row2Text = "Time required: " + str.tostring(secondsInput) + " seconds\n" +
             (timeAlert ? "TIMED ALERT TRIGGERED" : "Timer: " + alertTime)
        table.cell(statusTable, 0, 1, row2Text,
             text_color = chart.fg_color,
             bgcolor = timeAlert ? color.new(color.green, 50) : color.new(color.blue, 50))

if timeAlert  // Fire alert if timer is triggered.
    alert("Timed Alert Triggered")