//@version=6
indicator("Drawing in visible ranges demo", "Average bar ratio")

//@variable The current bar's change from the `open` to `close`.
float numerator = close - open
//@variable The current bar's `low` to `high` range.
float denominator = high - low
//@variable The ratio of the bar's open-to-close change to its full range.
float ratio = numerator / denominator
//@variable The average `ratio` over 10 *non-na* values.
float average = ta.sma(ratio, 10)

// Plot the `average`.
plot(average, "average", color.purple, 3)

if time >= chart.left_visible_bar_time and time <= chart.right_visible_bar_time
    if barstate.isconfirmed
        if denominator == 0
            string debugText = "Division by 0 on confirmed bar!\nBar excluded from the average."
            label.new(bar_index, high, color = color.red, tooltip = debugText, force_overlay = true)
        else
            string debugText = str.format(
                 "Values (Confirmed):
                 \nnumerator: {0,number,#.########}
                 \ndenominator: {1,number,#.########}
                 \nratio: {2,number,#.########}
                 \naverage: {3,number,#.########}",
                 numerator, denominator, ratio, average
             )
            label.new(bar_index, high, tooltip = debugText, force_overlay = true)
    else
        if denominator == 0
            string debugText = "Division by 0 on unconfirmed bar!"
            label.new(bar_index, high, color = color.red, tooltip = debugText, force_overlay = true)
        else
            string debugText = str.format(
                 "Values (unconfirmed):
                 \nnumerator: {0,number,#.########}
                 \ndenominator: {1,number,#.########}
                 \nratio: {2,number,#.########}
                 \naverage: {3,number,#.########}",
                 numerator, denominator, ratio, average
             )
            label.new(bar_index, high, color = color.orange, tooltip = debugText, force_overlay = true)