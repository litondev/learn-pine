//@version=6
indicator("Cumulative volume", "")

bool upEvent = ta.rising(close,  2)
bool dnEvent = ta.falling(close, 2)

var bool upState = false, var bool dnState = false
// When the right event occurs, turn the state on; when a counter-event occurs, turn it off; otherwise, persist it.
upState := upEvent ? true : dnEvent ? false : upState
dnState := upEvent ? false : dnEvent ? true : dnState

var float volUp = na, var float volDn = na

if upState  // For every bar that we are in the up state,
    volUp += volume  // sum the up volume.
if dnState
    volDn += volume

if upEvent  // If we change state to up,
    volDn := 0  // reset the down volume.
if dnEvent   
    volUp := 0

plot(+volUp, "Up Volume", color.green,  4, plot.style_columns)
plot(-volDn, "Dn Volume", color.maroon, 4, plot.style_columns)
plotchar(upEvent, "Up Event", "▲", location.bottom, color.green,  size = size.tiny)
plotchar(dnEvent, "Dn Event", "▼", location.top,    color.maroon, size = size.tiny)
bgcolor(upState ? color.new(color.green, 90) : dnState ? color.new(color.red, 90) : na)