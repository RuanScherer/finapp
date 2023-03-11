export function formatDateForFauna(date: Date) {
  return date.toISOString().slice(0, 10)
}
