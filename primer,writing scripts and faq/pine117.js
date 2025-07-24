//@version=6
indicator("Example: Find whether an array element is present")
array<int> values = array.from(1, 3, 5)
int searchValue = input(3, "Value to Search For")
bool valuePresent = array.includes(values, searchValue)
if barstate.islast
    label.new(bar_index, low, valuePresent ? "Search value found" : "Search value not found", textcolor = color.white)