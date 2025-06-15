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

//@variable Returns `color.purple` with a varying transparency based on the `valuesAbove()`.
color plotColor = switch
    data.valuesAbove(99) <= 10  => color.new(color.purple, 90)
    data.valuesAbove(99) <= 20  => color.new(color.purple, 80)
    data.valuesAbove(99) <= 30  => color.new(color.purple, 70)
    data.valuesAbove(99) <= 40  => color.new(color.purple, 60)
    data.valuesAbove(99) <= 50  => color.new(color.purple, 50)
    data.valuesAbove(99) <= 60  => color.new(color.purple, 40)
    data.valuesAbove(99) <= 70  => color.new(color.purple, 30)
    data.valuesAbove(99) <= 80  => color.new(color.purple, 20)
    data.valuesAbove(99) <= 90  => color.new(color.purple, 10)
    data.valuesAbove(99) <= 100 => color.new(color.purple, 0)

// Plot the number values in the `data` array above the value at its last index. 
plot(data.valuesAbove(99), color = plotColor, style = plot.style_area)