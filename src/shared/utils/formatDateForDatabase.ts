export function formatDateForDatabase(date: Date) {
  return date.toISOString().slice(0, 10);
}
