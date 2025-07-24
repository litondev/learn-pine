//@version=6
indicator("Debugging objects", overlay = true)

// Define the user-defined type.
type openLine
    float price
    int   openTime
    line  level

// @function            Queues a new `arrayElement` at the end of the `id` array and removes
//                      the first element if the array size exceeds the specified `maxSize`.
// @param id            (<any array type>) The array in which the element is queued.
// @param maxSize       (int) The maximum allowed number of elements in the array.
//                      If the array exceeds this size, the first element is removed.
// @param arrayElement  (<array type) The new element to add to the array.
// @returns             (<array type>) The removed element.
arrayQueue(id, int maxSize, value) =>
    id.push(value)
    if id.size() > maxSize
        id.shift()

// @function            Logs detailed information about an open line object for debugging purposes.
// @param ol            (openLine) The open line object to log.
// @returns             (void) Function has no explicit return.
debugOpenLine(openLine ol) =>
    if barstate.isconfirmed
        log.info("\nprice: {0}\nopenTime: {1}\nlevel line coords:\nx1: {2}\ny1: {3}\nx2: {4}\ny2: {5}",
             ol.price, ol.openTime, str.format_time(ol.level.get_x1()), ol.level.get_y1(),
             str.format_time(ol.level.get_x2()), ol.level.get_y2())

// Create an empty `openLine` array.
var openLineArray = array.new<openLine>()

// On session start, create a new `openLine` object and add it to the array.
// Use the custom debug function to print the object's fields to the Pine Logs pane.
if session.isfirstbar_regular
    openLine ol = openLine.new(open, time)
    ol.level := line.new(time, open, time_close("D"), open, xloc.bar_time, color = color.aqua)
    arrayQueue(openLineArray, 4, ol)
    debugOpenLine(ol)