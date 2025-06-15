//@version=6
indicator("Inspecting individual elements demo")

//@variable The number of bars in the calculation. 
int lengthInput = input.int(20, "Length", 2)

//@variable The change in price across `lengthInput` - 1 bars. 
float priceChange = ta.change(close, lengthInput - 1)
//@variable The total `close` range over `lengthInput` bars.
float priceRange = ta.range(close, lengthInput)

//@variable The ratio of the `priceChange` to the `priceRange`. 
float osc = priceChange / priceRange

//@variable Teal if `osc` is positive, maroon otherwise.
color oscColor = osc > 0 ? color.teal : color.maroon

// Draw a label at the current bar's `bar_index` and `close` displaying `priceChange` when `osc` is 1 or -1. 
if math.abs(osc) == 1
    string labelText = str.format("priceChange: {0,number,#.####}", priceChange)
    label.new(bar_index, close, labelText, color = oscColor, textcolor = color.white, force_overlay = true)

// Plot the `osc` using the `oscColor`.
plot(osc, "Oscillator", oscColor, 1, plot.style_area)