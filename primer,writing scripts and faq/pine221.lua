//@version=6
indicator("Countdown timer", overlay = true)

if not ((timeframe.isdaily and timeframe.multiplier == 1) or timeframe.isintraday)
    runtime.error("This script functions only on daily or intraday timeframes.")

// Inputs for bullish and bearish candle colors
color bullishCandleColor = input.color(color.green, "Bullish Candle Color")
color bearishCandleColor = input.color(color.red, "Bearish Candle Color")

// Analyse the candle colors to see if black or white text has better contrast
f_contrastColor(bgColor) =>
    // Calculate luminance (relative brightness) using standard formula
    luminance = 0.2126 * color.r(bgColor) + 0.7152 * color.g(bgColor) + 0.0722 * color.b(bgColor)
    contrastColor = luminance > 127.5 ? color.black : color.white

color bullishContrastColor = f_contrastColor(bullishCandleColor)
color bearishContrastColor = f_contrastColor(bearishCandleColor)

int timeLeftInBar = time_close - math.min(timenow, time_close)

var table timer = table.new(position = position.middle_right, columns = 1, rows = 1)
if barstate.isfirst
    table.cell(timer, 0, 0, text_color = chart.fg_color, text_size = 11)
else if barstate.islast
    string timeFormat = timeLeftInBar >= 60 * 60 * 1000 ? "HH:mm:ss" : "mm:ss"
    string countDown = str.format_time(timeLeftInBar, timeFormat, "UTC-0")
    table.cell_set_text(timer, 0, 0, countDown)
    bool isUpCandle = close >= open
    table.cell_set_text_color(timer, 0, 0, isUpCandle ? bullishContrastColor : bearishContrastColor)
    color bgcolor = isUpCandle ? bullishCandleColor : bearishCandleColor
    table.cell_set_bgcolor(timer, 0, 0, bgcolor)