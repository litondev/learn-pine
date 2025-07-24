//@version=5
indicator("🔔 Sinyal Entry Winrate Tinggi (MACD + RSI + EMA)", overlay=true)

/// === Input === ///
emaFast = input.int(20, title="EMA Fast")
emaSlow = input.int(50, title="EMA Slow")

rsiPeriod = input.int(14, title="RSI Period")
rsiBuy = input.int(30, title="RSI Buy Level")

macdFast = input.int(12)
macdSlow = input.int(26)
macdSignal = input.int(9)

/// === Indicators === ///
ema1 = ta.ema(close, emaFast)
ema2 = ta.ema(close, emaSlow)

rsi = ta.rsi(close, rsiPeriod)

[macdLine, signalLine, _] = ta.macd(close, macdFast, macdSlow, macdSignal)

/// === Entry Signal === ///
trendUp = ema1 > ema2
rsiSignal = rsi < rsiBuy
macdCross = ta.crossover(macdLine, signalLine)

buySignal = trendUp and rsiSignal and macdCross

/// === Tampilkan sinyal di chart === ///
plotshape(buySignal, title="Sinyal Buy", location=location.belowbar, color=color.green, style=shape.triangleup, size=size.small, text="BUY")

/// === Tambahkan EMA untuk visual === ///
plot(ema1, title="EMA Fast", color=color.orange)
plot(ema2, title="EMA Slow", color=color.blue)

/// === Tambahkan alert opsional === ///
alertcondition(buySignal, title="Alert Sinyal Buy", message="📈 Sinyal BUY muncul (MACD + RSI + EMA)")