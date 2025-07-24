//@version=6
indicator("Split a string into characters")

string sourceStringInput = input.string("123456789", "String to Split")
var array<string> charactersArray = str.split(sourceStringInput, "")

if barstate.islast
    string txt = sourceStringInput + "\n" + str.tostring(charactersArray)
    var label = label.new(na, na, txt, xloc.bar_index, yloc.price, color(na), label.style_label_left, chart.fg_color, size.large, text.align_left)
    label.set_xy(label, bar_index, open)