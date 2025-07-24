//@version=6
indicator("Time to string example")

// Function converts a timestamp to a formatted string.
timeToString(t) =>
    str.format_time(t, format = "YYYY.MM.dd @ HH:mm:ss")

var int t = time  // Capture the time of the first bar in the dataset.

var table tbl = table.new(position.middle_right, 1, 1)  // Create table on the first bar only.

// On the first bar, build the table cell.
if barstate.isfirst
    table.cell(tbl, 0, 0, "", bgcolor = color.yellow, text_color = color.black, 
      text_halign = text.align_left, text_font_family = font.family_monospace)

// On the last bar, build display text and populate the table.
else if barstate.islast
    string txt = str.format(
      "Date/time at bar_index = 0               {0}
      \nCurrent Date/time                        {1}
      \nDate/time 4 days from current time       {2}
      \nDate/time at beginning of last bar       {3}
      \nDate/time 4 days after last bar''s start: {4}",
      timeToString(t), 
      timeToString(timenow),
      timeToString(timestamp(year(timenow), month(timenow), dayofmonth(timenow) + 4, hour(timenow), minute(timenow), 
      second(timenow))),
      timeToString(time), 
      timeToString(timestamp(year, month, dayofmonth + 4)))
    table.cell_set_text(tbl, 0, 0, txt)