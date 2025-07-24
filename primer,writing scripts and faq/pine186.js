//@version=6
indicator("Number of occurrences demo", overlay = false)

int lengthInput = input.int(100, "Length", minval = 1)

// Condition to count.
bool isUpBar = close > open

// Count using a loop (inefficient).
countWithLoop(bool condition, int length) =>
    int count = 0
    for i = 0 to length - 1
        if condition[i]
            count += 1
    count

// Count using Pine's built-in function. Can be "simple" or "series" length.
countWithSum(bool condition, int length) =>
    float result = math.sum(condition ? 1 : 0, length)

float v1 = countWithSum(isUpBar,  math.min(lengthInput, bar_index + 1))
int   v2 = countWithLoop(isUpBar, math.min(lengthInput, bar_index + 1))
plot(v1, "Efficient count",       color.red,   4)
plot(v2, "Inefficient count",     color.black, 1)