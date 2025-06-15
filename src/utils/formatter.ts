/**
 * Format a number as Malaysian Ringgit currency (RM)
 * @param value - Number to format
 * @returns Formatted currency string
 */
export function formatCurrency(value: number): string {
  return `RM${value.toFixed(2)}`
}

/**
 * Format a date string to a more readable format
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted date string (e.g., "May 15, 2024")
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}