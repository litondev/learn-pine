// FROM LUXALGO

//@version=5
strategy("Trendline Breakout Strategy", overlay=true, margin_long=100, margin_short=100, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// --------------------
// Settings
// --------------------
length     = input.int(14, 'Swing Detection Lookback')
mult       = input.float(1.0, 'Slope', minval=0, step=.1)
calcMethod = input.string('Atr', 'Slope Calculation Method', options=['Atr','Stdev','Linreg'])
backpaint  = input.bool(true, 'Backpainting offset displayed elements in the past. Disable backpainting to see real time information returned by the indicator.')

slPerc = input.float(1.5, "Stop Loss %", step=0.1)
tpPerc = input.float(3.0, "Take Profit %", step=0.1)

upCss  = input.color(color.teal, 'Up Trendline Color')
dnCss  = input.color(color.red, 'Down Trendline Color')
showExt = input.bool(true, 'Show Extended Lines')

// --------------------
// Variables
// --------------------
var float upper = na
var float lower = na
var float slope_ph = 0.0
var float slope_pl = 0.0

var int upos = 0
var int dnos = 0

offset = backpaint ? length : 0
n = bar_index
src = close

ph = ta.pivothigh(length, length)
pl = ta.pivotlow(length, length)

slope = switch calcMethod
    'Atr'    => ta.atr(length) / length * mult
    'Stdev'  => ta.stdev(src, length) / length * mult
    'Linreg' => math.abs(ta.sma(src * n, length) - ta.sma(src, length) * ta.sma(n, length)) / ta.variance(n, length) / 2 * mult

// --------------------
// Update slope & trendline levels (fixed: use not na(...) checks)
// --------------------
if not na(ph)
    slope_ph := slope
if not na(pl)
    slope_pl := slope

if not na(ph)
    upper := ph
else
    if not na(upper)
        upper := upper - slope_ph

if not na(pl)
    lower := pl
else
    if not na(lower)
        lower := lower + slope_pl

// update upos / dnos
if not na(ph)
    upos := 0
else
    if not na(upper) and close > upper - slope_ph * length
        upos := 1

if not na(pl)
    dnos := 0
else
    if not na(lower) and close < lower + slope_pl * length
        dnos := 1

// --------------------
// Extended trendlines (draw only when pivots exist)
// --------------------
var line uptl = line.new(na, na, na, na, extend=extend.right, color=upCss, style=line.style_dashed)
var line dntl = line.new(na, na, na, na, extend=extend.right, color=dnCss, style=line.style_dashed)

if showExt
    if not na(ph)
        line.set_xy1(uptl, n - offset, ph)
        line.set_xy2(uptl, n - offset + 1, ph - slope)
    if not na(pl)
        line.set_xy1(dntl, n - offset, pl)
        line.set_xy2(dntl, n - offset + 1, pl + slope)

// --------------------
// Plots (gunakan transparansi saat pivot ada supaya plot 'disappear')
// --------------------
plot_val_upper = backpaint ? upper : (not na(upper) ? upper - slope_ph * length : na)
plot_val_lower = backpaint ? lower : (not na(lower) ? lower + slope_pl * length : na)

plot(plot_val_upper, title='Upper', color = not na(ph) ? color.new(upCss, 100) : upCss, offset = -offset)
plot(plot_val_lower, title='Lower', color = not na(pl) ? color.new(dnCss, 100) : dnCss, offset = -offset)

// --------------------
// Breakout shapes
// --------------------
plotshape(upos > upos[1] ? low : na, "Upper Break", shape.labelup, location.absolute, upCss, text="B", textcolor=color.white, size=size.tiny)
plotshape(dnos > dnos[1] ? high : na, "Lower Break", shape.labeldown, location.absolute, dnCss, text="B", textcolor=color.white, size=size.tiny)

// --------------------
// Signals & Strategy entries/exits
// --------------------
longSignal  = upos > upos[1]
shortSignal = dnos > dnos[1]

if (longSignal)
    strategy.entry("Long", strategy.long)
    strategy.exit("Exit Long", "Long", stop = close * (1 - slPerc/100), limit = close * (1 + tpPerc/100))

if (shortSignal)
    strategy.entry("Short", strategy.short)
    strategy.exit("Exit Short", "Short", stop = close * (1 + slPerc/100), limit = close * (1 - tpPerc/100))

// --------------------
// Alerts
// --------------------
alertcondition(longSignal, 'Upward Breakout', 'Price broke the down-trendline upward')
alertcondition(shortSignal, 'Downward Breakout', 'Price broke the up-trendline downward')