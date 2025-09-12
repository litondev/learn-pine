//@version=5
strategy("MACD + EMA Cross Strategy", overlay=true,
  default_qty_type=strategy.percent_of_equity, default_qty_value=100,
  initial_capital=50000, commission_type=strategy.commission.percent, commission_value=0.0,
  process_orders_on_close = false, calc_on_every_tick = true)

// ========== INPUTS ==========
fastLen  = input.int(8,  "MACD Fast Length", minval=1)
slowLen  = input.int(18, "MACD Slow Length", minval=1)
sigLen   = input.int(5,  "MACD Signal Length", minval=1)
src      = input.source(close, "Source")

emaFastLen = input.int(50, "EMA Fast (Trend)")
emaSlowLen = input.int(150, "EMA Slow (Trend)")

useSLTP = input.bool(true, "Enable Stop Loss / Take Profit")
slPerc  = input.float(1,  "Stop Loss (%)", minval=0.01)   // percent
tpPerc  = input.float(5,  "Take Profit (%)", minval=0.01) // percent

closeOnOpposite = input.bool(true, "Close position on opposite signal")

// ========== MACD CALC ==========
fastEMA = ta.ema(src, fastLen)
slowEMA = ta.ema(src, slowLen)
macdLine = fastEMA - slowEMA
signalLine = ta.ema(macdLine, sigLen)

bullCross = (macdLine > signalLine and macdLine[1] <= signalLine[1])
bearCross = (macdLine < signalLine and macdLine[1] >= signalLine[1])

// ========== EMA FILTER ==========
ema50  = ta.ema(src, emaFastLen)
ema150 = ta.ema(src, emaSlowLen)

trendLong  = ema50 > ema150   // Golden cross
trendShort = ema50 < ema150   // Dead cross

// ========== ORDER NAMES ==========
buyId  = "BUY Entry"
sellId = "SELL Entry"

// ========== EXECUTE TRADES ==========
if (bullCross and trendLong)
    if (closeOnOpposite and strategy.position_size < 0)
        strategy.close(sellId)
    strategy.entry(buyId, strategy.long)


if (bearCross and trendShort)
    if (closeOnOpposite and strategy.position_size > 0)
        strategy.close(buyId)
    strategy.entry(sellId, strategy.short)


// ========== STOP LOSS / TAKE PROFIT ==========
if (useSLTP)
    buy_stop_price   = strategy.position_size > 0 ? strategy.position_avg_price * (1 - slPerc / 100) : na
    buy_limit_price  = strategy.position_size > 0 ? strategy.position_avg_price * (1 + tpPerc / 100) : na
    sell_stop_price  = strategy.position_size < 0 ? strategy.position_avg_price * (1 + slPerc / 100) : na
    sell_limit_price = strategy.position_size < 0 ? strategy.position_avg_price * (1 - tpPerc / 100) : na

    strategy.exit("Exit BUY", from_entry=buyId, stop=buy_stop_price, limit=buy_limit_price)
    strategy.exit("Exit SELL", from_entry=sellId, stop=sell_stop_price, limit=sell_limit_price)

// ========== PLOTS ==========
plot(ema50,  title="EMA 50", color=color.green, linewidth=2)
plot(ema150, title="EMA 150", color=color.red, linewidth=2)