const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const categories = require('./data/categories')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dotenv.config()

connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.use('/api/categories', categoryRoutes)

app.use('/api/products', productRoutes)

app.use('/api/users', userRoutes)

app.use('/api/orders', orderRoutes)

app.get('/api/config/razorpay', (req, res) => res.send(process.env.PAYMENT_ID))

app.use(notFound)

app.use(errorHandler)

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`))
