//@version=6
indicator("Session high/low", overlay = true)

const string DEFAULT = "Default"
const string EQ1     = "On"
const string EQ2     = "Off"

// Inputs
bool   showHiInput      = input.string(EQ1,          "Show highs",            options = [EQ1, EQ2]) == EQ1
bool   showLoInput      = input.string(EQ1,          "Show lows",             options = [EQ1, EQ2]) == EQ1
float  srcHiInput       = input.source(high,         "Source for Highs")
float  srcLoInput       = input.source(low,          "Source for Lows")
string sessionInput     = input.session("1200-1500", "Allowed hours")
string timezoneInput    = input.string(DEFAULT,      "Timezone", options = [DEFAULT, "GMT-12", "GMT-11", "GMT-10",
  "GMT-9", "GMT-8", "GMT-7", "GMT-6", "GMT-5", "GMT-4", "GMT-3", "GMT-2",  "GMT-1",  "GMT-0",  "GMT+1",  "GMT+2",
  "GMT+3", "GMT+4", "GMT+5", "GMT+6", "GMT+7", "GMT+8", "GMT+9", "GMT+10", "GMT+11", "GMT+12", "GMT+13", "GMT+14"])

// Check to see if we are in allowed hours using session info.
int timeInSession = time(timeframe.period, sessionInput, timezoneInput == DEFAULT ? syminfo.timezone : timezoneInput)
bool timeIsAllowed = not na(timeInSession)
var float hi = na
var float lo = na
if timeIsAllowed
    // We are entering allowed hours; reset hi/lo.
    if not timeIsAllowed[1]
        hi := srcHiInput
        lo := srcLoInput
    else
        // We are in allowed hours; track hi/lo.
        hi := math.max(srcHiInput, hi)
        lo := math.min(srcLoInput, lo)

// Plot hi/lo within allowed hours.
plot(showHiInput and timeIsAllowed ? hi : na, "Highs", color.lime,    3, plot.style_circles)
plot(showLoInput and timeIsAllowed ? lo : na, "Lows",  color.fuchsia, 3, plot.style_circles)
bgcolor(not timeIsAllowed ? color.new(color.red, 90) : na)