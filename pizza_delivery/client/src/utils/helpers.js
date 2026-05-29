// utils/helpers.js

// Format Currency
export const formatCurrency = (
  amount
) => {
  return `₹ ${Number(amount).toLocaleString(
    'en-IN'
  )}`
}

// Calculate Cart Total
export const calculateCartTotal = (
  cart
) => {
  return cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  )
}

// Calculate Total Quantity
export const calculateTotalQuantity = (
  cart
) => {
  return cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  )
}

// Generate Random Order ID
export const generateOrderId = () => {
  return `ORD-${Date.now()}`
}

// Capitalize First Letter
export const capitalize = (text) => {
  if (!text) return ''

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  )
}

// Get Token
export const getToken = () => {
  return localStorage.getItem('token')
}

// Save Token
export const saveToken = (token) => {
  localStorage.setItem('token', token)
}

// Remove Token
export const removeToken = () => {
  localStorage.removeItem('token')
}

// Save User
export const saveUser = (user) => {
  localStorage.setItem(
    'user',
    JSON.stringify(user)
  )
}

// Get User
export const getUser = () => {
  const user = localStorage.getItem('user')

  return user ? JSON.parse(user) : null
}

// Logout User
export const logoutUser = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('user')
}

// Shorten Text
export const truncateText = (
  text,
  maxLength = 100
) => {
  if (text.length <= maxLength)
    return text

  return (
    text.substring(0, maxLength) + '...'
  )
}

// Validate Email
export const validateEmail = (email) => {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(
    email
  )
}

// Format Date
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString(
    'en-IN',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  )
}