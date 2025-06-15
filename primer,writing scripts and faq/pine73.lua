//@version=6
indicator("Minimizing historical buffer calculations demo", overlay = true)

//@variable A polyline with points that form a histogram of `source` values.
var polyline display = na
//@variable The difference Q3 of `high` prices and Q1 of `low` prices over 500 bars.
float innerRange = ta.percentile_nearest_rank(high, 500, 75) - ta.percentile_nearest_rank(low, 500, 25)
// Calculate the highest and lowest prices, and the total price range, over 500 bars.
float highest    = ta.highest(500)
float lowest     = ta.lowest(500)
float totalRange = highest - lowest

//@variable The source series for histogram calculation. Its value is the midpoint between the `open` and `close`.
float source = math.avg(open, close)
// Explicitly define a 500-bar historical buffer for the `source` to prevent recalculation.
max_bars_back(source, 500)

if barstate.islast
    polyline.delete(display)
    // Calculate the number of histogram bins and their size.
    int   bins    = int(math.round(5 * totalRange / innerRange))
    float binSize = totalRange / bins
    //@variable An array of chart points for the polyline.
    array<chart.point> points = array.new<chart.point>(bins, chart.point.new(na, na, na))
    // Loop to build the histogram.
    for i = 0 to 499
        //@variable The histogram bin number. Uses past values of the `source` for its calculation.
        //          Since the `source` now has an appropriate predefined buffer, the script no longer needs 
        //          to recalculate across previous bars to determine the referencing length. 
        int index = int((source[i] - lowest) / binSize)
        if na(index)
            continue
        chart.point currentPoint = points.get(index)
        if na(currentPoint.index)
            points.set(index, chart.point.from_index(bar_index + 1, (index + 0.5) * binSize + lowest))
            continue
        currentPoint.index += 1
    // Add final points to the `points` array and draw the new `display` polyline.
    points.unshift(chart.point.now(lowest))
    points.push(chart.point.now(highest))
    display := polyline.new(points, closed = true)

plot(bar_index + 1, "Number of bars", display = display.data_window)