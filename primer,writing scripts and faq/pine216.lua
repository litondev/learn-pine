//@version=6
indicator("Date/Time detector", overlay = true)

int targetInput = input.time(defval = timestamp("2025-03-24 10:00"), title = "Target Date/Time", confirm = true)

bool isTargetYear = year == year(targetInput)
bool isTargetMonth = month == month(targetInput)

int targetDay = dayofmonth(targetInput)
int dayOpen = dayofmonth  // The built-in `dayofmonth` variable holds the day of the month of the bar open.
int dayClose = dayofmonth(time_close)
bool day_isBetweenOpenAndClose = (targetDay >= dayOpen) and (targetDay < dayClose)

bool isTargetDay = timeframe.ismonthly or targetDay == dayofmonth or day_isBetweenOpenAndClose

bool TF_isOneHourOrLess = timeframe.in_seconds() <= (60 * 60)
bool TF_isAboveOneHour = timeframe.in_seconds() > (60 * 60)
bool TF_isAboveOrEqualToOneHour = timeframe.in_seconds() >= (60 * 60)
bool TF_isDayOrAbove = timeframe.isdwm

int targetHour = hour(targetInput)
int hourOpen = hour  // The built-in `hour` variable holds the hour of the bar open.
int hourClose = hour(time_close)
bool hour_isBetweenOpenAndClose = (targetHour >= hourOpen) and (targetHour < hourClose)

bool isTargetHour = TF_isDayOrAbove or
  (TF_isOneHourOrLess and (targetHour == hourOpen)) or
  (TF_isAboveOneHour and hour_isBetweenOpenAndClose)

int minuteOpen = minute  // The built-in `minute` variable holds the minute of the bar open.
int minuteClose = minute(time_close)
int targetMinute = minute(targetInput)
bool minute_isBetweenOpenAndClose = (targetMinute >= minuteOpen) and (targetMinute < minuteClose)

bool isTargetMinute = TF_isAboveOrEqualToOneHour or minute_isBetweenOpenAndClose

bool isTargetTime = isTargetYear and isTargetMonth and isTargetDay and isTargetHour and isTargetMinute

bgcolor(isTargetTime ? color.new(color.green, 70) : na)