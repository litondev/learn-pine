// WORK BEST ON TF 15 MINUTE
// CRYPTO(BTC,ETH,SOL,LTC AND MEME COIN(DOGE,BONK,SHIB AND PEPE))

//@version=5
strategy("Lony/Short Dema 150/50", overlay=true,
  initial_capital=1000, 
  commission_type=strategy.commission.percent, commission_value=0.00,
  process_orders_on_close = true, calc_on_every_tick = false)

// ========== INPUTS ==========
demaFastLen = input.int(50, "DEMA Fast (Trend)")
demaSlowLen = input.int(150, "DEMA Slow (Trend)")

useSL       = input.bool(true, "Enable Stop Loss")
riskPct     = input.float(100, "Risk Allocation (%)", minval=0.1)  
leverage    = input.int(1, "Leverage (X)", minval=1)          
slPctOfRisk = input.float(100, "Stop Loss (% dari Risk Allocation)", minval=0.1)

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

// StochRSI
rsiSource = ta.rsi(close, 14)
stochRSI  = ta.stoch(rsiSource, rsiSource, rsiSource, 14)
k         = ta.sma(stochRSI, 3)
d         = ta.sma(k, 3)
stochRSI_up = ta.crossover(k, d)
stochRSI_down = ta.crossunder(k, d)

// ========== TRADING HOURS WIB ==========
tradeHour = hour(time, "Asia/Jakarta")
canTrade  = (tradeHour >= 06 and tradeHour <= 23)

// ========== ORDER SIZE (riskPct * leverage) ==========
accountEquity = strategy.initial_capital
riskCapital   = accountEquity * (riskPct / 100)
positionValue = riskCapital * leverage
qtyContracts  = positionValue / close

// ========== EXECUTE TRADES ==========
buyId = "BUY Entry"
sellId = "SELL Entry"

if (canTrade and close > dema50 and k < 80 and stochRSI_up)
    if(strategy.position_size == 0)
        strategy.entry(buyId, strategy.long, qty=qtyContracts)

if (canTrade and close < dema50 and k > 80 and stochRSI_down)
    if(strategy.position_size == 0)
        strategy.entry(sellId, strategy.short, qty=qtyContracts)

// ========== EXIT LOGIC ==========
if (strategy.position_size > 0)
    entryPrice = strategy.position_avg_price

    if useSL
        lossAllowed = riskCapital * (slPctOfRisk / 100)
        stopMove    = lossAllowed / qtyContracts
        stopPrice   = entryPrice - stopMove
        strategy.exit("Exit SL BUY", from_entry=buyId, stop=stopPrice)

    if bearCross
        strategy.close(buyId, comment="Exit BUY")

if (strategy.position_size < 0)
    entryPrice = strategy.position_avg_price

    if useSL
        lossAllowed = riskCapital * (slPctOfRisk / 100)
        stopMove    = lossAllowed / qtyContracts
        stopPrice   = entryPrice + stopMove
        strategy.exit("Exit SL SELL", from_entry=sellId, stop=stopPrice)

    if bullCross
        strategy.close(sellId, comment="Exit SELL")

// ========== PLOT ==========
plot(dema20, title="DEMA20", color=color.yellow, linewidth=3)
plot(dema50, title="DEMA50", color=color.green, linewidth=3)

// plotshape(series=bullCross, title="Sinyal Beli", location=location.belowbar, color=color.new(color.green, 0), style=shape.triangleup, text="BUY", size=size.small)
// plotshape(series=bearCross, title="Sinyal Jual", location=location.abovebar, color=color.new(color.red, 0), style=shape.triangledown, text="SELL", size=size.small)