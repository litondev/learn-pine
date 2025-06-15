//@version=6
indicator("Single alert demo", overlay = true)

// ————— Calculations: Determine highest/lowest values over last `lengthInput` bars.
int   lengthInput = input.int(20, "Length")
float highest     = ta.highest(lengthInput)
float lowest      = ta.lowest(lengthInput)
// ————— Trigger conditions: Define bull and bear signals. Bull signal is triggered by a new high, and bear by a new low.
bool bullSignal = high == highest
bool bearSignal = low  == lowest
// ————— State change flags: Set true on state transition bars only.
bool changeToBull = false
bool changeToBear = false
// ————— State tracking: `isBull` is set to true for bull state, false for bear. It's set only at the initial switch to the opposite condition.
// This variable's state is retained from bar to bar because we use the `var` keyword to declare it.
var bool isBull = false
// ————— State transitions: Allow a switch from bull to bear or bear to bull; ignore repeated signals in current state.
// Set the state change flags to true only on the first bar where a new signal appears.
if bullSignal and not isBull
    isBull       := true
    changeToBull := true
else if bearSignal and isBull
    isBull       := false
    changeToBear := true

// Plot highest and lowest values.
plot(highest, "Highest", color.new(color.green, 80), 2)
plot(lowest,  "Lowest",  color.new(color.red,   80), 2)
// Background color: Green for bull, none for bear.
bgcolor(isBull ? color.new(color.green, 90) : na)
// State change markers: Display "ALERT" text on bars where a state change occurs and an alert would trigger.
plotchar(changeToBull, "Change to Bull state", "▲", location.belowbar, color.new(color.lime, 30), size = size.small, text = "BULL\nALERT")
plotchar(changeToBear, "Change to Bear state", "▼", location.abovebar, color.new(color.red,  30), size = size.small, text = "BEAR\nALERT")
// Signal markers: Display for repeated signals within the current state.
// These signals would trigger redundant alerts if not for the state tracking flag preventing them.
plotchar(bullSignal and not changeToBull, "Bull signal", "▲", location.belowbar, color.green,  size = size.tiny)
plotchar(bearSignal and not changeToBear, "Bear signal", "▼", location.abovebar, color.maroon, size = size.tiny)

// Alerts: Trigger on state changes only.
if changeToBull
    alert("Change to bull state")
if changeToBear
    alert("Change to bear state")