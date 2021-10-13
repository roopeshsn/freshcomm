export default function formatter(value) {
  const options = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }
  return new Intl.NumberFormat('en-IN', options).format(value)
}
