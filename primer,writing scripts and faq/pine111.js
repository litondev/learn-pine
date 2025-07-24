//@version=6
indicator("Array demo", overlay = true)
// Create an input to determine the number of session opens to track, with a default value of 5.
int numOpensInput = input.int(5, "Number of opens to track")
// Create an array to store open prices. Using `var` ensures the array retains its values from bar to bar.
// Initially, the array is filled with placeholder values (`na`), which are later updated with actual open prices.
var array<float> opensArray = array.new<float>(numOpensInput)
// On the first bar of each session, update the array: add the current open price and remove the oldest entry.
if session.isfirstbar_regular
    array.push(opensArray, open)
    array.shift(opensArray)
// Plot the highest, lowest, and average open prices from the tracked sessions
plot(array.max(opensArray), "Highest open in n sessions",       color.lime)
plot(array.min(opensArray), "Lowest open in n sessions",        color.fuchsia)
plot(array.avg(opensArray), "Avg. open of the last n sessions", color.gray)
// Change the background color on the first bar of each session to visually indicate session starts.
bgcolor(session.isfirstbar_regular ? color.new(color.gray, 80) : na)