export const API_BASE_URL =
  import.meta.env.VITE_API_URL

export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
}

export const ORDER_STATUS = {
  RECEIVED: 'Order Received',
  PREPARING: 'Preparing',
  IN_KITCHEN: 'In Kitchen',
  OUT_FOR_DELIVERY: 'Out For Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
}

export const PAYMENT_STATUS = {
  PENDING: 'Pending',
  SUCCESS: 'Success',
  FAILED: 'Failed',
  REFUNDED: 'Refunded',
}

export const PIZZA_CATEGORIES = {
  VEG: 'Veg',
  NON_VEG: 'Non-Veg',
  CHEESE: 'Cheese Burst',
  SPECIAL: 'Special',
}

export const PIZZA_BASES = [
  'Thin Crust',
  'Cheese Burst',
  'Pan Crust',
  'Classic Base',
  'Wheat Base',
]

export const PIZZA_SAUCES = [
  'Tomato',
  'Spicy',
  'Garlic',
  'Barbeque',
  'White Sauce',
]

export const PIZZA_CHEESES = [
  'Mozzarella',
  'Cheddar',
  'Parmesan',
  'Blue Cheese',
]

export const PIZZA_VEGGIES = [
  'Onion',
  'Capsicum',
  'Olives',
  'Corn',
  'Mushroom',
  'Paneer',
  'Jalapeno',
]

export const LOCAL_STORAGE_KEYS = {
  TOKEN: 'token',
  ROLE: 'role',
  USER: 'user',
}

export const RAZORPAY_KEY =
  import.meta.env.VITE_RAZORPAY_KEY