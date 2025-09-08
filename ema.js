//@version=5
indicator("EMA50 x EMA150 Cross", overlay=true)

// === Inputs ===
ema_fast_len = 50
ema_slow_len = 150

// === EMA ===
ema_fast = ta.ema(close, ema_fast_len)
ema_slow = ta.ema(close, ema_slow_len)

plot(ema_fast, color=color.yellow, title="EMA 50")
plot(ema_slow, color=color.orange, title="EMA 150")

// === Signals ===
long_signal  = ta.crossover(ema_fast, ema_slow)
short_signal = ta.crossunder(ema_fast, ema_slow)

// === Tanda panah ===
plotshape(long_signal,  title="Long Signal",  style=shape.triangleup,   location=location.belowbar, color=color.green, size=size.small, text="BUY")
plotshape(short_signal, title="Short Signal", style=shape.triangledown, location=location.abovebar, color=color.red,   size=size.small, text="SELL")

// === Alerts ===
alertcondition(long_signal,  title="Buy Alert",  message="EMA50 crossed above EMA150")
alertcondition(short_signal, title="Sell Alert", message="EMA50 crossed below EMA150")
