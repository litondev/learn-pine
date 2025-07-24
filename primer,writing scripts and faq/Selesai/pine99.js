//@version=6
indicator("Screener demo", overlay = true)

// Declare inputs for the alert symbols and the timeframe to run the alerts on. The default is the current chart timeframe.
string tfInput      = input.timeframe("", "Timeframe")
string symbol1Input = input.symbol("BINANCE:ETHUSDT", "Symbol 1")
string symbol2Input = input.symbol("BINANCE:BATUSDT", "Symbol 2")
string symbol3Input = input.symbol("BINANCE:SOLUSDT", "Symbol 3")

// @function    Generates alert messages for RSI crossing over or under 50, and crosses of price and the 50 EMA.
// @returns     (string) Formatted alert messages with values for each crossover and crossunder event.
checkForRsiConditions() =>
    float  rsi = ta.rsi(close, 14)
    float  ema = ta.ema(close, 50)
    string alertMessage = ""
    if ta.crossover(rsi, 50)
        alertMessage += str.format("RSI ({0}) crossed over 50 for {1} on {2} timeframe.\n", rsi, syminfo.ticker, timeframe.period)
    if ta.crossunder(rsi, 50)
        alertMessage += str.format("RSI ({0}) crossed under 50 for {1} on {2} timeframe.\n", rsi, syminfo.ticker, timeframe.period)
    if ta.crossover(close, ema)
        alertMessage += str.format("Crossover of 50 EMA for {0} on {1} timeframe. Price is {2}", syminfo.ticker, timeframe.period, close)
    if ta.crossunder(close, ema)
        alertMessage += str.format("Crossunder of 50 EMA for {0} on {1} timeframe. Price is {2}", syminfo.ticker, timeframe.period, close)

// @function        Calls the `checkForRsiConditions()` function for the provided symbol and timeframe. 
//                      Triggers an alert if the function returns a message.
// @param symbol    (simple string) The symbol to check.
// @param tf        (simple string) The timeframe to check.
// @param freq      (const string) The frequency of the alert. Optional. Default is `alert.freq_once_per_bar`.
// @returns         (void) The function has no explicit return, but triggers an alert with the message if the
//                          conditions defined within the `checkForRsiConditions()` function are met.
checkForAlert(simple string symbol, simple string tf, const string freq = alert.freq_once_per_bar) =>
    string msg = request.security(symbol, tf, checkForRsiConditions())
    if msg != msg[1] and str.length(msg) > 0
        alert(msg, freq)

// Check for alerts on the input symbols and timeframe.
checkForAlert(symbol1Input, tfInput)
checkForAlert(symbol2Input, tfInput)
checkForAlert(symbol3Input, tfInput)
// Continue with additional symbols up to a maximum of 40...