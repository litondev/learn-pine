//@version=5
strategy("Long Only DEMA 20/50 With Leverage", overlay=true,
  initial_capital=1000,  
  commission_type=strategy.commission.percent, commission_value=0.00,
  process_orders_on_close = true, calc_on_every_tick = false)

// ========== INPUTS ==========
demaFastLen = input.int(20, "DEMA Fast (Trend)")
demaSlowLen = input.int(50, "DEMA Slow (Trend)")

useSL       = input.bool(true, "Enable Stop Loss")
riskPct     = input.float(50, "Risk Allocation (%)", minval=0.1)     // % modal
leverage    = input.int(15, "Leverage", minval=1)                    // leverage
slPctOfRisk = input.float(10, "Stop Loss (% dari Risk Allocation)", minval=0.1)

// ========== MANUAL DEMA ==========
ema_fast   = ta.ema(close, demaFastLen)
ema_fast2  = ta.ema(ema_fast, demaFastLen)
dema20     = 2 * ema_fast - ema_fast2

ema_slow   = ta.ema(close, demaSlowLen)
ema_slow2  = ta.ema(ema_slow, demaSlowLen)
dema50     = 2 * ema_slow - ema_slow2

// Signals
bullCross  = ta.crossover(dema20, dema50)
bearCross  = ta.crossunder(dema20, dema50)

// ========== LIMIT ENTRY PER DAY ==========
var int tradesToday = 0
var string prevDayKey = na
curDayKey = str.tostring(year(time)) + "-" + str.tostring(month(time)) + "-" + str.tostring(dayofmonth(time))
if (curDayKey != prevDayKey)
    tradesToday := 0
    prevDayKey := curDayKey

// ========== JAM TRADING WIB ==========
tradeHour = hour(time, "Asia/Jakarta")
canTrade  = (tradeHour >= 06 and tradeHour < 24)

// ========== ORDER SIZE (riskPct * leverage) ==========
accountEquity = strategy.initial_capital
riskCapital   = accountEquity * (riskPct / 100)        // contoh: riskPct=50% dari equity
positionValue = riskCapital * leverage
qtyContracts  = positionValue / close

// ========== EXECUTE TRADES ==========
buyId  = "BUY Entry"

if (canTrade)
    if (bullCross)
        strategy.entry(buyId, strategy.long, qty=qtyContracts)
        tradesToday += 1

// ========== EXIT LOGIC ==========
if (strategy.position_size > 0)
    entryPrice = strategy.position_avg_price

    if useSL
        // hitung SL berdasarkan % dari risk allocation
        lossAllowed = riskCapital * (slPctOfRisk / 100)      // contoh: riskPct=50% & slPctOfRisk=10% → rugi max 50
        stopMove    = lossAllowed / qtyContracts
        stopPrice   = entryPrice - stopMove
        strategy.exit("Exit SL", from_entry=buyId, stop=stopPrice)

    if bearCross
        strategy.close(buyId, comment="Exit by DEMA cross down")

// ========== PLOT ==========
plot(dema20, title="DEMA20", color=color.yellow, linewidth=3)
plot(dema50, title="DEMA50", color=color.green, linewidth=3)