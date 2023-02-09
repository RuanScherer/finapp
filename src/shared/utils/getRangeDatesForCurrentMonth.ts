export function getRangeDatesForCurrentMonth() {
  const currentDate = new Date()
  const fromDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )
  const toDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  )
  return { fromDate, toDate }
}