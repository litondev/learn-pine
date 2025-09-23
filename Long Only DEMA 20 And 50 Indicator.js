//@version=5
indicator("Long Only DEMA 20/50 Indicator", overlay=true)

// ========== INPUTS ==========
demaFastLen = input.int(20, "DEMA Fast (Trend)")
demaSlowLen = input.int(50, "DEMA Slow (Trend)")

// ========== MANUAL DEMA ==========
ema_fast  = ta.ema(close, demaFastLen)
ema_fast2 = ta.ema(ema_fast, demaFastLen)
dema20    = 2 * ema_fast - ema_fast2

ema_slow  = ta.ema(close, demaSlowLen)
ema_slow2 = ta.ema(ema_slow, demaSlowLen)
dema50    = 2 * ema_slow - ema_slow2

// ========== INDICATORS & SIGNALS ==========
// DEMA Crosses
bullCross   = ta.crossover(dema20, dema50)
bearCross   = ta.crossunder(dema20, dema50)

// ========== SIGNAL ==========
buySignal = bullCross
sellSignal = bearCross

// ========== PLOT ==========
plot(dema20, title="DEMA20", color=color.yellow, linewidth=2)
plot(dema50, title="DEMA50", color=color.green, linewidth=2)

plotshape(buySignal, title="Sinyal Beli", location=location.belowbar, color=color.new(color.green,0), style=shape.triangleup, text="BUY")
plotshape(sellSignal, title="Sinyal Jual", location=location.abovebar, color=color.new(color.red,0), style=shape.triangledown, text="SELL")
