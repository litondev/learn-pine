//@version=6
indicator("Discord demo", overlay = true)
// Calculate a Donchian channel using the TV ta library.
import TradingView/ta/7 as TVta
int lengthInput = input.int(10, "Channel length")
[highest, lowest, middle] = TVta.donchian(lengthInput)
// Create conditions checking for a new channel high or low.
bool isNewHi = high > highest[1]
bool isNewLo = low  <  lowest[1]
// Plot the Donchian channel and fill between the midpoint and the upper and lower halves.
hi  = plot(highest, "Channel high", color.new(color.fuchsia, 70))
mid = plot(middle,  "Channel mid.", color.new(color.gray,    70))
lo  = plot(lowest,  "Channel low",  color.new(color.lime,    70))
fill(mid, hi, color.new(color.fuchsia, 95))
fill(mid, lo, color.new(color.lime,    95))
// Plot shapes to mark new highs and lows to visually identify where alert trigger conditions occur.
plotshape(isNewHi, "isNewHi", shape.arrowup,   location.abovebar, color.new(color.lime,    70))
plotshape(isNewLo, "isNewLo", shape.arrowdown, location.belowbar, color.new(color.fuchsia, 70))
// Create two alert conditions, one for new highs, and one for new lows.
// Format the message for Discord in the following JSON format: {"content": "Your message here"}
alertcondition(isNewHi, "New High (Discord Alert Demo)", '{"content": "New high ({{high}}) on {{ticker}} on {{interval}} chart!"}')
alertcondition(isNewLo, "New Low  (Discord Alert Demo)", '{"content": "New low ({{low}}) on {{ticker}} on {{interval}} chart!"}')
// The following test alert condition fires immediately. Set this alert frequency to "Only Once".
alertcondition(true, "Test (Discord Alert Demo)", '{"content": "This is a test alert from TradingView to Discord."}')