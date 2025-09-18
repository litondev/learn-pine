//@version=5
strategy("Long Only DEMA 20/50 With Leverage", overlay=true,
  initial_capital=1000, 
  commission_type=strategy.commission.percent, commission_value=0.00,
  process_orders_on_close = true, calc_on_every_tick = false)

// WORK BEST ON TF 4 HOUR 
// CRYPTO(BTC,ETH,SOL,LTC AND MEME COIN(DOGE,BONK,SHIB AND PEPE))
// GOLD(XAUD) 

// ========== INPUTS ==========
demaFastLen = input.int(20, "DEMA Fast (Trend)")
demaSlowLen = input.int(50, "DEMA Slow (Trend)")

useSL       = input.bool(true, "Enable Stop Loss")
riskPct     = input.float(50, "Risk Allocation (%)", minval=0.1)  
leverage    = input.int(20, "Leverage", minval=1)          
slPctOfRisk = input.float(15, "Stop Loss (% dari Risk Allocation)", minval=0.1)
entryWindow = input.int(25, "StochRSI Entry Window (Bars)")

// ========== STOCHASTIC RSI INPUTS ==========
stochRSILen = input.int(14, "StochRSI Length")
stochK      = input.int(3, "%K Smooth")
stochD      = input.int(3, "%D Smooth")

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
rsiSource = ta.rsi(close, stochRSILen)
stochRSI  = ta.stoch(rsiSource, rsiSource, rsiSource, stochRSILen)
k         = ta.sma(stochRSI, stochK)
d         = ta.sma(k, stochD)
stochRSI_up = ta.crossover(k, d)

// ========== ENTRY WINDOW LOGIC ==========
var int entryBarIndex = na
if bullCross
    entryBarIndex := bar_index

isWithinWindow = bar_index - entryBarIndex <= entryWindow

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

// Entry condition: a DEMA cross occurred, we are within the entry window,
// the StochRSI confirmed the move, AND the StochRSI K is below 50, AND close is above DEMA 50.
if (canTrade and isWithinWindow and stochRSI_up and k < 70 and close > dema50)
    strategy.entry(buyId, strategy.long, qty=qtyContracts)

// ========== EXIT LOGIC ==========
if (strategy.position_size > 0)
    entryPrice = strategy.position_avg_price

    if useSL
        // Calculate SL based on % of risk allocation
        lossAllowed = riskCapital * (slPctOfRisk / 100)
        stopMove    = lossAllowed / qtyContracts
        stopPrice   = entryPrice - stopMove
        strategy.exit("Exit SL", from_entry=buyId, stop=stopPrice)

    if bearCross
        strategy.close(buyId, comment="Exit by DEMA cross down")

// ========== PLOT ==========
plot(dema20, title="DEMA20", color=color.yellow, linewidth=3)
plot(dema50, title="DEMA50", color=color.green, linewidth=3)