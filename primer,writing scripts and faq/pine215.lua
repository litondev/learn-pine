//@version=6
indicator("Exact date/time detector", overlay = true)
bgcolor(time == input.time(timestamp("2025-03-24 10:00"), "Target Date/Time") ? color.new(color.green, 90) : na)