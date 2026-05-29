import express from 'express'

import {
  getAllPizzas,
  createPizza,
} from '../controllers/pizzaController.js'

import { protect } from "../middleware/authMiddleware.js";
import adminMiddleware from '../middleware/adminMiddleware.js'

const router = express.Router()

router.get('/', getAllPizzas)

router.post(
  '/',
  protect,
  adminMiddleware,
  createPizza
)

export default router