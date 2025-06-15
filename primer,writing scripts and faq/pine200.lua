//@version=6
indicator("varip vs var demo")

// `var`  : Retains value across bars, resets on intrabar price updates.
// 'varip': Retains value across bars and across intrabar price updates within a realtime bar.
var   int varCount   = -1
varip int varipCount = -1

// Increment `varCount` on each bar and `varipCount` on each intrabar price update.
varCount   += 1
varipCount += 1

// Plot values for comparison.
plot(varCount,   "var counter",   color.fuchsia, 4)
plot(varipCount, "varip counter", color.lime)