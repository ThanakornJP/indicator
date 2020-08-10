// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ThanakornJP

//@version=4
study(title="MustardLine", overlay=true)
nATRPeriod = input(14)
nATRMultip = input(1.5)
xATR = atr(nATRPeriod)
nLoss = nATRMultip * xATR
xATRTrailingStop = 0.0
xATRTrailingStop := iff(close > nz(xATRTrailingStop[1], 0) and close[1] > nz(xATRTrailingStop[1], 0), max(nz(xATRTrailingStop[1]), close - nLoss),iff(close < nz(xATRTrailingStop[1], 0) and close[1] < nz(xATRTrailingStop[1], 0), min(nz(xATRTrailingStop[1]), close + nLoss), iff(close > nz(xATRTrailingStop[1], 0), close - nLoss, close + nLoss)))

plot(xATRTrailingStop, color=color.red, title="Trailing Stop", display=display.none)
plot(iff(close>open,open-nLoss,close-nLoss),color=color.red, title="ATR Stop", display=display.none)
plot(iff(close>open,close+nLoss,open+nLoss),color=color.green, title="ATR Target", display=display.none)

//------------------------------------------------------------------------------------
analysis_term = input(title="Analysis Term", defval="Annual", options=["Half Year", "Annual"])
plot(analysis_term == "Half Year" ? sma(close,100) : analysis_term == "Annual" ? sma(close,200) : na, linewidth=3, color=#B2BEB5, title="Analysis Term Baseline")

//------------------------------------------------------------------------------------

plot(security(syminfo.tickerid,"D", ema(close, 21)), linewidth=1, color=#FFCCFF, title="MA-D")
plot(security(syminfo.tickerid,"240", ema(close, 21)), linewidth=1, color=#FF66FF, title="MA-H4")
plot(security(syminfo.tickerid,"60", ema(close, 21)), linewidth=1, color=#FF00FF, title="MA-H1")
plot(security(syminfo.tickerid,"15", ema(close, 21)), linewidth=1, color=#FF66B2, title="MA-M15")
plot(security(syminfo.tickerid,"5", ema(close, 21)), linewidth=1, color=#ff007F, title="MA-M5")

//------------------------------------------------------------------------------------
ema5_momentum = ema(close,5)
sma8_momentum = sma(close,8)
ema21_speed = ema(close,21)
ema55_speed = ema(close,55)

ema12_macd = ema(close,12)
ema26_macd = ema(close,26)

hma100 = hma(close,100)

//plot(ema5_momentum, color=bar_index % 2 == 0 ? #CC99FF : color.white, linewidth=1, title="EMA5 Momentum")
plot(ema5_momentum, color=#CC99FF, style=plot.style_cross, title="EMA5 Momentum", linewidth=2)
plot(sma8_momentum, color=#CC99FF, title="SMA8 Momuntum", linewidth=1)
//plot(ema21_speed, color=bar_index % 2 == 0 ? #FFCCCC : color.white, linewidth=1, title="EMA21 Speed")
plot(ema21_speed, color=#FFCCCC, style=plot.style_circles, title="EMA21 Speed", linewidth=2)
plot(ema55_speed, color=#FFCCCC, title="EMA55 Speed", linewidth=1)

plot(ema12_macd, color=color.blue, title="EMA12 MACD", linewidth=1)
plot(ema26_macd, color=color.orange, title="EMA26 MACD", linewidth=1)

plot(hma100, color=color.blue, title="HMA100", linewidth=1)

//------------------------------------------------------------------------------------
vwma_duraion = input(13)
//vwma = vwma(close,vwma_duraion) 
vwma = sma(close * volume, vwma_duraion) / sma(volume, vwma_duraion)
plot(vwma, color=color.red, title="VWMA", display=display.none)

