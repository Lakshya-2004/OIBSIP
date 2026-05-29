// services/orderService.js

import api from "./api";

// CREATE ORDER
export const createOrder = async (
  orderData
) => {

  const response =
    await api.post(
      "/orders/create",
      orderData
    );

  return response.data;
};

// GET USER ORDERS
export const getUserOrders =
  async () => {

    const response =
      await api.get(
        "/orders/my-orders"
      );

    return response.data;
};

// GET ALL ORDERS (ADMIN)
export const getAllOrders =
  async () => {

    const response =
      await api.get(
        "/orders/all"
      );

    return response.data;
};

// UPDATE ORDER STATUS
export const updateOrderStatus =
  async (
    orderId,
    status
  ) => {

    const response =
      await api.put(
        "/orders/status",
        {
          orderId,
          status,
        }
      );

    return response.data;
};