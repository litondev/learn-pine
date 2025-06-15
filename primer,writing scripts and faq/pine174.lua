//@version=6
indicator("Text position demo", "", true)

hideBackgroundInput = input.bool(false, "Hide Background")
color backgroundColor = hideBackgroundInput ? color(na) : color.new(color.gray,70)
// @function            Prints a label with the specified text at a specific position and alignment.
// @param txt           (string) The text to be displayed in the label.
// @param pos           (string) The label style.
// @param align         (string) The horizontal alignment of text within the label.
// @returns             (void) Function has no explicit return.
print(string txt, string pos, string align) =>
    var label lbl = label.new(na, na, na, xloc.bar_index, yloc.price, backgroundColor, pos, chart.fg_color,
      size.huge, align, text_font_family = font.family_monospace)
    label.set_xy(lbl, bar_index, high)
    label.set_text(lbl, txt)

if input.bool(true, "Show Left Label")
    print("label_left\ntext.align_left", label.style_label_left,   text.align_left)
if input.bool(true, "Show Right Label")
    print("label_right\ntext.align_right", label.style_label_right,  text.align_right)
if input.bool(false, "Show Center Label")
    print("label_center\nalign_center",  label.style_label_center, text.align_center)