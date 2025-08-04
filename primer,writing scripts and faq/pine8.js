//@version=6
indicator("Historical and realtime logs demo", "Average bar ratio")

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

if barstate.isconfirmed
    switch denominator
        // Log an "error" message when the `denominator` is 0.
        0.0 => log.error("Division by 0 on confirmed bar!\nBar excluded from the average.")
        // Otherwise, log an "info" message containing a formatted representation of the variables' confirmed values.
        => log.info(
             "Values (Confirmed):
             \nnumerator: {0,number,#.########}
             \ndenominator: {1,number,#.########}
             \nratio: {2,number,#.########}
             \naverage: {3,number,#.########}",
             numerator, denominator, ratio, average
         )
else
    switch denominator
        // Log an "error" message for the unconfirmed bar when the `denominator` is 0.
        0.0 => log.error("Division by 0 on unconfirmed bar!")
        // Otherwise, log a "warning" message containing a formatted representation of the unconfirmed values.
        => log.warning(
             "Values (unconfirmed):
             \nnumerator: {0,number,#.########}
             \ndenominator: {1,number,#.########}
             \nratio: {2,number,#.########}
             \naverage: {3,number,#.########}",
             numerator, denominator, ratio, average
         )