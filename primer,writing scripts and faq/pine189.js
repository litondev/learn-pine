//@version=6
indicator("Rescaling and normalizing values", "", overlay = false)

// @function            Rescales a signal with a known scale (bounded) to a new scale.
// @param src           (series float) The series to rescale.
// @param oldMin        (simple float) The minimum value of the original signal's scale.
// @param oldMax        (simple float) The maximum value of the original signal's scale.
// @param newMin        (simple float) The minimum value of the new scale.
// @param newMax        (simple float) The maximum value of the new scale.
// @returns             (float) The rescaled value of the signal.
rescale(series float src, simple float oldMin, simple float oldMax, simple float newMin, simple float newMax) =>
    float result = newMin + (newMax - newMin) * (src - oldMin) / math.max(oldMax - oldMin, 10e-10)

// @function        Rescales a signal with an unknown scale (unbounded) using its historical low and high values.
// @param src       (series float) The series to rescale.
// @param min       (simple float) The minimum value of the rescaled series.
// @param max       (simple float) The maximum value of the rescaled series.
// @returns         (float) The rescaled value of the signal.
normalize(series float src, simple float min, simple float max) =>
    var float historicMin = 10e10
    var float historicMax = -10e10
    historicMin := math.min(nz(src, historicMin), historicMin)
    historicMax := math.max(nz(src, historicMax), historicMax)
    float result = min + (max - min) * (src - historicMin) / math.max(historicMax - historicMin, 10e-10)

// ————— Plot normalized CCI
cci = ta.cci(close, 20)
plot(normalize(cci, 100, 300), "Normalized CCI", #2962FF)
// Arbitrary and inexact equivalent of 100 and -100 levels rescaled to the 100/300 scale.
band00 = hline(150, "Lower Band", color.new(#C0C0C0, 90), hline.style_solid)
band01 = hline(250, "Upper Band", color.new(#C0C0C0, 90), hline.style_solid)
fill(band01, band00, color.new(#21328F, 80), "Background")

// ————— Plot normalized volume in the same region as the rescaled RSI
color volColor = close > open ? #26a69a : #ef5350
plot(normalize(volume, -100, 100), "Normalized volume", volColor, style = plot.style_columns, histbase = -100)
hline(100,  "", color.new(color.gray, 50), hline.style_dashed)
hline(-100, "", color.new(color.gray, 50), hline.style_solid)

// ————— Plot rescaled RSI
plot(rescale(ta.rsi(close, 14), 0, 100, -100, 100), "Rescaled RSI", #8E1599)
hline(0, "RSI 50 level", color.new(color.gray, 70), hline.style_solid)
// Precise equivalent of 70 and 30 levels rescaled to the -100/100 scale.
band10 = hline(-40, "Lower Band", color.new(#9915FF, 80), hline.style_solid)
band11 = hline(40,  "Upper Band", color.new(#9915FF, 80), hline.style_solid)
fill(band11, band10, color.new(#9915FF, 90), "Background")

// ————— Plot original values in Data Window
plot(na,                "═══════════════",     display = display.data_window)
plot(cci,               "Original CCI",        display = display.data_window)
plot(volume,            "Original volume",     display = display.data_window)
plot(ta.rsi(close, 14), "Original RSI",        display = display.data_window)