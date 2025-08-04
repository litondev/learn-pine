//@version=6
indicator("Loop-invariant code motion demo")

//@function Returns a feature scaled version of `this` array.
featureScale(array<float> this) =>
    array<float> result = array.new<float>()
    for item in this
        result.push((item - array.min(this)) / array.range(this))
    result

//@variable An array containing the most recent 100 `close` prices.
var array<float> prices = array.new<float>(100, close)
// Queue the `close` through the `prices` array.
prices.unshift(close)
prices.pop()

//@variable A feature scaled version of the `prices` array.
array<float> rescaled = featureScale(prices)

// Plot the difference between the first element and the average value in the `rescaled` array.
plot(rescaled.first() - rescaled.avg())