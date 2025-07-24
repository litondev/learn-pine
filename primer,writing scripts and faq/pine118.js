//@version=6
indicator("Example: Find index of array element")
array<float> prices = array.from(100.5, 101.2, 102.8, 100.5)
float searchValue = input(101.2, "Value to Search For")
int indexFound = array.indexof(prices, searchValue)
if barstate.islast
    string lblString = switch
        indexFound < 0 => "Search value: not found"
        =>                "Search value: found\n       Index: " + str.tostring(indexFound)
    label.new(bar_index, high, lblString,
         textcolor        = color.white,
         textalign        = text.align_left,
         text_font_family = font.family_monospace
     )