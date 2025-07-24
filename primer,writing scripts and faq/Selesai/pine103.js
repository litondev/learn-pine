//@version=6
indicator("JSON example", overlay = true)

// Define EMA cross conditions to trigger alerts, and plot the ema on the chart.
float ema = ta.ema(close, 21)
bool crossUp    = ta.crossover(close, ema)
bool crossDown  = ta.crossunder(close, ema)
plot(ta.ema(close, 21))

// ————— Method 1 - Separate alerts with static messages.
string alertMessage1a = '{"method": 1, "action": "buy", "direction": "long", "text": "Price crossed above EMA"}'
string alertMessage1b = '{"method": 1, "action": "sell", "direction": "short", "text": "Price crossed below EMA"}'
alertcondition(crossUp,     "Method 1 - Cross up",   alertMessage1a)
alertcondition(crossDown,   "Method 1 - Cross down", alertMessage1b)

// Rendered alert:
// {
//     "method": 1,
//     "action": "buy",
//     "direction": "long",
//     "text": "Price crossed above EMA"
// }

// ————— Method 2 - Using placeholders for dynamic values.
string alertMessage2 = '{"method": 2, "price": {{close}}, "volume": {{volume}}, "ema": {{plot_0}}}'
alertcondition(crossUp, "Method 2 - Cross Up", alertMessage2)

// Rendered alert:
// {
//     "method": 2,
//     "price": 2066.29,
//     "volume": 100.859,
//     "ema": 2066.286
// }

// ————— Method 3 - String concatenation using dynamic values.
string alertMessage3 =
 '{"method": 3, "price": ' + str.tostring(close) + ', "volume": ' + str.tostring(volume) + ', "ema": ' + str.tostring(ema) + '}'
if crossUp
    alert(alertMessage3, alert.freq_once_per_bar_close)

// Rendered alert:
// {
//     "method": 3,
//     "price": 2052.27,
//     "volume": 107.683,
//     "ema": 2052.168
// }