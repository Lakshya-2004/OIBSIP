// middleware/validateMiddleware.js

export const validateRegister = (
  req,
  res,
  next
) => {
  const { name, email, password } =
    req.body

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message:
        'All fields are required',
    })
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message:
        'Password must be at least 6 characters',
    })
  }

  next()
}

export const validateLogin = (
  req,
  res,
  next
) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message:
        'Email and password are required',
    })
  }

  next()
}

export const validateOrder = (
  req,
  res,
  next
) => {
  const { pizzas, total } = req.body

  if (
    !pizzas ||
    pizzas.length === 0 ||
    !total
  ) {
    return res.status(400).json({
      success: false,
      message:
        'Invalid order details',
    })
  }

  next()
}