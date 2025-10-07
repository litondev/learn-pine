// This Pine Script® code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © litoninot12345

//@version=6
indicator("Regime",overlay=true)

demaFastLen = input.int(20, "DEMA Fast (Trend)")
demaSlowLen = input.int(50, "DEMA Slow (Trend)")

tf4h = "240"

ema_fast_4h  = request.security(syminfo.tickerid, tf4h, ta.ema(close, demaFastLen))
ema_fast2_4h = request.security(syminfo.tickerid, tf4h, ta.ema(ema_fast_4h, demaFastLen))
dema20_4h    = request.security(syminfo.tickerid, tf4h, 2 * ema_fast_4h - ema_fast2_4h)

ema_slow_4h  = request.security(syminfo.tickerid, tf4h, ta.ema(close, demaSlowLen))
ema_slow2_4h = request.security(syminfo.tickerid, tf4h, ta.ema(ema_slow_4h, demaSlowLen))
dema50_4h    = request.security(syminfo.tickerid, tf4h, 2 * ema_slow_4h - ema_slow2_4h)

regimeBull = dema20_4h > dema50_4h
regimeBear = dema20_4h < dema50_4h

bgcolor(regimeBull ? color.new(color.green, 85) : regimeBear ? color.new(color.red, 85) : na)
