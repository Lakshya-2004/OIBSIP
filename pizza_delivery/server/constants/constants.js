// constants/constants.js

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
}

export const ORDER_STATUS = {
  RECEIVED: 'Order Received',

  PREPARING: 'Preparing',

  IN_KITCHEN: 'In Kitchen',

  OUT_FOR_DELIVERY:
    'Out For Delivery',

  DELIVERED: 'Delivered',

  CANCELLED: 'Cancelled',
}

export const PAYMENT_STATUS = {
  PENDING: 'Pending',

  SUCCESS: 'Success',

  FAILED: 'Failed',
}

export const PIZZA_CATEGORIES = {
  VEG: 'Veg',

  NON_VEG: 'Non-Veg',

  CHEESE_BURST:
    'Cheese Burst',

  SPECIAL: 'Special',
}