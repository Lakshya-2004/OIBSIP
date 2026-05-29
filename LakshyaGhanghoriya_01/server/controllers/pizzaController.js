// controllers/pizzaController.js

import Pizza from '../models/Pizza.js'

export const getAllPizzas = async (
  req,
  res
) => {
  try {
    const pizzas = await Pizza.find()

    res.status(200).json(pizzas)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

export const createPizza = async (
  req,
  res
) => {
  try {
    const pizza = await Pizza.create(
      req.body
    )

    res.status(201).json(pizza)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}