export const sorter = (products, type) => {
  let sorter
  if (type === 'Relevance') return products
  switch (type) {
    case 'A-Z':
      sorter = (a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1
        else return 0
      }
      break
    case 'Z-A':
      sorter = (a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1
        else return 0
      }
      break
    case 'Price (high to low)':
      sorter = (a, b) => {
        if (a.price < b.price) return 1
        if (a.price > b.price) return -1
        else return 0
      }
      break
    case 'Price (low to high)':
      sorter = (a, b) => {
        if (a.price < b.price) return -1
        if (a.price > b.price) return 1
        else return 0
      }
      break
    default:
      break
  }
  return [...products].sort(sorter)
}
