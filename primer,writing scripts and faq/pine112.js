//@version=6
indicator("Using `var` with arrays")
//@variable An array that initializes on every bar.
a = array.new<float>()
array.push(a, close)
//@variable An array that expands its size by 1 on each bar.
var b = array.new<float>(0)
array.push(b, close)
// Populate a table on the chart's last bar to display the sizes of the arrays and compare it to the number of chart bars.
if barstate.islast
    var table displayTable = table.new(position.middle_right, 2, 3)
    table.cell(displayTable, 0, 0, "Array A size:",             text_color = chart.fg_color, text_halign = text.align_right)
    table.cell(displayTable, 1, 0, str.tostring(a.size()),      text_color = chart.fg_color, text_halign = text.align_left)
    table.cell(displayTable, 0, 1, "Array B size:",             text_color = chart.fg_color, text_halign = text.align_right)
    table.cell(displayTable, 1, 1, str.tostring(b.size()),      text_color = chart.fg_color, text_halign = text.align_left)
    table.cell(displayTable, 0, 2, "Number of chart bars:",     text_color = chart.fg_color, text_halign = text.align_right)
    table.cell(displayTable, 1, 2, str.tostring(bar_index + 1), text_color = chart.fg_color, text_halign = text.align_left)