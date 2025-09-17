//@version=5
strategy("MACD + EMA Cross Strategy", overlay=true,
  default_qty_type=strategy.percent_of_equity, default_qty_value=100,
  initial_capital=100, commission_type=strategy.commission.percent, commission_value=0.00,
  process_orders_on_close = true, calc_on_every_tick = false)

// ========== INPUTS ==========
fastLen  = input.int(8,  "MACD Fast Length", minval=1)
slowLen  = input.int(18, "MACD Slow Length", minval=1)
sigLen   = input.int(5,  "MACD Signal Length", minval=1)
src      = input.source(close, "Source")

emaFastLen = input.int(50, "EMA Fast (Trend)")
emaSlowLen = input.int(150, "EMA Slow (Trend)")

useSLTP = input.bool(true, "Enable Stop Loss / Take Profit")
slPerc  = input.float(0.5,  "Stop Loss (%)", minval=0.01)   // percent
tpPerc  = input.float(4,  "Take Profit (%)", minval=0.01) // percent
bePerc  = input.float(0.5,  "Break Even Trigger (%)", minval=0.01) // BE trigger

maxTradesPerDay = input.int(2, "Max Trades Per Day", minval=1)

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

trendLong  = ema50 > ema150
trendShort = ema50 < ema150

// ========== LIMIT ENTRY PER DAY ==========
var int tradesToday = 0
var string prevDayKey = na

curDayKey = str.tostring(year(time)) + "-" + str.tostring(month(time)) + "-" + str.tostring(dayofmonth(time))

if (curDayKey != prevDayKey)
    tradesToday := 0
    prevDayKey := curDayKey

// ========== JAM TRADING WIB ==========
tradeHour = hour(time, "Asia/Jakarta")  // Jam Indonesia

canTrade = (tradeHour >= 05 and tradeHour < 24)  // Entry antara 05:00 - 21:59

// ========== ORDER NAMES ==========
buyId  = "BUY Entry"
sellId = "SELL Entry"

// ========== MANAJEMEN HOLDING DURATION ==========
var int entryDay = na

// Periksa jika ada entri baru, catat tanggalnya
if (bullCross and trendLong) or (bearCross and trendShort)
    if (strategy.position_size == 0) // hanya catat saat ada entri baru
        entryDay := dayofmonth(time)

// ========== EXECUTE TRADES ==========
if (tradesToday < maxTradesPerDay and canTrade)
    if (bullCross and trendLong)
        strategy.entry(buyId, strategy.long)
        tradesToday += 1

    if (bearCross and trendShort)
        strategy.entry(sellId, strategy.short)
        tradesToday += 1

// ========== STOP LOSS / TAKE PROFIT + BREAK EVEN ==========
if (useSLTP)
    // ===== LONG =====
    if strategy.position_size > 0
        entryPrice = strategy.position_avg_price
        stopPrice  = entryPrice * (1 - slPerc/100)
        limitPrice = entryPrice * (1 + tpPerc/100)
        
        // Break-even trigger
        if close >= entryPrice * (1 + bePerc/100)
            stopPrice := math.max(stopPrice, entryPrice) // geser ke BE
        
        strategy.exit("Exit BUY", from_entry=buyId, stop=stopPrice, limit=limitPrice)
    
    // ===== SHORT =====
    if strategy.position_size < 0
        entryPrice = strategy.position_avg_price
        stopPrice  = entryPrice * (1 + slPerc/100)
        limitPrice = entryPrice * (1 - tpPerc/100)
        
        // Break-even trigger
        if close <= entryPrice * (1 - bePerc/100)
            stopPrice := math.min(stopPrice, entryPrice) // geser ke BE
        
        strategy.exit("Exit SELL", from_entry=sellId, stop=stopPrice, limit=limitPrice)

// ========== FORCE EXIT AFTER 2 DAYS ==========
// Periksa apakah posisi sudah lebih dari 2 hari
// dayofmonth(time) - entryDay > 1 akan memicu exit pada hari ke-3
// Pastikan tidak ada posisi terbuka di akhir hari kedua
if (strategy.position_size != 0)
    // Cek apakah posisi sudah melewati 2 hari penuh
    isPastMaxHold = (dayofmonth(time) - entryDay >= 3) and (strategy.position_size != 0)
    
    if isPastMaxHold
        strategy.close_all("Exit after 2 days")

// ========== PLOT EMA ==========
    // plot(ema50, color=color.yellow, title="EMA50")
    // plot(ema150, color=color.rgb(30, 255, 0), title="EMA150")