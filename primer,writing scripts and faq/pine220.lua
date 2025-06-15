// @version=6
indicator("N-th weekday of the month", overlay = true)

int occurrenceInput = input.int(3, "Occurrence", 1, 5)  // The occurrence of the weekday to check for in the current month.

enum Wday
    Mon = "Monday"
    Tue = "Tuesday"
    Wed = "Wednesday"
    Thu = "Thursday"
    Fri = "Friday"

wdInput = input.enum(Wday.Mon, "Weekday")
int weekdayInt = wdInput == Wday.Mon ? 1 : wdInput == Wday.Tue ? 2 : wdInput == Wday.Wed ? 3 : wdInput == Wday.Thu ? 4 : wdInput == Wday.Fri ? 5 : na

// @function                Calculates the number of days in a specified month, accounting for leap years.
// @param yearNumber        (int) The year of the `monthNumber` month. Optional. Default is the current year.
// @param monthNumber       (int, optional) The month for which to find the number of days. Optional. Default is the current month.
// @returns                 (int) The number of days in the `monthNumber` month of the `yearNumber` year.
daysPerMonth(int yearNumber = year, int monthNumber = month) =>
    bool isLeapYear = (yearNumber % 4 == 0 and yearNumber % 100 != 0) or (yearNumber % 400 == 0)
    int result = switch
        monthNumber == 2 => isLeapYear ? 29 : 28
        =>                  31 - (monthNumber - 1) % 7 % 2

//@function            Creates a timestamp representing the N-th occurrence of a specified weekday within a given month.
//@param yearNumber    (int) The year of the timestamp.
//@param monthNumber   (int) The month of the timestamp.
//@param weekdayNumber (int) The weekday of the timestamp. Can be a value between 1 and 7, where 1 is a Monday.
//@param occurrence    (int) The occurrence of the `weekdayNumber` to check for.
//@returns             (int) The timestamp at the N-th `occurrence` of the `weekdayNumber` in the month.
weekdayOfMonth(int yearNumber, int monthNumber, int weekdayNumber, int occurrence) =>
    int startTime = timestamp(yearNumber, monthNumber, 1)
    int daysInTheMonth = daysPerMonth(yearNumber, monthNumber)
    int endTime = timestamp(yearNumber, monthNumber, daysInTheMonth)
    int weekday = dayofweek(startTime) - 1
    if syminfo.timezone == "Etc/UTC" and not timeframe.isintraday
        weekday -= 1
    if weekday == 0
        weekday := 7
    int offset = weekdayNumber - weekday
    if offset < 0
        offset := 7 + offset
    int result = startTime + (offset + 7 * (occurrence - 1)) * 86400000
    if result > endTime
        result := na
    result
int occurrenceTime = weekdayOfMonth(year(time_close), month(time_close), weekdayInt, occurrenceInput)
bool isAtOccurrence = time_close[1] < occurrenceTime and time_close >= occurrenceTime

plot(occurrenceTime, "Time of the N-th weekday occurrence", color.orange, display = display.data_window)
plot(time_close, "Bar close time", display = display.data_window)
bgcolor(isAtOccurrence ? color.purple : na, title = "Time condition highlight")