//@version=6
indicator("Inputs", overlay = true)

// Defining options strings improves script readability.
// It also enables the creation of boolean variables by comparing these constants with user input strings in a single line of code.
string EQ1 = "On"
string EQ2 = "Off"

// The `GRP*` strings used for group headers demonstrate using ASCII characters to create a visual boundary,
// making it easier for users to differentiate between different sections in the menu.

// Group 1 demonstrates inline inputs that do not align vertically in the menu.
string GRP1 = "════════════ Settings ═════════════" // ASCII 205
float  ao1SrcInput    = input.source(close, "AO source",     inline = "11", group = GRP1)
int    ao1LenInput    = input.int(14,       "Length",        inline = "11", group = GRP1)
float  long1SrcInput  = input.source(close, "Signal source", inline = "12", group = GRP1)
int    long1LenInput  = input.int(3,        "Length",        inline = "12", group = GRP1)

// In Group 2, the title of `ao2SrcInput` is padded with three Unicode EN spaces (U+2002) to compensate for the misalignment.
string GRP2           = "──────────── Settings ────────────" // ASCII 196
float  ao2SrcInput    = input.source(close, "AO source   ",  inline = "21", group = GRP2)
int    ao2LenInput    = input.int(14,       "Length",        inline = "21", group = GRP2)
float  long2SrcInput  = input.source(close, "Signal source", inline = "22", group = GRP2)
int    long2LenInput  = input.int(3,        "Length",        inline = "22", group = GRP2)

// This configuration uses Unicode white space characters to indent input sub-sections. We use Em space ( ): 8195 (0x2003).
string GRP3           = "————————————— Settings ———————————————" // ASCII 151 (Em dash)
float  level1Input    = input.float(65.,    "First level",               group = GRP3)
float  level2Input    = input.float(65.,    "  Second Level",            group = GRP3)
bool   level3Input    = input.string(EQ1,   "    Checkbox equivalent",   group = GRP3, options = [EQ1, EQ2]) == EQ1
float  level4Input    = input.float(65.,    "Widest Legend            ", group = GRP3)

// These options demonstrate the use of the `inline` parameter to create structured blocks of inputs that are relevant to one another.
string GRP4 = "------------------------ Settings ----------------------------" // ASCII 45 (dash)
bool   showMa1Input   = input(true,         "MA №1", inline = "1", group = GRP4)
string ma1TypeInput   = input.string("SMA", "",      inline = "1", group = GRP4, options = ["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"])
float  ma1SourceInput = input(close,        "",      inline = "1", group = GRP4)
int    ma1LengthInput = input.int(20,       "",      inline = "1", group = GRP4, minval = 1)
color  ma1ColorInput  = input(#f6c309,    "",      inline = "1", group = GRP4)

bool   showMa2Input   = input(true,         "MA №2", inline = "2", group = GRP4)
string ma2TypeInput   = input.string("SMA", "",      inline = "2", group = GRP4, options = ["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"])
float  ma2SourceInput = input(close,        "",      inline = "2", group = GRP4)
int    ma2LengthInput = input.int(50,       "",      inline = "2", group = GRP4, minval = 1)
color  ma2ColorInput  = input(#fb9800,    "",      inline = "2", group = GRP4)

bool   showMa3Input   = input(true,         "MA №3", inline = "3", group = GRP4)
string ma3TypeInput   = input.string("SMA", "",      inline = "3", group = GRP4, options = ["SMA", "EMA", "SMMA (RMA)", "WMA", "VWMA"])
float  ma3SourceInput = input(close,        "",      inline = "3", group = GRP4)
int    ma3LengthInput = input.int(100,      "",      inline = "3", group = GRP4, minval = 1)
color  ma3ColorInput  = input(#fb6500,    "",      inline = "3", group = GRP4)

// @function            Calculates various types of moving averages for the `source` based on the specified `maType`.
// @param series        (series float) Series of values to process.
// @param length        (simple int) Number of bars (length).
// @param maType        (simple string) The type of moving average to calculate.
//                      Options are "SMA", "EMA", "SMMA (RMA)", "WMA", and "VWMA".
// @returns             (float) The moving average of the `source` for `length` bars back.
ma(series float source, simple int length, simple string maType) =>
    switch maType
        "SMA"        => ta.sma(source,  length)
        "EMA"        => ta.ema(source,  length)
        "SMMA (RMA)" => ta.rma(source,  length)
        "WMA"        => ta.wma(source,  length)
        "VWMA"       => ta.vwma(source, length)
        =>              na

// Calculate the moving averages with the user-defined settings.
float ma1 = ma(ma1SourceInput, ma1LengthInput, ma1TypeInput)
float ma2 = ma(ma2SourceInput, ma2LengthInput, ma2TypeInput)
float ma3 = ma(ma3SourceInput, ma3LengthInput, ma3TypeInput)

// Plot the moving averages, if each checkbox is enabled.
plot(showMa1Input ? ma1 : na, "MA №1", ma1ColorInput)
plot(showMa2Input ? ma2 : na, "MA №2", ma2ColorInput)
plot(showMa3Input ? ma3 : na, "MA №3", ma3ColorInput)