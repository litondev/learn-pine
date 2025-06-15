//@version=6
indicator("Pip calculation example")

// @function            Calculates the chart symbol's base unit of change in asset prices.
// @returns             (float) A ticks or pips value of base units of change.
calcBaseUnit() =>
    bool isForexSymbol = syminfo.type         == "forex"
    bool isYenQuote    = syminfo.currency     == "JPY"
    bool isYenBase     = syminfo.basecurrency == "JPY"
    float result = isForexSymbol ? isYenQuote ? 0.01 : isYenBase ? 0.00001 : 0.0001 : syminfo.mintick

// Call the function and plot the result in a label
var label baseUnitLabel = na
if barstate.islast
    baseUnitLabel := label.new(x=bar_index + 1, y=open, text="Base Unit: " + str.tostring(calcBaseUnit(), "#.######"), 
      style=label.style_label_left, color=color.new(color.blue, 0), textcolor=color.white)
    label.delete(baseUnitLabel[1])