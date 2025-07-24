//@version=6
indicator("Random demo", overlay = false)

// Generate a random price value (the default range is 0 to 1).
float y = math.random()
// Generate a color with red, green, and blue values as separate random values between 0 and 255.
color plotColor = color.rgb(math.random(0, 255), math.random(0, 255), math.random(0, 255))
plot(series = y, title = "Random number", color = plotColor, linewidth = 2, style = plot.style_circles)