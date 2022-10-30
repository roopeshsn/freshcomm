const path = require('path')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const { connectDB } = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const carouselRoutes = require('./routes/carouselRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const compression = require('compression')

const app = express()
app.use(cookieParser())
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://freshbey.herokuapp.com'],
    credentials: true,
  }),
)
const PORT = process.env.PORT || 5000

// DB connection
connectDB()

app.use(compression())
app.use(express.json())
app.use('/api/carousels', carouselRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'),
    ),
  )
} else {
  app.get(`/`, (req, res) => {
    let greetings = {
      message: 'Welcome to Freshbey Backend',
      version: process.env.VERSION,
      license: 'MIT',
    }
    res.send(greetings).status(200)
    console.log(greetings)
  })
}

app.use(notFound)
app.use(errorHandler)

app.listen(
  PORT,
  console.log(`${process.env.NODE_ENV} Server Started on PORT: ${PORT}`),
)

module.exports = app
