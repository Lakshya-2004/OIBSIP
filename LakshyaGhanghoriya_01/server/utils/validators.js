export const isValidEmail = (
  email
) => {
  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  return emailRegex.test(email)
}

export const isValidPassword = (
  password
) => {
  return password.length >= 6
}

export const isValidPhone = (
  phone
) => {
  const phoneRegex = /^[0-9]{10}$/

  return phoneRegex.test(phone)
}

export const isEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    value.trim() === ''
  )
}