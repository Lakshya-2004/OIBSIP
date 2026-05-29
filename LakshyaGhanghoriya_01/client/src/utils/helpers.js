export const formatCurrency = (
  amount
) => {
  return `₹ ${Number(amount).toLocaleString(
    'en-IN'
  )}`
}

export const calculateCartTotal = (
  cart
) => {
  return cart.reduce(
    (acc, item) =>
      acc + item.price * item.quantity,
    0
  )
}

export const calculateTotalQuantity = (
  cart
) => {
  return cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  )
}

export const generateOrderId = () => {
  return `ORD-${Date.now()}`
}

export const capitalize = (text) => {
  if (!text) return ''

  return (
    text.charAt(0).toUpperCase() +
    text.slice(1)
  )
}

export const getToken = () => {
  return localStorage.getItem('token')
}

export const saveToken = (token) => {
  localStorage.setItem('token', token)
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const saveUser = (user) => {
  localStorage.setItem(
    'user',
    JSON.stringify(user)
  )
}

export const getUser = () => {
  const user = localStorage.getItem('user')

  return user ? JSON.parse(user) : null
}

export const logoutUser = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  localStorage.removeItem('user')
}

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