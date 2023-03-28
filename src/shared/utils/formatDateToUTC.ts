import { addMinutes } from "date-fns";

export function formatDateToUTC(date: Date) {
  return addMinutes(date, date.getTimezoneOffset());
}
