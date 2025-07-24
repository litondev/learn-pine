//@version=6
indicator("Minimizing `request.*()` calls demo")

//@variable The symbol to request data from.
string symbolInput = input.symbol("BINANCE:BTCUSDT", "Symbol")

// Request 9 `ta.percentrank()` values from the `symbolInput` context using a single `request.security()` call.
[reqRank1, reqRank2, reqRank3, reqRank4, reqRank5, reqRank6, reqRank7, reqRank8, reqRank9] = 
 request.security(
     symbolInput, timeframe.period, [
             ta.percentrank(close, 10), ta.percentrank(close, 20), ta.percentrank(close, 30), 
             ta.percentrank(close, 40), ta.percentrank(close, 50), ta.percentrank(close, 60), 
             ta.percentrank(close, 70), ta.percentrank(close, 80), ta.percentrank(close, 90)
         ]
 )

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