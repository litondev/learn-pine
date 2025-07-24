//@version=6
indicator("Reducing loop calculations demo", overlay = true)

//@function Calculates a moving average of up to `length` unique `source` values filtered by a `mask` array.
filteredMA(float source, int length, array<bool> mask) =>
    // Raise a runtime error if the size of the `mask` doesn't equal the `length`.
    if mask.size() != length
        runtime.error("The size of the `mask` array used in the `filteredMA()` call must match the `length`.")
    //@variable An array containing `length` unique `source` values.
    var array<float> data = array.new<float>(length)
    // Queue unique `source` values into the `data` array.
    if not data.includes(source)
        data.push(source)
        data.shift()
    // The numerator and denominator of the average.
    float numerator   = 0.0
    float denominator = 0.0
    // Loop to calculate sums.
    for item in data
        if na(item)
            continue
        int index = array.indexof(data, item)
        if mask.get(index)
            numerator   += item
            denominator += 1.0
    // Return the average, or the last non-`na` average value if the current value is `na`.
    fixnan(numerator / denominator)

//@variable An array of 100 pseudorandom "bool" values.
var array<bool> randMask = array.new<bool>(100, true)
// Push the first element from `randMask` to the end and queue a new pseudorandom value.
randMask.push(randMask.shift())
randMask.push(math.random(seed = 12345) < 0.5)
randMask.shift()

// Plot the `filteredMA()` of up to 100 unique `close` values filtered by the `randMask`.
plot(filteredMA(close, 100, randMask))