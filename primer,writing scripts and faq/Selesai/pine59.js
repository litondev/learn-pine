//@version=6
indicator("Minimizing `request.*()` calls demo")

//@variable The symbol to request data from.
string symbolInput = input.symbol("BINANCE:BTCUSDT", "Symbol")

// Request 9 `ta.percentrank()` values from the `symbolInput` context using 9 `request.security()` calls.
float reqRank1 = request.security(symbolInput, timeframe.period, ta.percentrank(close, 10))
float reqRank2 = request.security(symbolInput, timeframe.period, ta.percentrank(close, 20))
float reqRank3 = request.security(symbolInput, timeframe.period, ta.percentrank(close, 30))
float reqRank4 = request.security(symbolInput, timeframe.period, ta.percentrank(close, 40))
float reqRank5 = request.security(symbolInput, timeframe.period, ta.percentrank(close, 50))
float reqRank6 = request.security(symbolInput, timeframe.period, ta.percentrank(close, 60))
float reqRank7 = request.security(symbolInput, timeframe.period, ta.percentrank(close, 70))
float reqRank8 = request.security(symbolInput, timeframe.period, ta.percentrank(close, 80))
float reqRank9 = request.security(symbolInput, timeframe.period, ta.percentrank(close, 90))

// Plot the `reqRank*` values.
plot(reqRank1)
plot(reqRank2)
plot(reqRank3)
plot(reqRank4)
plot(reqRank5)
plot(reqRank6)
plot(reqRank7)
plot(reqRank8)
plot(reqRank9)