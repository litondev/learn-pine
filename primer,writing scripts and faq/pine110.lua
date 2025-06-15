//@version=6
indicator("Earnings map", overlay = true)
// Get the earnings value if present. We use `barmerge.gaps_on` to return `na` unless earnings occurred.
float earnings = request.earnings(syminfo.tickerid, earnings.actual, barmerge.gaps_on)
// Declare a map object for storing earnings dates and values.
var map<string, float> earningsMap = map.new<string, float>()
// If `request.security()` returned data, add an entry to the map with the date as the key and earnings as the value.
if not na(earnings)
    map.put(earningsMap, str.format_time(time, "yyyy-MM-dd"), earnings)
// On the last historical bar, loop through the map in the insertion order, writing the key-value pairs to the logs.
if barstate.islastconfirmedhistory
    string logText = "\n"
    for [key, value] in earningsMap
        logText += str.format("{0}: {1}\n", key, value)
    log.info(logText)