//@version=6
indicator("Debugging objects of UDTs demo")

//@type              A structure for storing time and price information once every `sampleMult` bars.
//@field prices      References an array of "float" price values.
//@field times       References an array of "int" UNIX timestamps.
//@field sampleMult  Number of bars per sample.
type Data
    array<float> prices
    array<int>   times
    int          sampleMult

//@variable The initial seed for the `math.random()` function.
int seedInput = input.int(1234, "Seed", 1)

//@variable References a `Data` object with arrays of 10 elements and a random `sampleMult` value. 
var Data data = Data.new(array.new<float>(10), array.new<int>(10), int(math.random(1, 11, seedInput)))

// Queue new data through the `prices` and `times` arrays of the `Data` object once every `data.sampleMult` bars. 
if bar_index % data.sampleMult == 0
    data.prices.push(close)
    data.times.push(time)
    data.prices.shift()
    data.times.shift()

//@variable The time-based slope calculated from the `data` array fields. 
float slope = array.covariance(data.prices, data.times) / data.times.variance()

// Plot the `slope` value. 
plot(slope, "Slope", slope > 0 ? color.teal : color.maroon, 3)