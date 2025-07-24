//@version=6
strategy("Date/time filtering demo", "", true)

// Timezone setting for date and time calculations. Adjust to the chart timezone.
string TZ = "GMT+0"

// Define the date window, an intraday time session to exclude, and the filtering to apply.
bool   useDateFilterInput = input.bool(true, "Allow trades only between the following dates (" + TZ + ")") 
int    startTimeInput     = input.time(timestamp("01 Jan 2000 00:00 " + TZ), "  Start date", confirm = true)     
int    endTimeInput       = input.time(timestamp("01 Jan 2099 00:00 " + TZ), "  End date", confirm = true)
bool   useTimeFilterInput = input.bool(false, "Restrict trades during the following times (" + TZ + ")") 
string sessionStringInput = input.session("0000-0300", "")          

// @function                Determines whether the current bar falls within a specified date and time range.
// @param startTime         (int) A timestamp marking the start of the time window.
// @param endTime           (int) A timestamp marking the end of the time window.
// @param useDateFilter     (bool) Whether to filter between `startTime` and `endTime`. Optional.
// @param useTimeFilter     (bool) Whether to restrict trades in the time session. Optional.
// @param timeSession       (string) Session time range in 'HHMM-HHMM' format, used if `useTimeFilter` is true.
// @param timeZone          (string) Timezone for the session time, used if `useTimeFilter` is true.
// @returns                 (bool) `true` if the current bar is within the specified date and time range.
timeWithinAllowedRange(
     int    startTime, int endTime,
     bool   useDateFilter = true,
     bool   useTimeFilter = false,
     string timeSession   = "0000-0000",
     string timeZone      = "GMT-0"
     ) =>
    bool isOutsideTime = na(time(timeframe.period, timeSession, timeZone))
    bool timeIsAllowed = useTimeFilter and isOutsideTime or not useTimeFilter
    bool dateIsAllowed = time >= startTime and time <= endTime or not useDateFilter
    bool result        = timeIsAllowed and dateIsAllowed

// Determine if each bar falls within the date window or outside the ignored time session.
bool isWithinTime = timeWithinAllowedRange(
 startTimeInput, endTimeInput, useDateFilterInput, useTimeFilterInput, sessionStringInput, TZ
 )

// Calculate RSI for simple trading signals.
float rsi = ta.rsi(close,  14)
// Generate trading signals based on RSI conditions, provided they occur within the permissible date/time range.
bool enterLong  = ta.crossover(rsi,  50) and isWithinTime
bool enterShort = ta.crossunder(rsi, 50) and isWithinTime
// Simulate trades only if they meet the filtering criteria.
if enterLong
    strategy.entry("Long", strategy.long)
if enterShort
    strategy.entry("Short", strategy.short)
// Color the background red for bars falling outside the specified date/time range.
bgcolor(isWithinTime ? na : color.new(color.red, 80), title = "Exempt times")