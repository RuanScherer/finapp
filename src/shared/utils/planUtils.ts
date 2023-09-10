export function getProgressColor(progress: number) {
  if (progress < 33) return "red.300"
  if (progress < 66) return "yellow.300"
  return "green.300"
}

export function getProgressValue(currentValue: number, plannedValue: number) {
  return currentValue && (100 * currentValue) / plannedValue;
}