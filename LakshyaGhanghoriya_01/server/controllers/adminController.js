import Order from '../models/Order.js'

export const getAdminDashboard =
  async (req, res) => {
    try {
      const totalOrders =
        await Order.countDocuments()

      const orders = await Order.find()

      const totalRevenue = orders.reduce(
        (acc, item) =>
          acc + item.total,
        0
      )

      res.status(200).json({
        success: true,
        totalOrders,
        totalRevenue,
        orders,
      })
    } catch (error) {
      res.status(500).json({
        message: error.message,
      })
    }
  }