//@version=4
study("Relative Strength", shorttitle="RS", resolution="")
comparativeTickerId = input("SPX", type=input.symbol, title="Comparative Symbol")
lenght = input(50, type=input.integer, minval=1, title="Period")
showMA = input(defval=false, type=input.bool, title="Show Moving Average")
lenghtMA = input(10, type=input.integer, minval=1, title="Moving Average Period")
baseSymbol = security(syminfo.tickerid, timeframe.period, close)
comparativeSymbol = security(comparativeTickerId, timeframe.period, close)
hline(0, color=color.black, linestyle=hline.style_dotted)
res = baseSymbol / baseSymbol[lenght] / 
   (comparativeSymbol / comparativeSymbol[lenght]) - 1
plot(res, title="RS", color=#1155CC)
sma_1 = sma(res, lenghtMA)
plot(showMA ? sma_1 : na, color=color.gray)
