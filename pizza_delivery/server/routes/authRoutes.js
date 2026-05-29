// routes/authRoutes.js

import express from 'express'

import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js'
import {
  validateRegister,
  validateLogin,
} from '../middleware/validateMiddleware.js'

const router = express.Router()

router.post(
  '/register',
  validateRegister,
  registerUser
);

router.post(
  '/login',
  validateLogin,
  loginUser
);

router.post(
  '/forgot-password',
  forgotPassword
);
router.post(
  "/reset-password/:token",
  resetPassword
);
export default router