export function getRangeDatesForCurrentMonth() {
  const currentDate = new Date();
  getRangeDatesByBaseDate(currentDate);
}

export function getRangeDatesByBaseDate(date: Date) {
  const fromDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const toDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { fromDate, toDate };
}
