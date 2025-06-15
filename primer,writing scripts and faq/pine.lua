//@version=6
indicator("MACD #1")
fast = 12
slow = 26
fastMa = ta.ema(close,fast)
slowMa = ta.ema(close,slow)
macd = fastMa - slowMa
signal = ta.ema(macd,9)
plot(macd, color = color.blue)
plot(signal, color = color.orange)