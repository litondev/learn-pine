//@version=6 
indicator("Using built-ins demo")

//@variable A user-defined function to calculate the highest `source` value over `length` bars.
pineHighest(float source, int length) =>
    float result = na
    if bar_index + 1 >= length
        result := source
        if length > 1
            for i = 1 to length - 1
                result := math.max(result, source[i])
    result

//@variable A faster user-defined function to calculate the highest `source` value over `length` bars.
//          This version only requires a loop when the highest value is removed from the window, the `length` 
//          changes, or when the number of bars first becomes sufficient to calculate the result. 
fasterPineHighest(float source, int length) =>
    var float result = na
    if source[length] == result or length != length[1] or bar_index + 1 == length
        result := source
        if length > 1
            for i = 1 to length - 1
                result := math.max(result, source[i])
    else
        result := math.max(result, source)
    result

plot(pineHighest(close, 20))
plot(fasterPineHighest(close, 20))
plot(ta.highest(close, 20))