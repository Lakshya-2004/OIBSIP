// services/pizzaService.js

import api from './api'

export const getAllPizzas = async () => {
  const response = await api.get(
    '/pizzas'
  )

  return response.data
}

export const getSinglePizza = async (
  pizzaId
) => {
  const response = await api.get(
    `/pizzas/${pizzaId}`
  )

  return response.data
}

export const createCustomPizza = async (
  pizzaData
) => {
  const response = await api.post(
    '/pizzas/custom',
    pizzaData
  )

  return response.data
}

export const searchPizzas = async (
  keyword
) => {
  const response = await api.get(
    `/pizzas/search?query=${keyword}`
  )

  return response.data
}

export const getPizzaCategories =
  async () => {
    const response = await api.get(
      '/pizzas/categories'
    )

    return response.data
  }

export const getPopularPizzas =
  async () => {
    const response = await api.get(
      '/pizzas/popular'
    )

    return response.data
  }