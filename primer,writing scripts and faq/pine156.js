//@version=6
strategy("Exit on entry bar with specific price", overlay = true)

int exitTickSizeInput = input.int(10, "Exit if price moves this many ticks", minval = 1)

//@variable Is `true` on every 100th bar.
bool buyCondition = bar_index % 10 == 0

// Place orders when `buyCondition` is true and we are not in a position.
if buyCondition and strategy.position_size == 0.0
    strategy.entry("buy", strategy.long)
    strategy.exit("exit", "buy", profit = exitTickSizeInput, loss = exitTickSizeInput)