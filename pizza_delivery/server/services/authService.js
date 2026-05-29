// services/authService.js

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    }
  )
}

export const hashPassword = async (
  password
) => {
  const salt = await bcrypt.genSalt(10)

  return await bcrypt.hash(
    password,
    salt
  )
}

export const comparePassword =
  async (password, hashedPassword) => {
    return await bcrypt.compare(
      password,
      hashedPassword
    )
  }

export const getUserByEmail = async (
  email
) => {
  return await User.findOne({ email })
}

export const getUserById = async (
  id
) => {
  return await User.findById(id)
}