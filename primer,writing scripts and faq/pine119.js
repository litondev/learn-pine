//@version=6
indicator("Example: Binary search in sorted array")
array<float> sortedPrices = array.from(100.5, 102.3, 98.7, 99.2)
string originalArrayString = str.tostring(sortedPrices)
float searchValue = input(100.5)
// Ensure that the array is sorted (order is ascending by default); this step is crucial for binary search.
array.sort(sortedPrices)
string sortedArrayString = str.tostring(sortedPrices)
int searchValueIndex = array.binary_search(sortedPrices, searchValue)
bool valueFound = searchValueIndex >= 0
if barstate.islast
    string lblTxt =
     str.format("Original array: {0}\n  Sorted Array: {1}\n  Search value: {2}\n   Value found: {3}\n      Position: {4}",
         originalArrayString,
         sortedArrayString,
         searchValue,
         valueFound,
         searchValueIndex
     )
    label.new(bar_index, high, lblTxt,
         textcolor        = color.white,
         textalign        = text.align_left,
         text_font_family = font.family_monospace
     )