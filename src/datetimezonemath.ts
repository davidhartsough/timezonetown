export const hours = [
  "1am",
  "2am",
  "3am",
  "4am",
  "5am",
  "6am",
  "7am",
  "8am",
  "9am",
  "10am",
  "11am",
  "12pm",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
  "6pm",
  "7pm",
  "8pm",
  "9pm",
  "10pm",
  "11pm",
  "12am",
];
function getTomorrow(hour = 6) {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(hour);
  date.setMinutes(0);
  date.setMilliseconds(0);
  return date;
}
//.toLocaleString("en-US", {timeZone: "America/New_York"});
export function getTimeNumFromZone(tz: string): number {
  return (
    Number(
      new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        hour: "numeric",
        hour12: false,
      }).format(getTomorrow())
    ) - 1
  );
}
