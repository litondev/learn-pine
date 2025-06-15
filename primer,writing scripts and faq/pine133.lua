//@version=6
indicator("Dynamically scaled volume", overlay=true, max_lines_count=500)

// Import the PineCoders' VisibleChart library
import PineCoders/VisibleChart/4 as visibleChart

const float    RELATIVE_HEIGHT    = 0.3 // 30% matches the built-in volume indicator.
const string   BOTTOM_TTIP = "Copy the bottom margin % from your chart settings to here, and then set
  the bottom margin to *zero* on the chart settings."

int bottomInput = input.int(title = "Bottom Margin %", defval = 10, minval = 0, maxval = 100, tooltip = BOTTOM_TTIP)

// Get the highest volume, and highest and lowest price points, by calculating on each bar during the visible window.
var float hiVol   = na
var float hiPrice = na
var float loPrice = na
if visibleChart.barIsVisible()
    hiVol   := na(hiVol)   ? volume : math.max(hiVol,   volume)
    hiPrice := na(hiPrice) ? high   : math.max(hiPrice, high)
    loPrice := na(loPrice) ? low    : math.min(loPrice, low)

int bars = visibleChart.bars()
// Calculate the thickness for the lines based on how many bars are displayed.
int lineWidth = math.ceil(1000/bars)

// Draw the lines once, when the visible window ends.
if time == chart.right_visible_bar_time
    // Calculate the bottom y coordinate for all lines once.
    float priceDifference = hiPrice - loPrice
    float scale = (priceDifference / hiVol) * RELATIVE_HEIGHT
    float bottomY = loPrice - (bottomInput / 100) * priceDifference
    // Loop through the visible window using the historical operator.
    for i = bars - 1 to 0
        // Calculate the top y coordinate for each line.
        float topY = bottomY + (volume[i] * scale)
        // Draw the line.
        line.new(x1 = bar_index - i, y1 = bottomY, x2 = bar_index - i, y2 = topY, color = close[i] >= open[i] ?
          color.new(color.green, 50) : color.new(color.red, 50), width = lineWidth)