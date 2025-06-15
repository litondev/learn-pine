//@version=6
indicator("Days in month")

// @function                Calculates the number of days in a specified month, accounting for leap years.
// @param yearNumber        (int) The year of the `monthNumber` month. Optional. Default is the current year.
// @param monthNumber       (int, optional) The month for which to find the number of days. Optional. Default is the current month.
// @returns                 (int) The number of days in the `monthNumber` month of the `yearNumber` year.
daysPerMonth(int yearNumber = year, int monthNumber = month) =>
    bool leapYear = (yearNumber % 4 == 0 and yearNumber % 100 != 0) or (yearNumber % 400 == 0)
    int result = switch
        monthNumber == 2 => leapYear ? 29 : 28
        =>                  31 - (monthNumber - 1) % 7 % 2

plot(daysPerMonth())