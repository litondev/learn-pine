//@version=6
strategy("Close position by timeout", overlay = true)

// @function                Automatically closes all positions that have been open for longer than a specified period.
// @param timeoutInSeconds  (int) The maximum allowed duration for an open trade, measured in seconds.
// @returns                 (void) The function has no explicit return.
closePositionsAfter(int timeoutInSeconds) =>
    if strategy.opentrades > 0
        for i = 0 to strategy.opentrades - 1
            int timeNow = barstate.isrealtime ? timenow : time_close
            int tradeDurationInSeconds = (timeNow - strategy.opentrades.entry_time(i)) / 1000
            if tradeDurationInSeconds >= timeoutInSeconds
                string entryName    = strategy.opentrades.entry_id(i)
                string tradeComment = str.format("Close \"{0}\" by timeout {1}s", entryName, tradeDurationInSeconds)
                strategy.close(entryName, comment = tradeComment, immediately = true)

// Create long and short conditions based on the crossover/under of 2 moving averages.
bool longCondition  = ta.crossover(ta.sma(close,  14), ta.sma(close, 28))
bool shortCondition = ta.crossunder(ta.sma(close, 14), ta.sma(close, 28))

// Place long entry order upon `longCondition`.
if longCondition
    strategy.entry("long", strategy.long)
// Place short entry order upon `shortCondition`.
if shortCondition
    strategy.entry("short", strategy.short)

// Close positions after a configurable number of seconds.               
closePositionsAfter(input(1200, "Timeout (seconds)"))