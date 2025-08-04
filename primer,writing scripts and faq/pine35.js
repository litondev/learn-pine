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

// On the first or last tick of the latest bar, inspect all labels on the chart.
if barstate.islast and (barstate.isnew or barstate.isconfirmed)
    // Log a message containing the current `bar_index` and `label.all.size()`.
    log.info("Current bar: {0,number,#}, Active labels: {1}", bar_index, label.all.size())
    // Loop through the `label.all` array.
    for [i, lbl] in label.all
        // Log a message containing the array index (`i`) and the label's `x`, `y`, and `text` properties. 
        log.info(
             "{0}, x: {1,number,#}, y: {2,number,#.#####}, text: {3}", i, lbl.get_x(), lbl.get_y(), lbl.get_text()
         )

// Initialize variables for the oldest and newest active labels. 
label oldestLabel = na
label newestLabel = na
// Reassign the variables to the first and last labels in `label.all` when the array is not empty. 
if label.all.size() > 0
    oldestLabel := label.all.first()
    newestLabel := label.all.last()

// Plot the y-coordinate history of the `oldestLabel` and `newestLabel`. 
plot(label.get_y(oldestLabel), "oldestLabel y-coordinate", color.fuchsia, force_overlay = true)
plot(label.get_y(newestLabel), "newestLabel y-coordinate", color.aqua,    force_overlay = true)