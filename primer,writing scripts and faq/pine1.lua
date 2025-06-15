//@version=6
indicator("MACD #2")
fastInput = input(12,"Fast Length")
slowInput = input(26,"Slow Length")
[macdLine, signalLine, histLine] = ta.macd(close,fastInput,slowInput,9)
plot(macdLine,color = color.red)
plot(signalLine,color = color.blue)