//@version=6
indicator("`request.*()` call limit demo")

//@variable The sum of values requested from all `request.security()` calls.
float reqSum = 0.0

// Call `request.security()` 50 times within a loop with different `timeframe` arguments. 
// This loop causes a runtime error when `i == 41` because each iteration executes a unique request.
for i = 1 to 50
    reqSum += request.security(syminfo.tickerid, str.tostring(i), close)

plot(reqSum)