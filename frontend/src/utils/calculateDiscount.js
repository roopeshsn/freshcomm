function calculateDiscount(originalPrice, sellingPrice) {
  let discountPrice = originalPrice - sellingPrice
  let discountPercentage = Math.floor((discountPrice / originalPrice) * 100)
  return [discountPrice, discountPercentage]
}

export default calculateDiscount
