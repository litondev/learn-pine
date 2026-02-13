//@version=5
indicator("Stoch RSI Weekly Direction", overlay=true)

// === INPUT ===
src = close
lengthRSI = input.int(14, "RSI Length")
lengthStoch = input.int(14, "Stoch Length")
smoothK = input.int(3, "Smooth K")
smoothD = input.int(3, "Smooth D")

// === GET WEEKLY DATA ===
rsiWeekly = request.security(syminfo.tickerid, "1W", ta.rsi(src, lengthRSI))
stochRSI = request.security(syminfo.tickerid, "1W", ta.stoch(rsiWeekly, rsiWeekly, rsiWeekly, lengthStoch))
k = ta.sma(stochRSI, smoothK)
d = ta.sma(k, smoothD)

// === CHECK CONDITIONS ===
k_prev = request.security(syminfo.tickerid, "1W", ta.sma(ta.stoch(rsiWeekly, rsiWeekly, rsiWeekly, lengthStoch), smoothK)[1])
upward = k > k_prev

above_signal = k > d

// === PLOT ===
bgcolor(upward and above_signal ? color.new(color.green, 85) : upward ? color.new(color.yellow, 85) : above_signal ? color.new(#ff0000, 85) : na,title="Background Signal")
