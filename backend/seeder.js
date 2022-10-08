const dotenv = require('dotenv')
const users = require('./data/users')
const products = require('./data/products')
const categories = require('./data/categories')
const carousels = require('./data/carousels')
const User = require('./models/userModel')
const Carousel = require('./models/carouselModel')
const Category = require('./models/categoryModel')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')
const connectDB = require('./config/db')

dotenv.config({
  path:'./backend/.env'
})

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await Category.deleteMany()
    await Carousel.deleteMany()
    await User.deleteMany()
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleCategories = categories.map((category) => {
      return { ...category, user: adminUser }
    })
    const sampleCarousels = carousels.map((carousel) => {
      return { ...carousel, user: adminUser }
    })
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })
    await Carousel.insertMany(sampleCarousels)
    await Category.insertMany(sampleCategories)
    await Product.insertMany(sampleProducts)
    console.log('Data Imported!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await Category.deleteMany()
    await Carousel.deleteMany()
    await User.deleteMany()
    console.log('Data Destroyed!')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
