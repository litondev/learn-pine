//@version=6
indicator('Time at first bar')
// Capture the time of the first bar in the dataset.
var int t = time
plot(t)