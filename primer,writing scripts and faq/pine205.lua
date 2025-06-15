//@version=6
indicator("`na` example")
string conditionInput = input.string("a != b", "Condition", options=["a != b","a == b", "a > b", "a < b"])
int a = 1
int b = na
bool condition = switch conditionInput
    "a != b" => a != b
    "a == b" => a == b
    "a > b"  => a > b
    "a < b"  => a < b

if barstate.islastconfirmedhistory
    string conditionText = condition ? "true" : "false"
    label.new(
      x = bar_index,
      y = high,
      text = "a = 1\nb = na\n" + conditionInput + ": " + conditionText,
      color = condition ? color.green : color.red,
      textcolor = color.new(chart.fg_color, 0),
      style = label.style_label_down,
      size = size.large
      )