//@version=6
indicator("Reducing repetition demo")

//@function Counts the number of elements in `this` array above the element at a specified `index`.
method valuesAbove(array<float> this, int index) =>
    int result = 0
    float reference = this.get(index)
    for [i, value] in this
        if i == index
            continue
        if value > reference
            result += 1
    result

//@variable An array containing the most recent 100 `close` prices.
var array<float> data = array.new<float>(100)
data.push(close)
data.shift()

//@variable The number values in the `data` array above the value at its last index.
int count = data.valuesAbove(99)

//@variable Returns `color.purple` with a varying transparency based on the `valuesAbove()`.
color plotColor = switch
    count <= 10  => color.new(color.purple, 90)
    count <= 20  => color.new(color.purple, 80)
    count <= 30  => color.new(color.purple, 70)
    count <= 40  => color.new(color.purple, 60)
    count <= 50  => color.new(color.purple, 50)
    count <= 60  => color.new(color.purple, 40)
    count <= 70  => color.new(color.purple, 30)
    count <= 80  => color.new(color.purple, 20)
    count <= 90  => color.new(color.purple, 10)
    count <= 100 => color.new(color.purple, 0)

// Plot the `count`.
plot(count, color = plotColor, style = plot.style_area)