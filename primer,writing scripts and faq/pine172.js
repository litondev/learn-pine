//@version=6
indicator("Box and label text", overlay = true)

if barstate.islastconfirmedhistory
    bt = "This long text is inside of a box, which means it is automatically wrapped and scaled to be visible in the constraints of the box."
    lt = "This long text is inside of a label, which means that it is displayed as is, and the label is simply drawn around it. It doesn't change when the chart is scaled."
    box.new(bar_index[50], close * 1.1, bar_index, close, text = bt, text_wrap = text.wrap_auto, text_size = 36)
    label.new(bar_index[25], close * 1.1, lt, size = 36)