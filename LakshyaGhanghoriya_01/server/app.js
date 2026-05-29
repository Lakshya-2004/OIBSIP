import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import authRoutes from './routes/authRoutes.js'
import pizzaRoutes from './routes/pizzaRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import paymentRoutes from './routes/paymentRoutes.js'
import uploadRoutes from "./routes/uploadRoutes.js";  
// import rawMaterialRoutes from "./routes/rawMaterialRoutes.js";
const app = express()

app.use(express.json())

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

app.use(morgan('dev'))

app.use('/api/auth', authRoutes)

app.use('/api/pizzas', pizzaRoutes)

app.use('/api/orders', orderRoutes)

app.use('/api/admin', adminRoutes)

app.use(
  '/api/inventory',
  inventoryRoutes
)

app.use('/api/payment', paymentRoutes)
app.use("/api/upload", uploadRoutes);  


app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message:
      'Pizza Delivery Backend Running',
  })
})

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  })
})

app.use((err, req, res, next) => {
  console.log(err)

  res.status(500).json({
    success: false,
    message:
      err.message || 'Server Error',
  })
})

export default app