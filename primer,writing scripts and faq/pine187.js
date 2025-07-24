//@version=6
indicator("On/Off condition example", overlay = true)

bool upBar = close > open

// On/off conditions.
bool triggerOn  = upBar and upBar[1] and upBar[2]
bool triggerOff = not upBar and not upBar[1]

// Switch state is saved across bars.
var bool onOffSwitch = false

// Turn the switch on or off, otherwise persist its state.
onOffSwitch := triggerOn ? true : triggerOff ? false : onOffSwitch

bgcolor(onOffSwitch ? color.new(color.green, 90) : na)
plotchar(triggerOn,  "triggerOn",  "▲", location.belowbar, color.lime, size = size.tiny, text = "On")
plotchar(triggerOff, "triggerOff", "▼", location.abovebar, color.red,  size = size.tiny, text = "Off")