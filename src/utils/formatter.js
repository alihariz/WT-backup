// If this was the TypeScript version, you can now use this JavaScript version.
export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

export function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

export function formatNumber(num) {
  return num.toLocaleString();
}
