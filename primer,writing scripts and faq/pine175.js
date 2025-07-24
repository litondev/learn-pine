//@version=6
indicator("Stack text demo", "", true)

plotshape(true, "", shape.arrowup,   location.abovebar, color.green,  textcolor = color.green,  text = "A")
plotshape(true, "", shape.arrowup,   location.abovebar, color.lime,   textcolor = color.lime,   text = "B\n")
plotshape(true, "", shape.arrowdown, location.belowbar, color.red,    textcolor = color.red,    text = "C")
plotshape(true, "", shape.arrowdown, location.belowbar, color.maroon, textcolor = color.maroon, text = "\nD")