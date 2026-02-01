//@version=5
strategy("Long/Short Dema Tf 1 Day", overlay=true,
  initial_capital=1000, 
  commission_type=strategy.commission.percent, commission_value=0.00,
  process_orders_on_close = true, calc_on_every_tick = false)
  
// PENGGUNAAN DI ETH DAN SOL DI TF 1 DAY 
// BERIKAN KESEMPATAN GAGAL 

// SHORT 
// KALAU SUDAH JAUH DARI CROSS DAN DIA TIDAK SIDEWAY AMBAIKAN TAPI KALAU DIA SIDEWAY ITU VALID
// SHORT YANG BAGUS BIASANYA CHART MASUK DIANATRA DEMA 20 DAN DEMA 50

// LONG 
// KALAU SUDAH JAUH DARI CROSS AMBAIKAN 
// KALAU DIA CROSS DEMA MENGECIL ATAU TURUN TUNGGU CHART NAIK KE ATAS DEMA BARU ENTRY


// ========== LOCK TIMEFRAME ==========
if timeframe.period != "D"
    runtime.error("Hanya untuk Timeframe 1 Day (Harian).")

// ========== INPUTS ==========
demaFastLen = input.int(20, "DEMA Fast (Trend)")
demaSlowLen = input.int(50, "DEMA Slow (Trend)")
maxTradesLong   = input.int(3, "Max Trades per Cross", minval=1) 
maxTradesShort   = input.int(3, "Max Trades per Cross", minval=1) 

// MACD Settings
fast_length   = input.int(12, "MACD Fast Length")
slow_length   = input.int(28, "MACD Slow Length")
signal_length = input.int(9,  "MACD Signal Length")

useSL       = input.bool(true, "Enable Stop Loss")
riskPct     = input.float(2, "Risk Allocation (%)", minval=0.1)  
leverage    = input.int(50, "Leverage (X)", minval=1)          
slPctOfRisk = input.float(100, "Stop Loss (% dari Risk Allocation)", minval=0.1)

// ========== INDICATORS CALCULATION ==========
calc_dema(src, len) =>
    e1 = ta.ema(src, len)
    e2 = ta.ema(e1, len)
    2 * e1 - e2

dema20 = calc_dema(close, demaFastLen)
dema50 = calc_dema(close, demaSlowLen)

bullDema = ta.crossover(dema20, dema50)
bearDema = ta.crossunder(dema20, dema50)
var bool isBullDema = false
var bool isBearDema = false

// --- LOGIC PEMBATAS TRADE ---
var int tradeCountLong = 0
var int tradeCountShort = 0

// Reset counter setiap kali terjadi cross (Bullish atau Bearish)
if bullDema 
    tradeCountLong := 0
    isBullDema := true
    isBearDema := false 

if bearDema
    tradeCountShort := 0
    isBullDema = false
    isBearDema = true

// Tambah counter saat ada entry baru
// Kita cek jika jumlah trade saat ini masih di bawah batas
canEntryByCountLong = tradeCountLong < maxTradesLong
canEntryByCountShort = tradeCountShort < maxTradesShort

// ========== MACD Weekly (W) ==========
[w_macd, w_signal, _] = request.security(syminfo.tickerid, "W", ta.macd(close, fast_length, slow_length, signal_length))
weekly_bullish = w_macd > w_signal
weekly_bearish = w_macd < w_signal

// ========== StochRSI ==========
rsiSource = ta.rsi(close, 14)
stochRSI  = ta.stoch(rsiSource, rsiSource, rsiSource, 14)
k = ta.sma(stochRSI, 3)
d = ta.sma(k, 3)
stochRSI_up   = ta.crossover(k, d)
stochRSI_down = ta.crossunder(k, d)

// ========== TRADING HOURS WIB ==========
tradeHour = hour(time, "Asia/Jakarta")
canTrade  = (tradeHour >= 06 and tradeHour <= 23)

// ========== POSITION SIZING ==========
// COMPUNDING 
accountEquity = strategy.equity
// NO COMPUNDING
// accountEquity = 1000
riskCapital   = accountEquity * (riskPct / 100)
positionValue = riskCapital * leverage
qtyContracts  = positionValue / close

// ========== EXECUTE TRADES ==========
// LONG ENTRY 
// weekly_bullish and
// close > dema50 and isBullDema and
longCond = canTrade and stochRSI_up and close > dema50 and isBullDema and canEntryByCountLong
if (longCond)
    strategy.entry("Long", strategy.long, qty=qtyContracts)
    tradeCountLong += 1 // Naikkan hitungan

// SHORT ENTRY
shortCond = canTrade and stochRSI_down and close < dema50 and weekly_bearish and canEntryByCountShort
if (shortCond)
    strategy.entry("Short", strategy.short, qty=qtyContracts)
    tradeCountShort += 1 // Naikkan hitungan

// ========== EXIT LOGIC ==========
if (strategy.position_size > 0)
    lossAllowed = riskCapital * (slPctOfRisk / 100)
    slPrice = strategy.position_avg_price - (lossAllowed / strategy.position_size)
    strategy.exit("SL Long", "Long", stop=slPrice)
    if bearDema
        strategy.close("Long", comment="DEMA Cross Down")

if (strategy.position_size < 0)
    lossAllowed = riskCapital * (slPctOfRisk / 100)
    slPrice = strategy.position_avg_price + (lossAllowed / math.abs(strategy.position_size))
    strategy.exit("SL Short", "Short", stop=slPrice)
    if bullDema
        strategy.close("Short", comment="DEMA Cross Up")

// ========== PLOT ==========
plot(dema20, title="DEMA20", color=color.yellow, linewidth=2)
plot(dema50, title="DEMA50", color=color.green, linewidth=2)

bgcolor(weekly_bullish ? color.new(color.green, 80) : weekly_bearish ? color.new(color.red, 80) : na)