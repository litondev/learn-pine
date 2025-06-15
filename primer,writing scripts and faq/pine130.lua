//@version=6
indicator("Average session opening volume")

import PineCoders/ConditionalAverages/1 as PCca

// Color aqua for the session's opening bar, otherwise distinct colors for up/down volume columns.
color volumeColor = switch
    session.isfirstbar_regular => color.aqua
    close > open               => color.new(#D1D4DC, 65)
    =>                            color.new(#787B86, 65)

// Plot the volume columns.
plot(volume, "volume", volumeColor, 4, plot.style_histogram)
// Average volume over *all* session opening bars in the dataset.
plot(PCca.avgWhen(src = volume, cond = session.isfirstbar_regular), "avg. When", #FF00FF)
// Average volume over the last five opening bars.
plot(PCca.avgWhenLast(src = volume, cond = session.isfirstbar_regular, cnt = 5), "avgWhenInLast()", #00FF00)