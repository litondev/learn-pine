//@version=6
indicator("Previous and current day open using `request.security()`", "", true, max_lines_count = 500)

string periodInput = input.timeframe("1D", "Higher timeframe")

[htfOpen1, htfOpen2, htfTime, htfTimeClose] = request.security(syminfo.tickerid, periodInput, [open[1], open[2], time[1], time_close[1]], lookahead = barmerge.lookahead_on)
[htfRtOpen, htfRtOpen1] = request.security(syminfo.tickerid, periodInput, [open, open[1]])

var line rtOpen  = line.new(na, na, na, na, xloc.bar_time, color = color.lime)
var line rtOpen1 = line.new(na, na, na, na, xloc.bar_time, color = color.gray)
var int rtStart  = time
var int rtEnd    = time_close(periodInput)

if ta.change(htfTime) != 0
    line.new(htfTime, htfOpen1, htfTimeClose, htfOpen1, xloc.bar_time, color = color.lime)
    line.new(htfTime, htfOpen2, htfTimeClose, htfOpen2, xloc.bar_time, color = color.gray)
    rtStart := time
    rtEnd   := time_close(periodInput)

line.set_xy1(rtOpen1, rtStart, htfRtOpen1), line.set_xy2(rtOpen1, rtEnd, htfRtOpen1)
line.set_xy1(rtOpen,  rtStart, htfRtOpen),  line.set_xy2(rtOpen,  rtEnd, htfRtOpen)

bgcolor(timeframe.change(periodInput) ? color.new(color.gray, 80) : na)