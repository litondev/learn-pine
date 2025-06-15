long _startMain = System.timeNow() // Start time for the script's overall execution.

// <Additional internal code executes here>

//@version=6
indicator("Profiler's inner workings demo") // Declaration statements do not require profiling.

int seedInput = input.int(12345, "Seed") // Variable declaration without significant calculation.

type LCG        // Type declarations do not require profiling.
    float state

method generate(LCG this, int generations = 1) => // Function signature does not affect runtime.
    float result = 0.0 // Variable declaration without significant calculation.

    long _start11 = System.timeNow() // Start time for the loop block that begins on line 11.
    for i = 1 to generations // Loop header calculations are not independently wrapped.

        long _start12 = System.timeNow() // Start time for line 12.
        this.state := 16807 * this.state % 2147483647
        registerPerf(System.timeNow() - _start12, line12) // Register performance info for line 12.

        long _start13 = System.timeNow() // Start time for line 13.
        result += this.state / 2147483647
        registerPerf(System.timeNow() - _start13, line13) // Register performance info for line 13.

    registerPerf(System.timeNow() - _start11, line11, line13) // Register performance info for the block (line 11 - 13).    

    long _start14 = System.timeNow() // Start time for line 14.
    result / generations
    registerPerf(System.timeNow() - _start14, line14) // Register performance info for line 14.

long _start16 = System.timeNow() // Start time for line 16.
var lcg = LCG.new(seedInput)
registerPerf(System.timeNow() - _start16, line16) // Register performance info for line 16.

var float val0 = 1.0 // Variable declarations without significant calculations.
var float val1 = 1.0
var float val2 = 1.0

long _start22 = System.timeNow() // Start time for the `if` block that begins on line 22.
if lcg.generate(10) < 0.5 // `if` statement is not independently wrapped.

    long _start23 = System.timeNow() // Start time for line 23.
    val0 *= 1.0 + (2.0 * lcg.generate(50) - 1.0) * 0.1
    registerPerf(System.timeNow() - _start23, line23) // Register performance info for line 23.

else if lcg.generate(10) < 0.5 // `else if` statement is not independently wrapped.

    long _start25 = System.timeNow() // Start time for line 25.
    val1 *= 1.0 + (2.0 * lcg.generate(50) - 1.0) * 0.1
    registerPerf(System.timeNow() - _start25, line25) // Register performance info for line 25.

else if lcg.generate(10) < 0.5 // `else if` statement is not independently wrapped.

    long _start27 = System.timeNow() // Start time for line 27.
    val2 *= 1.0 + (2.0 * lcg.generate(50) - 1.0) * 0.1
    registerPerf(System.timeNow() - _start27, line27) // Register performance info for line 27.

registerPerf(System.timeNow() - _start22, line22, line28) // Register performance info for the block (line 22 - 28).

long _start29 = System.timeNow() // Start time for line 29.
plot(math.avg(val0, val1, val2), "Average pseudorandom result", color.purple)
registerPerf(System.timeNow() - _start29, line29) // Register performance info for line 29.

// <Additional internal code executes here>

registerPerf(System.timeNow() - _startMain, total) // Register the script's overall performance info.