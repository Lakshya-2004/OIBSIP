import { createContext, useState } from 'react'

export const OrderContext = createContext()

export const OrderProvider = ({
  children,
}) => {
  const [orders, setOrders] = useState([])

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev])
  }

  const removeOrder = (orderId) => {
    setOrders((prev) =>
      prev.filter(
        (order) => order.id !== orderId
      )
    )
  }

  const updateOrderStatus = (
    orderId,
    status
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
            }
          : order
      )
    )
  }

  const clearOrders = () => {
    setOrders([])
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,
        addOrder,
        removeOrder,
        updateOrderStatus,
        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}