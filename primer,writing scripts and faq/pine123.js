//@version=6
indicator("Debugging arrays with tables", overlay = true)

// Import the `getSeries` PineCoders library to build fixed-size arrays populated on specific conditions.
//      https://www.tradingview.com/v/Bn7QkdZR/
import PineCoders/getSeries/1 as PCgs

// Calculate MAs and create cross condition.
float ma50        = ta.sma(close,  50)
float ma200       = ta.sma(close,  200)
bool  goldenCross = ta.cross(ma50, ma200)

// Calculate the RSI and determine if it's hitting a new all-time high.
float myRsi       = ta.rsi(close,  20)
bool newRsiAth    = myRsi == ta.max(myRsi)

// Create two arrays using the imported `whenSince()` function.
array<float> goldenCrossesTimes = PCgs.whenSince(time_close, goldenCross, length = 6)
array<float> barIndicesOfHiRSIs = PCgs.whenSince(bar_index,  newRsiAth,   length = 8)

// Plot the MAs for cross reference.
plot(ma50,  "50 MA",  color.aqua)
plot(ma200, "200 MA", color.orange)

// On the last historical bar, display the date and time of the last crosses.
if barstate.islast
    // Declare our MA table to display the Golden Cross times. 
    var table maTable  = table.new(position.top_right, 2, 8, color.new(color.black, 100), color.gray, 1, color.gray, 1)
    // Create a title cell for the MA table and merge cells to form a banner two cells wide.
    table.cell(maTable , 0, 0, "Golden Cross Times", text_color = color.black, bgcolor = #FFD700)
    table.merge_cells(maTable , 0, 0, 1, 0)
    // Loop the array and write cells to the MA table containing the cross time for each element of the array. Number each element in the left row.
    // Format the UNIX time value to a formatted time string using `str.format_time()`.
    for [i, timeValue] in goldenCrossesTimes
        table.cell(maTable, 0, i + 1, str.tostring(i + 1), text_color = #FFD700)
        table.cell(maTable, 1, i + 1, str.format_time(int(timeValue), "yyyy.MM.dd 'at' HH:mm:ss z"), text_color = chart.fg_color)
    // Create a second table to display the indices of the last eight RSI all-time highs.
    var table rsiTable = table.new(position.bottom_right, 1, 1, color.new(color.black, 100), color.gray, 1, color.gray, 1)
    table.cell(rsiTable, 0, 0, "Bar indices of RSI ATHs\n" + str.tostring(barIndicesOfHiRSIs), text_color = chart.fg_color)