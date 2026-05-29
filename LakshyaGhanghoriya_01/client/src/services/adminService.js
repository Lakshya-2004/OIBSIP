import api from './api'

export const getAdminOrders = async () => {
  const response = await api.get('/admin/orders')
  return response.data
}

export const updateOrderStatus = async (
  orderId,
  status
) => {
  const response = await api.patch(
    `/admin/orders/${orderId}`,
    {
      status,
    }
  )

  return response.data
}

export const getInventory = async () => {
  const response = await api.get(
    '/admin/inventory'
  )

  return response.data
}

export const updateInventory = async (
  itemId,
  updatedData
) => {
  const response = await api.patch(
    `/admin/inventory/${itemId}`,
    updatedData
  )

  return response.data
}

export const addInventoryItem = async (
  itemData
) => {
  const response = await api.post(
    '/admin/inventory',
    itemData
  )

  return response.data
}

export const deleteInventoryItem = async (
  itemId
) => {
  const response = await api.delete(
    `/admin/inventory/${itemId}`
  )

  return response.data
}