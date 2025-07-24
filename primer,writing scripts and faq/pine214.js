//@version=6
indicator("Pre-market high/low", overlay = true)

// Inputs
string timeAllowedInput = input.session("0700-0930", "Allowed Hours")
string lowerTfInput     = input.timeframe("15",      "Intrabar Resolution")
string timezoneInput    = input.string("Default",      "Timezone", options = ["Default", "GMT-12", "GMT-11", "GMT-10",
  "GMT-9", "GMT-8", "GMT-7", "GMT-6", "GMT-5", "GMT-4", "GMT-3", "GMT-2",  "GMT-1",  "GMT-0",  "GMT+1",  "GMT+2",
  "GMT+3", "GMT+4", "GMT+5", "GMT+6", "GMT+7", "GMT+8", "GMT+9", "GMT+10", "GMT+11", "GMT+12", "GMT+13", "GMT+14"])

// @function        Tracks the highest high and lowest low between specified session times.
// @param sess      (simple string) Session duration in the format "start time - end time". Example: "0930-1600"
// @param timeZone  (simple string) Timezone of the session in "GMT-0" format. Optional. Default is the symbol's timezone.
// @returns         ([float, float]) A tuple of the highest high and lowest low between the specified session times.
hiLoBetweenTime(simple string sess, simple string timeZone = "Default") =>
    var float hi = na, var float lo = na
    // Check to see if we are in allowed hours using session and timezone information.
    bool inSession = not na(time("", sess, timeZone == "Default" ? syminfo.timezone : timeZone))
    if inSession
        if not inSession[1]  // We are entering allowed hours; reset hi/lo.
            hi := high, lo := low
        else  // We are in allowed hours; track high and low.
            hi := math.max(hi, high), lo := math.min(lo, low)
    [hi, lo]

// Request data from lower timeframe using the `hiLoBetweenTime()` function.
[highAtTime, lowAtTime] = request.security(ticker.modify(syminfo.tickerid, session.extended), lowerTfInput,
     hiLoBetweenTime(timeAllowedInput, timezoneInput))

// Plot the most recent value.
plot(highAtTime, "High", color.green)
plot(lowAtTime,  "Low",  color.red)

// Raise error if lower tf is the same or greater than chart's tf.
if timeframe.in_seconds() <= timeframe.in_seconds(lowerTfInput)
    runtime.error("The lower timeframe for intrabar inspection must be lower than the chart's timeframe.")