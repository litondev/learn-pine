//@version=6
indicator("Matrix sum example")

//@variable An empty matrix of type "float".
m = matrix.new<float>()

// Add rows to the matrix containing data.
m.add_row(0, array.from(1, 2, 3))
m.add_row(1, array.from(0, 4, 2))
m.add_row(2, array.from(3, 1, 2))

var table displayTable = table.new(position.middle_right, 5, 2)
if barstate.islast
    matrix<float> t = m.transpose()
    table.cell(displayTable, 0, 0, "A",                            text_color = chart.fg_color)
    table.cell(displayTable, 0, 1, str.tostring(m),                text_color = chart.fg_color)
    table.cell(displayTable, 1, 1, "+",                            text_color = chart.fg_color)
    table.cell(displayTable, 2, 0, "Aᵀ",                           text_color = chart.fg_color)
    table.cell(displayTable, 2, 1, str.tostring(t),                text_color = chart.fg_color)
    table.cell(displayTable, 3, 1, "=",                            text_color = chart.fg_color)
    table.cell(displayTable, 4, 0, "A + Aᵀ",                       text_color = color.green)
    table.cell(displayTable, 4, 1, str.tostring(matrix.sum(m, t)), text_color = color.green)